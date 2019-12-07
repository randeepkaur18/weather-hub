import React from "react";
import { shallow } from "enzyme";

import WeatherData from "./WeatherData";

describe("WeatherData", () => {
  let wrapper;
  let props = {};

  beforeEach(() => {
    wrapper = shallow(<WeatherData />);
  });

  test("renders without error", () => {
    const component = wrapper.find(`[data-test="component-weather-data"]`);
    expect(component.length).toBe(1);
  });
});
