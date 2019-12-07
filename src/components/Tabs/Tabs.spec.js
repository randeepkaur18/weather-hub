import React from "react";
import { shallow } from "enzyme";

import Tabs from "./Tabs";

describe("Tabs", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Tabs />);
  });

  test("renders without error", () => {
    const component = wrapper.find(`[data-test="component-tabs"]`);
    expect(component.length).toBe(1);
  });
});
