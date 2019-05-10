import { MongoDbModel } from "../core/mongodb-model";
import { Model } from "../core/persisted-model";


export interface Product extends Model {
    name: string;
    description: string;
    measureUnit: string;
    qtd: number;
    price: number;
    imageName: string;
    fee: number;
    feeKm: number;
}
export class ProductModel extends MongoDbModel<Product> {
    constructor() {
        super("produto");
    }
}
