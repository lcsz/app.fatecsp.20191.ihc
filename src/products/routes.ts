import { Routing, RequestParams, Method } from "../core/routing";
import { Params, Id } from "@feathersjs/feathers";
import { NotFound, BadRequest, PaymentError } from "@feathersjs/errors";
import {     
    Product,
    ProductModel
} from './model';
import { CRUDMethods } from '../core/crud';
import { sendContato } from "../email/contato";
import { PushService } from "../core/push";


@CRUDMethods('/produto', ProductModel, [Method.Get])
export class ProductsRoutes extends Routing {
    constructor() {
        super("/produtos");
    }
    
    @Routing.Find("/produto")
    public async getProdutos(params?: any): Promise<Product[]> {
        const model = new ProductModel();
        const menus = await model.find();
        return menus;
    }

}
