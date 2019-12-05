import React from "react";
import { shallow } from "enzyme";

import TodaysWeather from "./TodaysWeather";

describe("TodaysWeather", () => {
  test("renders without error", () => {
    let props = {};
    const wrapper = shallow(<TodaysWeather {...props} />);
    const component = wrapper.find(`[data-test="component-todays-weather"]`);
    expect(component.length).toBe(1);
  });
});
