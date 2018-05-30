import React from "react";
import { Provider } from "react-redux";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import ConnectedRequestInviteModal, {
  RequestInviteModal
} from "./RequestInviteModal";
import { Modal } from "react-bootstrap";
import { initialState } from "../../reducers/requestInviteReducer";
import RequestInviteForm from "./RequestInviteForm";
import RequestInviteSuccess from "./RequestInviteSuccess";

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

  it("should show the form when the for isn't submitted", () => {
    const testProps = Object.assign({}, initialState, passedInProps);
    const wrapper = shallow(<RequestInviteModal {...testProps} />);

    expect(wrapper.find(RequestInviteForm).length).toBe(1);
    expect(wrapper.find(RequestInviteSuccess).length).toBe(0);
  });

  it("should show the form when the for isn't submitted", () => {
    const testProps = Object.assign(
      {},
      initialState,
      { requestSubmitted: true },
      passedInProps
    );
    const wrapper = shallow(<RequestInviteModal {...testProps} />);

    expect(wrapper.find(RequestInviteForm).length).toBe(0);
    expect(wrapper.find(RequestInviteSuccess).length).toBe(1);
  });
});
