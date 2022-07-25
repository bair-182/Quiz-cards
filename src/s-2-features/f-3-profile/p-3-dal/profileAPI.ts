import {instance} from "../../../base-url";
import {UserType} from "../../f-1-authorization/a-1-sign-in/s-3-dal/SignInAPI";
import {AxiosResponse} from "axios";

export const profileAPI = {
    authMe () {
        return instance.post<UserType>('auth/me')
    },
    changeName(name: string, avatar: string) {
        return instance.put<renameRequestType, AxiosResponse<renameResponseType>>(`auth/me`, {name, avatar});
    }
};

export type renameRequestType = {
    name: string,
    avatar: string
}

export type renameResponseType = {
    updatedUser: UserType,
    error?: string
}