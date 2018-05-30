import React from "react";
import { shallow } from "enzyme";

import App from "./App";
import RequestInviteModal from "./RequestInviteModal/RequestInviteModal";

describe("Top level app component", () => {
  it("render the App component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(RequestInviteModal).length).toBe(1);
  });
});
