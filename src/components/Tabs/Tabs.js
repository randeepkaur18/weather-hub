import React from "react";

import Tabs from "./Tabs";

describe("Tabs", () => {
  let props = {};
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Tabs {...props} />);
  });

  test("renders without error", () => {
    const component = wrapper.find(`[data-test="component-tabs"]`);
    expect(component.length).toBe(1);
  });
});
