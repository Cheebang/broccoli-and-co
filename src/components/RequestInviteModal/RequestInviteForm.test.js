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
  const passedInProps = { onSubmit: jest.fn() };

  it("should connect the RequestInviteForm to redux store", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRequestInviteForm {...passedInProps} />
      </Provider>
    );

    expect(wrapper.find(Button).length).toBe(1);
    expect(wrapper.find(Button).text()).toBe("Submit");
    expect(wrapper.find("form").length).toBe(1);
    expect(wrapper.find(Alert).length).toBe(0);
    const inputs = wrapper.find(FormControl);
    expect(inputs.length).toBe(3);
    expect(wrapper.find(Button).props().disabled).toBeFalsy();
  });

  const dispatchFunctions = {
    setNameAction: jest.fn(),
    setEmailAction: jest.fn(),
    setConfirmEmailAction: jest.fn()
  };

  it("should call the passed in submit function on submit", () => {
    const testProps = Object.assign(
      {},
      initialState,
      dispatchFunctions,
      passedInProps
    );
    const wrapper = shallow(<RequestInviteForm {...testProps} />);
    expect(wrapper.find(Button).props().disabled).toBeFalsy();
    expect(wrapper.find("form").props().onSubmit).toBe(testProps.onSubmit);
    wrapper.find("form").simulate("submit");
    expect(testProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it("should show sending message while awaiting response", () => {
    const testProps = Object.assign(
      {},
      initialState,
      { submissionInProgress: true },
      dispatchFunctions,
      passedInProps
    );
    const wrapper = shallow(<RequestInviteForm {...testProps} />);
    expect(
      wrapper
        .find(Button)
        .children()
        .text()
    ).toEqual("Sending.... please wait");
    expect(wrapper.find(Button).props().disabled).toBeTruthy();
  });

  it("should show error message when there is one", () => {
    const testProps = Object.assign(
      {},
      initialState,
      { errorMessage: "error" },
      dispatchFunctions,
      passedInProps
    );
    const wrapper = shallow(<RequestInviteForm {...testProps} />);

    expect(wrapper.find(Alert).length).toBe(1);
    expect(
      wrapper
        .find(Alert)
        .children()
        .text()
    ).toBe(testProps.errorMessage);
  });

  it("should have the change handlers set correctly", () => {
    const testProps = Object.assign(
      {},
      initialState,
      dispatchFunctions,
      {confirmEmailValidationState: 'error'},
      passedInProps
    );
    const wrapper = shallow(<RequestInviteForm {...testProps} />);

    const inputs = wrapper.find(FormControl);
    expect(inputs.at(0).props().onChange).toBe(testProps.setNameAction);
    expect(inputs.at(1).props().onChange).toBe(testProps.setEmailAction);
    expect(inputs.at(2).props().onChange).toBe(testProps.setConfirmEmailAction);
    expect(wrapper.find(FormGroup).at(2).props().validationState).toBe(testProps.confirmEmailValidationState);
    expect(wrapper.find(Button).props().disabled).toBeTruthy();
  });
});
//TODO check html5 validations