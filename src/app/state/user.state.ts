import { Action, createSelector, Selector, State, StateContext } from "@ngxs/store";
import { AddUser } from "../actions/user.action";
import { User } from "../models/user";

export class UserStateModel{
    users: User[];
}

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: []
    }
})

export class UserState{

    @Selector()
    static getUsers(state: UserStateModel) {
        return state.users;
    }

    static getUser(id: string) {
        return createSelector([UserState], (state: UserStateModel) => {
            return state.users.find(user => user.id === id);
        });
    }

    @Action(AddUser)
    add({getState, patchState}: StateContext<UserStateModel>, {payload}: AddUser) {
        const state = getState();
        patchState({
            users: [...state.users, payload]
        })
    }
}