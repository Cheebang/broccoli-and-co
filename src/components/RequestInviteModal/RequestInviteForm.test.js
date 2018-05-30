import React from "react";
import { Provider } from "react-redux";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import {
  Modal,
  Alert,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { initialState } from "../../reducers/requestInviteReducer";

import ConnectedRequestInviteForm, {
  RequestInviteForm
} from "./RequestInviteForm";

describe("RequestInviteForm", () => {
  const mockStore = configureStore();
  const reducer = { requestInviteReducer: { ...initialState } };
  const store = mockStore(reducer);

  it("should connect the RequestInviteForm to redux store", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRequestInviteForm onSubmit={() => {}} />
      </Provider>
    );

    const inputs = wrapper.find(FormControl);
    expect(inputs.length).toBe(3);
  });
});
