import { ACTION_TYPES } from "../actions/requestInviteActions";

export const initialState = {
  name: "",
  email: "",
  confirmEmail: "",
  submissionInProgress: false,
  requestSubmitted: false,
  errorMessage: ""
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SET_NAME:
      return { ...state, name: payload };
    case ACTION_TYPES.SET_EMAIL:
      return { ...state, email: payload };
    case ACTION_TYPES.SET_CONFIRM_EMAIL:
      return { ...state, confirmEmail: payload };
    case ACTION_TYPES.SET_REQUEST_SUBMITTED:
      return { ...state, requestSubmitted: payload };
    case ACTION_TYPES.SET_SUBMISSION_IN_PROG:
      return { ...state, submissionInProgress: payload };
    case ACTION_TYPES.SET_ERROR_MESSAGE:
      return { ...state, errorMessage: payload };
    case ACTION_TYPES.RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

export const getErrorMessage = state => state.requestInviteReducer.errorMessage;
export const getRequestSubmitted = state =>
  state.requestInviteReducer.requestSubmitted;
export const getSubmissionInProgress = state =>
  state.requestInviteReducer.submissionInProgress;

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
