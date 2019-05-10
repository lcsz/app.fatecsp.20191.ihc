import { Routing, ServiceHookContext, Method } from "../../core/routing";
import { CRUDMethods } from "../../core/crud";
import { 
    ProductModel
} from "../model";
import { AuthRoutes } from "../../auth/routes";
import { UserAccessType } from "../../auth/model";
import { NullableId } from "@feathersjs/feathers";
import { RequestParams } from "nodemailer/lib/xoauth2";
import { BadRequest } from "@feathersjs/errors";


const adminPrefix = '/api-admin/crud';
@CRUDMethods('/produto', ProductModel)
export class ProductsAdminRoutes extends Routing {
    constructor() {
        super("/produtos" + adminPrefix);
    }

    protected before = AuthRoutes.getAuthHook(UserAccessType.Admin);

}
