import {
  ACTION_TYPES,
  setName,
  setEmail,
  setConfirmEmail,
  resetState,
  setErrorMessage,
  setSubmissionInProg,
  setRequestSubmitted
} from "./requestInviteActions";

describe("Request Invite Actions", () => {
  const email = "email@email.com";

  it("should have an action to set the name value", () => {
    const expected = { type: ACTION_TYPES.SET_NAME, payload: "name" };
    expect(setName(expected.payload)).toEqual(expected);
  });

  it("should have an action to set the email value", () => {
    const expected = { type: ACTION_TYPES.SET_EMAIL, payload: email };
    expect(setEmail(expected.payload)).toEqual(expected);
  });

  it("should have an action to set the confirm email value", () => {
    const expected = { type: ACTION_TYPES.SET_CONFIRM_EMAIL, payload: email };
    expect(setConfirmEmail(expected.payload)).toEqual(expected);
  });

  it("should have an action to set request submitted", () => {
    const expected = {
      type: ACTION_TYPES.SET_REQUEST_SUBMITTED,
      payload: true
    };
    expect(setRequestSubmitted(expected.payload)).toEqual(expected);
  });

  it("should have an action to set submission in progress", () => {
    const expected = {
      type: ACTION_TYPES.SET_SUBMISSION_IN_PROG,
      payload: true
    };
    expect(setSubmissionInProg(expected.payload)).toEqual(expected);
  });

  it("should have an action to set the error message", () => {
    const expected = { type: ACTION_TYPES.SET_ERROR_MESSAGE, payload: "error" };
    expect(setErrorMessage(expected.payload)).toEqual(expected);
  });

  it("should have an action to reset the state", () => {
    const expected = { type: ACTION_TYPES.RESET_STATE };
    expect(resetState()).toEqual(expected);
  });
});
