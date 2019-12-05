import React from "react";
import { shallow } from "enzyme";

import WeeklyWeather from "./WeeklyWeather";

describe("WeeklyWeather", () => {
  test("renders without error", () => {
    let props = {};
    const wrapper = shallow(<WeeklyWeather {...props} />);
    const component = wrapper.find(`[data-test="component-weekly-weather"]`);
    expect(component.length).toBe(1);
  });
});
