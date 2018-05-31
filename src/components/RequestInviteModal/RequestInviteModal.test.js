import React from "react";
import { Provider } from "react-redux";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import { Modal } from "react-bootstrap";
import ConnectedRequestInviteModal, {
  RequestInviteModal
} from "./RequestInviteModal";
import httpBackend from "superagent-httpbackend";

import { initialState } from "../../reducers/requestInviteReducer";
import RequestInviteForm from "./RequestInviteForm";
import RequestInviteSuccess from "./RequestInviteSuccess";
import {
  resetState,
  setSubmissionInProg,
  setErrorMessage,
  setRequestSubmitted
} from "../../actions/requestInviteActions";

describe("RequestInviteModal", () => {
  const mockStore = configureStore();
  const reducer = { requestInviteReducer: { ...initialState } };
  const store = mockStore(reducer);

  const passedInProps = { show: false, onHide: jest.fn() };

  it("should connect the RequestInviteModal to redux store", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRequestInviteModal {...passedInProps} />
      </Provider>
    );

    expect(wrapper.find(Modal).length).toBe(1);
    expect(wrapper.find(RequestInviteForm).length).toBe(0);
  });

  it("should reset state on hide", () => {
    const testProps = Object.assign({}, initialState, passedInProps, {
      dispatch: jest.fn()
    });
    const wrapper = shallow(<RequestInviteModal {...testProps} />);

    expect(testProps.onHide).not.toHaveBeenCalled();
    expect(testProps.dispatch).not.toHaveBeenCalled();

    wrapper.instance().onHide();
    expect(testProps.onHide).toHaveBeenCalledTimes(1);
    expect(testProps.dispatch).toHaveBeenCalledWith(resetState());
  });

  it("should pass props to the modal correctly", () => {
    const testProps = Object.assign({}, initialState, passedInProps);
    const wrapper = shallow(<RequestInviteModal {...testProps} />);

    expect(wrapper.find(Modal).props().onHide).toBe(wrapper.instance().onHide);
  });

  it("should show the form when the form isn't submitted", () => {
    const testProps = Object.assign({}, initialState, passedInProps);
    const wrapper = shallow(<RequestInviteModal {...testProps} />);

    expect(wrapper.find(RequestInviteForm).length).toBe(1);
    expect(wrapper.find(RequestInviteSuccess).length).toBe(0);
    expect(wrapper.find(RequestInviteForm).props().onSubmit).toBe(
      wrapper.instance().requestInvite
    );
  });

  it("should show the form when the form is submitted", () => {
    const testProps = Object.assign(
      {},
      initialState,
      { requestSubmitted: true },
      passedInProps
    );
    const wrapper = shallow(<RequestInviteModal {...testProps} />);

    expect(wrapper.find(RequestInviteForm).length).toBe(0);
    expect(wrapper.find(RequestInviteSuccess).length).toBe(1);
    expect(wrapper.find(RequestInviteSuccess).props().onHide).toBe(
      wrapper.instance().onHide
    );
  });

  it("should request invite correctly", () => {
    const testProps = Object.assign({}, initialState, passedInProps, {
      dispatch: jest.fn(),
      requestParams: { test: 1 }
    });
    const wrapper = shallow(<RequestInviteModal {...testProps} />);

    const validateBody = body => {
      expect(body).toEqual(testProps.requestParams);
    };
    httpBackend
      .expectPOST(
        "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
        validateBody
      )
      .respond("Registered");

    const mockEvent = { preventDefault: jest.fn() };
    wrapper.instance().requestInvite(mockEvent);
    httpBackend.flush();

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(testProps.dispatch).toHaveBeenCalledWith(setSubmissionInProg(true));
    expect(testProps.dispatch).toHaveBeenCalledWith(setErrorMessage(""));
    expect(testProps.dispatch).toHaveBeenCalledWith(setSubmissionInProg(false));
    expect(testProps.dispatch).toHaveBeenCalledWith(setRequestSubmitted(true));
  });

  it("should handle request invite error correctly", () => {
    const testProps = Object.assign({}, initialState, passedInProps, {
      dispatch: jest.fn(),
      requestParams: { test: 1 }
    });
    const wrapper = shallow(<RequestInviteModal {...testProps} />);

    const validateBody = body => {
      expect(body).toEqual(testProps.requestParams);
    };
    httpBackend
      .expectPOST(
        "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
        validateBody
      )
      .error(400, "Bad Request", { errorMessage: "Bad Request" });

    const mockEvent = { preventDefault: jest.fn() };
    wrapper.instance().requestInvite(mockEvent);
    httpBackend.flush();

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(testProps.dispatch).toHaveBeenCalledWith(setSubmissionInProg(true));
    expect(testProps.dispatch).toHaveBeenCalledWith(
      setErrorMessage("Bad Request")
    );
    expect(testProps.dispatch).toHaveBeenCalledWith(setSubmissionInProg(false));
  });
});
