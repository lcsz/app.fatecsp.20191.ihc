import { MongoDbModel } from "../core/mongodb-model";
import { Model } from "../core/persisted-model";


export enum UserAccessType {
    None = 0,
    Normal = 1,
    Admin = 99
}

export interface User extends Model {
    username: string;
    auth: string;
    accessType: UserAccessType;
    verified: boolean;
};
export class UserModel extends MongoDbModel<User> {
    constructor() {
        super("user");
    }
}
