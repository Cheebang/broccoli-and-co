import React from "react";
import { shallow } from "enzyme";
import { Button } from "react-bootstrap";

import App from "./App";
import RequestInviteModal from "./RequestInviteModal/RequestInviteModal";

describe("Top level app component", () => {
  it("should render the App component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('header').length).toBe(1);
    expect(wrapper.find('main').length).toBe(1);
    expect(wrapper.find('footer').length).toBe(1);
    expect(wrapper.find(RequestInviteModal).length).toBe(1);
    expect(wrapper.find(RequestInviteModal).props().show).toBeFalsy();
    expect(wrapper.find(RequestInviteModal).props().onHide).toBe(wrapper.instance().closeModal);
    expect(wrapper.find(Button).length).toBe(1);
  });

  it("should open modal on button click", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(RequestInviteModal).props().show).toBeFalsy();
    expect(wrapper.find(Button).length).toBe(1);
    wrapper.find(Button).simulate('click');
    expect(wrapper.find(RequestInviteModal).props().show).toBeTruthy();
  });
});
