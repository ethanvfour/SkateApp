export interface SignUpFormState {
  email: string;
  username: string;
  password: string;
}

export type SignUpFormAction = {
  type: "SET_FIELD";
  field: keyof SignUpFormState;
  payload: string;
};
