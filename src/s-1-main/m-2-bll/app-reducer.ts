import {profileAPI} from "../../s-2-features/f-3-profile/p-3-dal/profileAPI";
import {Dispatch} from "redux";
import {
    setIsLoggedInAC,
    SetIsLoggedInType
} from "../../s-2-features/f-1-authorization/a-1-sign-in/s-2-bll/b-2-redux/signIn-reducer";
import axios from "axios";
import {
    ProfileReducerAction,
    setUserDataAC,
    SetUserDataType
} from "../../s-2-features/f-3-profile/p-2-bll/b-2-redux/profile-reducer";
import {
    ParamAC_setCardPacksTotalCountACType,
    ParamAC_SetSearchType,
    ParamAC_SetUserIdType,
    SetAllPacksDataACType
} from "../../s-2-features/f-8-card-packs/packs/packs-reducer";
import {CardsAllActions, SetPackIdACType} from "../../s-2-features/f-8-card-packs/packs/cards/cards-reducer";

const initStateApp = {
    appError: null as null | string,
    appSuccess: null as null | string,
    appInfo: null as null | string,

    isLoading: false,
    isAppInitialized: false
}

export const appReducer = (state: InitStateTypeApp = initStateApp, action: AppAction): InitStateTypeApp => {
    switch (action.type) {
        case "app/SET_IS_AUTH":
            return {...state, isAppInitialized: action.isAuthAction}
        case "app/CHANGE-IS-LOADING":
            return {...state, isLoading: action.isLoadingApp}
        case "app/SET-ERROR":
            return {...state, appError: action.error}

        default:
            return state

    }
}

//ACTION CREATOR
export const setIsAuthAC = (isAuthAction: boolean) => ({type: "app/SET_IS_AUTH", isAuthAction} as const)
export const changeIsLoadingAC = (isLoadingApp: boolean) => {
    return {
        type: "app/CHANGE-IS-LOADING",
        isLoadingApp
    } as const
}
export const setAppErrorAC = (error: string | null) => ({type: "app/SET-ERROR", error} as const)


// THUNKa
export const initializeAppTC = (value: boolean) => async (dispatch: Dispatch<AppAction>) => {
    dispatch(changeIsLoadingAC(true))
    profileAPI.authMe()
        .then(res => {
            if (res.data._id) {
                dispatch(setUserDataAC(res.data))
                dispatch(setIsLoggedInAC(true))
                console.log("AuthMe - You are already logged in!")
            } else {
                dispatch(setIsLoggedInAC(false))
            }
        })
        .catch((error) => {
            // if (error.data.in) {
            //     dispatch(setIsLoggedInAC(false))
            // }
            const data = error?.response?.data;
            if (axios.isAxiosError(error) && data) {
                // тут типа при проверке живой куки не будет появлятся ошибка, а другие ошибки будут отображаться
                if (data.error === "you are not authorized /ᐠ-ꞈ-ᐟ\\") {
                    return
                }
                dispatch(setAppErrorAC(data.error || "Some error occurred"));
            } else (dispatch(setAppErrorAC(error.message + ". More details in the console")))
            console.log({...error});
        })
        .finally(() => {
            dispatch(changeIsLoadingAC(false))
            dispatch(setIsAuthAC(value))
        })
}

//TYPES
export type ChangeIsLoading = ReturnType<typeof changeIsLoadingAC>
export type SetIsAuthActionType = ReturnType<typeof setIsAuthAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

export type InitStateTypeApp = typeof initStateApp

export type AppAction =
    SetIsAuthActionType
    | ChangeIsLoading
    | SetAppErrorActionType
    | SetIsLoggedInType
    | SetUserDataType
    | ProfileReducerAction
    | ParamAC_SetSearchType
    | SetPackIdACType
    | CardsAllActions
    | SetAllPacksDataACType
    | ParamAC_SetUserIdType
    | ParamAC_setCardPacksTotalCountACType