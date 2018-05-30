import React from "react";

import { ACTION_TYPES } from "../actions/requestInviteActions";
import requestInviteReducer, {
  getActualValidationState,
  getRequestParams,
  getConfirmEmailValidationState
} from "./requestInviteReducer";

describe("Request Invite Reducer", () => {
  const payload = 1;
  it("should reduce for SET_NAME", () => {
    expect(
      requestInviteReducer({}, { type: ACTION_TYPES.SET_NAME, payload })
    ).toEqual({ name: payload });
  });

  it("should reduce for SET_EMAIL", () => {
    expect(
      requestInviteReducer({}, { type: ACTION_TYPES.SET_EMAIL, payload })
    ).toEqual({ email: payload });
  });

  it("should reduce for SET_CONFIRM_EMAIL", () => {
    expect(
      requestInviteReducer(
        {},
        { type: ACTION_TYPES.SET_CONFIRM_EMAIL, payload }
      )
    ).toEqual({ confirmEmail: payload });
  });

  it("should getRequestParams", () => {
    const name = "name";
    const email = "email";
    const confirmEmail = "email";
    const state = {
      requestInviteReducer: {
        name,
        email,
        confirmEmail
      }
    };
    expect(getRequestParams(state)).toEqual({ name, email, confirmEmail });
  });

  it("should getConfirmEmailValidationState", () => {
    const email = "email";
    const confirmEmail = "email";
    const state = {
      requestInviteReducer: { email, confirmEmail }
    };
    expect(getConfirmEmailValidationState(state)).toEqual("success");

    state.requestInviteReducer.email = "somethingelse";
    expect(getConfirmEmailValidationState(state)).toEqual("error");

    state.requestInviteReducer.email = "";
    expect(getConfirmEmailValidationState(state)).toEqual(null);
  });
});
