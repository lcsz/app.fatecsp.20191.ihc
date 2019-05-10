import { Token, Jwt } from "../core/token";
import { UserModel, User, UserAccessType } from "./model";
import { RequestParams } from "../core/routing";


class SecretPasswordEncoder extends Jwt {
    constructor(private password: string) {
        super(password + "@b4gKkh7z39AsEWjZ9");
    }

    static for(password: string, username: string): string {
        return new this(password).encode({z: username});
    }
    
    static decode(password: string, token: string): string {
        return new this(password).decode(token).z;
    }
}



export class AuthService {
    encodePassword(password: string, username: string): string {
        // return SecretPasswordEncoder.for(password, username);
        return password;
    }

    decodePassword(password: string, token: string): string {
        // return SecretPasswordEncoder.decode(password, token);
        return password;
    }

    async validateToken(token: Token, minimAccessLevel?: UserAccessType): Promise<boolean> {
        const user_id = token.decode().z;
        const model = new UserModel();
        const user = await model.findById(user_id);
        minimAccessLevel = minimAccessLevel || UserAccessType.None;
        if (!user) {
            return false;
        }
        const userAccessLevel = user.accessType || UserAccessType.None;
        return userAccessLevel >= minimAccessLevel;
    }

    async getUser(username: string, password: string) {
        const hashed = this.encodePassword(password, username);
        const model = new UserModel();
        return await model.findOne({username: username, auth: hashed});
    }

    tokenFor(user: User | string): Token {
        const user_id = (typeof user === 'string' ? user : user._id) || '';
        return Token.for({z: user_id});
    }

    newToken(token: RequestParams |  string): Token {
        const t = (typeof token === 'string' ? token : token.headers.token) || '';
        return new Token(t);
    }
}
