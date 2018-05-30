import React from "react";
import { shallow } from "enzyme";
import { Modal, Button } from "react-bootstrap";

import RequestInviteSuccess from "./RequestInviteSuccess";

describe("RequestInviteSuccess", () => {
  const props = { onHide: jest.fn() };

  it("should render the RequestInviteSuccess", () => {
    const wrapper = shallow(<RequestInviteSuccess {...props} />);
    expect(wrapper.find(Modal.Header).length).toBe(1);
    expect(wrapper.find(Modal.Body).length).toBe(1);

    const button = wrapper.find(Button);
    expect(button.length).toBe(1);
    expect(props.onHide).not.toHaveBeenCalled();
    button.simulate("click");
    expect(props.onHide).toHaveBeenCalledTimes(1);
  });
});
