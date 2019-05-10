import { Routing, RequestParams, Method, ServiceHookContext } from "../core/routing";
import { Params, Id } from "@feathersjs/feathers";
import { AuthRoutes } from "../auth/routes";
import { UserAccessType } from "../auth/model";


export class AdminRoutes extends Routing {
    constructor()  {
        super("/api-admin/");
    }

    protected before = AuthRoutes.getAuthHook(UserAccessType.Admin);

    @Routing.Find("/status")
    public async status() {
        return "ok";
    }
}
