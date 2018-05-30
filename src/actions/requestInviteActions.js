export const ACTION_TYPES = {
  SET_NAME: "SET_NAME",
  SET_EMAIL: "SET_EMAIL",
  SET_CONFIRM_EMAIL: "SET_CONFIRM_EMAIL"
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
