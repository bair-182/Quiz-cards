import {instance} from "../../../../base-url";
import {AxiosResponse} from "axios";

// export interface ISignInData {
//
// }

export const SignInAPI = {
    login(data: LoginRequestDataType) {
        return instance.post<LoginRequestDataType, AxiosResponse<UserType>>('auth/login', data)
    },
    logout() {
        return instance.delete<AuthResponseType>('auth/me')
    }
};

export type LoginRequestDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export type UserType = {
    _id: string,
    avatar?: string
    created: Date
    email: string
    name: string
    publicCardPacksCount: number
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}

type AuthResponseType = {
    info: string
    error: string
}

