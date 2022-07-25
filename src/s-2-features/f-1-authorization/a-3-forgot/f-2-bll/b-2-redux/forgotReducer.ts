export const forgotInitialState: ForgotStateType = {
    recoveryEmail: ""
};

export type ForgotStateType = {
    recoveryEmail: string
}

export const forgotReducer = (state = forgotInitialState, action: ForgotActionType) => {
    switch (action.type) {
        case "forgot/set-recovery-email":
            return {...state, recoveryEmail: action.recoveryEmail}
        default:
            return state;
    }
};


export const setRecoveryEmail = (recoveryEmail: string) => ({
    type: "forgot/set-recovery-email",
    recoveryEmail
} as const);

//types
export type ForgotActionType = ReturnType<typeof setRecoveryEmail>;