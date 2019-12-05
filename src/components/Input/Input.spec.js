import React from "react";
import { shallow } from "enzyme";
import checkPropTypes from "check-prop-types";

import Input from "./Input";

describe("Input", () => {
  let wrapper;
  let props = {
    setInputValue: jest.fn()
  };
  beforeEach(() => {
    wrapper = shallow(<Input {...props} />);
  });

  test("renders without error", () => {
    const input = wrapper.find(`[data-test="component-input"]`);
    expect(input.length).toBe(1);
  });

  test("does not throw warning with expected props", () => {
    const propError = checkPropTypes(
      Input.propTypes,
      props,
      "prop",
      Input.name
    );
    expect(propError).toBeUndefined();
  });

  describe("state controlled input field", () => {
    let mockSetValue = jest.fn();
    afterEach(() => {
      mockSetValue.mockClear();
    });
    test("state updates with value of input upon onchange", () => {
      React.useState = jest.fn(() => ["", mockSetValue]);
      wrapper = shallow(<Input setInputValue={jest.fn()} />);

      const input = wrapper.find(`[data-test="component-input"]`);

      // mocking the onChange event and simulating
      const mockEvent = { target: { value: "bangalore" } };
      input.simulate("change", mockEvent);

      expect(mockSetValue).toHaveBeenCalledWith("bangalore");
    });
  });

  //   test("calls useEffect on input value change", () => {
  //     const mockSetInputValue = jest.fn();
  //     wrapper = shallow(<Input setInputValue={mockSetInputValue} />);

  //     const mockEvent = { target: { value: "bangalore" } };
  //     const input = wrapper.find(`[data-test="component-input"]`);
  //     input.simulate("change", mockEvent);

  //     expect(mockSetInputValue).toHaveBeenCalledTimes(1);
  //   });
});
