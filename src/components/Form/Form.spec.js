import React from "react";
import { shallow } from "enzyme";

import Form from "./Form";
import Input from "../Input/Input";

describe("Form", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Form />);
  });

  test("renders without error", () => {
    const form = wrapper.find(`[data-test="component-form"]`);
    expect(form.length).toBe(1);
  });

  test("renders two <Input> components", () => {
    const setInputValue = jest.fn();
    wrapper.setProps(setInputValue);
    const inputs = wrapper.find(Input);
    expect(inputs.length).toBe(2);
    // expect(input[0].prop('setInputValue')).toBe()
  });

  describe("search button", () => {
    test("renders without error", () => {
      const button = wrapper.find(`[data-test="search-button"]`);
      expect(button.length).toBe(1);
    });

    // test("submit the form on click of search button", () => {
    //   const button = wrapper.find(`[data-test="search-button"]`);
    // });
  });
});
