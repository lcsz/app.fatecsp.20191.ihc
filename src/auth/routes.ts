import { Routing, RequestParams, Method, ServiceHookContext } from "../core/routing";
import { Params, Id, NullableId } from "@feathersjs/feathers";
import { NotFound, BadRequest, PaymentError, NotAuthenticated, Forbidden } from "@feathersjs/errors";
import { User, UserModel, UserAccessType } from "./model";
import { Jwt } from "../core/token";
import { AuthService } from "./service";


export class AuthRoutes extends Routing {
    private service = new AuthService();
    constructor() {
        super("/auth")
    }

    static getAuthHook(minimAccessLevel?: UserAccessType) {
        return async (context: ServiceHookContext) => {
            const auther = new this();
            const authenticated = await auther.validateToken(context.params, minimAccessLevel);
            if (!authenticated) {
                throw new NotAuthenticated("Not authenticated!");
            }
            return context;
        }
    }
    
    @Routing.Find("/status")
    async status() {
        return "ok";
    }

    async validateToken(params?: RequestParams, minimAccessLevel?: UserAccessType): Promise<boolean> {
        if (
            !params || 
            !params.headers || 
            !params.headers.token || 
            typeof params.headers.token !== 'string'
        ) {
            return false;
        }
        const token = this.service.newToken(params.headers.token);
        return await this.service.validateToken(token, minimAccessLevel);
    }

    @Routing.Find("/token")
    async verifyToken(params?: RequestParams) {
        const query = (params || {query: {}}).query || {};
        const requiredAdmin = query.admin ? UserAccessType.Admin : UserAccessType.None;
        const result = await this.validateToken(params, requiredAdmin);
        if (!result) {
            throw new Forbidden("Access Denied");
        }
        return true;
    }

    @Routing.Create("/login")
    async login(data: {username: string, password: string}, params?: RequestParams) {
        if (!data || !data.username || !data.password) {
            throw new Forbidden("Access denied");
        }
        const username = data.username;
        const password = data.password;
        const user = await this.service.getUser(username, password);
        if (!user) {
            throw new Forbidden("Access denied");
        }
        return {
            token: this.service.tokenFor(user).hashed,
            access: user.accessType === UserAccessType.Admin ? 'admin' : 'normal'
        };
    }

    @Routing.Patch("/login")
    async changePassword(
        id: NullableId, 
        data: {username: string, password: string, newPassword: string}, 
        params?: RequestParams
    ) {
        const username = data.username;
        const password = data.password;
        const newPassword = data.newPassword;

        if (!username || !password || !newPassword) {
            throw new Forbidden("Access denied");
        }

        const model = new UserModel();
        const hashed = this.service.encodePassword(password, username);
        const user = await model.findOne({username: username, auth: hashed});
        if (!user) {
            throw new Forbidden("Access denied");
        }
        const newHashed = 
        await model.updateOne({_id: user._id}, {$set: {
            auth: this.service.encodePassword(newPassword, username)
        }});
        return "ok";
    }

    @Routing.Create("/api-admin/user")
    public async createUser(data: {username: string, password: string}, params?: RequestParams) {
        if (!data.username || !data.password) {
            throw new BadRequest();
        }

        const model = new UserModel();
        const hashed = this.service.encodePassword(data.password, data.username);
        const user: User = {
            username: data.username,
            auth: hashed,
            accessType: UserAccessType.Admin,
            verified: true
        };
        await model.create(user);
        return "ok";
    }
}
