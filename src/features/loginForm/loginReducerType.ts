export interface LoginFormState {
  email: string;
  password: string;
}

export type LoginFormAction = {
  type: "SET_FIELD";
  field: keyof LoginFormState;
  payload: string;
};
