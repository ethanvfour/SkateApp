import type { SignUpFormState, SignUpFormAction } from "./signupReducerType";

export const initialSignUpState: SignUpFormState = {
    email: "",
    username: "",
    password: "",
}

export const signUpFormReducer = (
    state: SignUpFormState,
    action: SignUpFormAction
): SignUpFormState =>
{
    switch(action.type)
    {
        case "SET_FIELD":
            return {...state, [action.field]: action.payload};
        default:
            return state;
    }
}