import {
    ChangeIsLoading,
    changeIsLoadingAC,
    setAppErrorAC,
    SetAppErrorActionType
} from "../../../../s-1-main/m-2-bll/app-reducer";
import {UserType} from "../../../f-1-authorization/a-1-sign-in/s-3-dal/SignInAPI";
import {Dispatch} from "redux";
import axios from "axios";
import {profileAPI} from "../../p-3-dal/profileAPI";


const initStateUserData = {
    userData: {} as UserType,
    profileEditMode: false
}

export const profileReducer = (state: InitStateTypeProfile = initStateUserData, action: ProfileReducerAction): InitStateTypeProfile => {
    switch (action.type) {
        case "profile/SET_USER_DATA":
            return {...state, ...action.payload}
        case "profile/SWITCH_PROFILE_EDIT_MODE":
            return {...state, profileEditMode: action.value}
        default:
            return state
    }
}

//ACTION CREATOR
export const setUserDataAC = (userData: UserType) => ({type: "profile/SET_USER_DATA", payload: {userData}} as const)
export const switchProfileEditModeAC = (value: boolean) => ({type: "profile/SWITCH_PROFILE_EDIT_MODE", value} as const)


// THUNKa
export const UpdateUserDataThunk = (userName:string, userAvatar: string) => async (dispatch: Dispatch<ProfileReducerAction>) => {
    dispatch(changeIsLoadingAC(true))
    profileAPI.changeName(userName, userAvatar)
        .then(res => {
                dispatch(setUserDataAC(res.data.updatedUser))
                console.log('User data updated successfully!')
        })
        .catch((error) => {
            const data = error?.response?.data;
            if (axios.isAxiosError(error) && data) {
                dispatch(setAppErrorAC(data.error || 'Some error occurred'));
            } else (dispatch(setAppErrorAC(error.message + '. More details in the console')))
            console.log({...error});
        })
        .finally(()=> {
            dispatch(changeIsLoadingAC(false))
            dispatch(switchProfileEditModeAC(false))
        })
}

//TYPES
export type SetUserDataType = ReturnType<typeof setUserDataAC>
export type SwitchProfileEditModeType = ReturnType<typeof switchProfileEditModeAC>

export type InitStateTypeProfile = typeof initStateUserData

export type ProfileReducerAction =
    SetUserDataType
    | ChangeIsLoading
    | SetAppErrorActionType
    | SwitchProfileEditModeType