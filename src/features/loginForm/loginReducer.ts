import type { LoginFormAction, LoginFormState } from "./loginReducerType";

export const initialLoginState: LoginFormState = {
  username: "",
  password: "",
};

export const loginFormReducer = (
  state: LoginFormState,
  action: LoginFormAction
): LoginFormState => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.payload };
    default:
      return state;
  }
};
