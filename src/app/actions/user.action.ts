import { User } from "../models/user";

export class AddUser {
    static readonly type = '[User] Add'

    constructor(public payload: User){}
}

export class EditUser {
    static readonly type = '[User] Edit';

    constructor(public payload: User){}
}