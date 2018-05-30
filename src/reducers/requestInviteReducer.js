import { ACTION_TYPES } from "../actions/requestInviteActions";

export default function reducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SET_NAME:
      return { ...state, name: payload };
    case ACTION_TYPES.SET_EMAIL:
      return { ...state, email: payload };
    case ACTION_TYPES.SET_CONFIRM_EMAIL:
      return { ...state, confirmEmail: payload };
    default:
      return state;
  }
}

export const getRequestParams = state => {
  const { name, email, confirmEmail } = state.requestInviteReducer;
  return { name, email, confirmEmail };
};

export const getConfirmEmailValidationState = state => {
  const { email, confirmEmail } = state.requestInviteReducer;
  if (!email) {
    return null;
  }
  return email === confirmEmail ? "success" : "error";
};
