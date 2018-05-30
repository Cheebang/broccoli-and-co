import {
  ACTION_TYPES,
  setName,
  setEmail,
  setConfirmEmail
} from "./requestInviteActions";

describe("Request Invite Actions", () => {
  const email = "email@email.com";

  it("should have an action to set the actual value", () => {
    const expected = { type: ACTION_TYPES.SET_NAME, payload: "name" };
    expect(setName(expected.payload)).toEqual(expected);
  });

  it("should have an action to set the target value", () => {
    const expected = { type: ACTION_TYPES.SET_EMAIL, payload: email };
    expect(setEmail(expected.payload)).toEqual(expected);
  });

  it("should have an action to set the MOTC value", () => {
    const expected = { type: ACTION_TYPES.SET_CONFIRM_EMAIL, payload: email };
    expect(setConfirmEmail(expected.payload)).toEqual(expected);
  });
});
