import React from "react";
import { Provider } from "react-redux";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import ConnectedRequestInviteModal, {
  RequestInviteModal
} from "./RequestInviteModal";
import RequestInviteForm from "./RequestInviteForm";
import { initialState } from "../../reducers/requestInviteReducer";

describe("RequestInviteModal", () => {
  const mockStore = configureStore();
  const reducer = { requestInviteReducer: { ...initialState } };
  const store = mockStore(reducer);

  it("should connect the RequestInviteModal to redux store", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRequestInviteModal />
      </Provider>
    );

    expect(wrapper.find(RequestInviteForm).length).toBe(1);
  });
});
