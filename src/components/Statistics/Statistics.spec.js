import React from "react";
import { shallow } from "enzyme";

import Statistics from "./Statistics";

describe("Statistics", () => {
  test("renders without error", () => {
    const props = {};
    const wrapper = shallow(<Statistics {...props} />);
    const component = wrapper.find(`[data-test="component-statistics"]`);
    expect(component.length).toBe(1);
  });
});
