export const ACTION_TYPES = {
  SET_NAME: "SET_NAME",
  SET_EMAIL: "SET_EMAIL",
  SET_CONFIRM_EMAIL: "SET_CONFIRM_EMAIL",
  SET_SUBMISSION_IN_PROG: "SET_SUBMISSION_IN_PROG",
  SET_REQUEST_SUBMITTED: "SET_REQUEST_SUBMITTED",
  SET_ERROR_MESSAGE: "SET_ERROR_MESSAGE",
  RESET_STATE: "RESET_STATE"
};

export const setName = payload => {
  return { type: ACTION_TYPES.SET_NAME, payload };
};

export const setEmail = payload => {
  return { type: ACTION_TYPES.SET_EMAIL, payload };
};

export const setConfirmEmail = payload => {
  return { type: ACTION_TYPES.SET_CONFIRM_EMAIL, payload };
};

export const setSubmissionInProg = payload => {
  return { type: ACTION_TYPES.SET_SUBMISSION_IN_PROG, payload };
};

export const setRequestSubmitted = payload => {
  return { type: ACTION_TYPES.SET_REQUEST_SUBMITTED, payload };
};

export const setErrorMessage = payload => {
  return { type: ACTION_TYPES.SET_ERROR_MESSAGE, payload };
};

export const resetState = () => {
  return { type: ACTION_TYPES.RESET_STATE };
};
