import React from "react";
import { shallow } from "enzyme";

import WeatherContainer from "./WeatherContainer";

describe("WeatherContainer", () => {
  test("renders without error", () => {
    const wrapper = shallow(<WeatherContainer />);
    const component = wrapper.find(`[data-test="component-weather-container"]`);
    expect(component.length).toBe(1);
  });
});
