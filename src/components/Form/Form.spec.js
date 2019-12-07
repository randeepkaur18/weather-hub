import React from "react";
import { shallow } from "enzyme";
import moxios from "moxios";

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
  });

  test("renders search button without error", () => {
    const button = wrapper.find(`[data-test="search-button"]`);
    expect(button.length).toBe(1);
  });

  // describe("moxios test", () => {
  //   let mockFn;
  //   beforeEach(() => {
  //     mockFn = jest.fn();
  //     React.useState = jest.fn(() => ["", mockFn]);
  //     wrapper = shallow(<Form />);
  //     moxios.install();
  //   });

  //   afterEach(() => {
  //     moxios.uninstall();
  //     mockFn.mockClear();
  //   });

  //   test("calls setData on axios response on click of search button", () => {
  //     const button = wrapper.find(`[data-test="search-button"]`);

  //     const mockEvent = { preventDefault: jest.fn() };
  //     button.simulate("click", mockEvent);

  //     moxios.wait(() => {
  //       const request = moxios.requests.mostRecent();
  //       request.respondWith({
  //         data: {
  //           cod: 200,
  //           message: 0,
  //           cnt: 40,
  //           list: [
  //             {
  //               dt_txt: "2019-12-04 09:00:00"
  //             }
  //           ],
  //           city: {
  //             name: "Bangalore"
  //           }
  //         },
  //         status: 200
  //       });
  //     });

  //     expect(mockFn).toHaveBeenCalled();
  //   });

  //   test("calls setError with error message on axios response of `404`", () => {
  //     const button = wrapper.find(`[data-test="search-button"]`);

  //     const mockEvent = { preventDefault: jest.fn() };
  //     button.simulate("click", mockEvent);

  //     moxios.wait(() => {
  //       const request = moxios.requests.mostRecent();
  //       request.respondWith({
  //         data: {
  //           cod: 404,
  //           message: "city not found"
  //         },
  //         status: 404
  //       });
  //     });

  //     expect(mockFn).toHaveBeenCalledWith(
  //       "Sorry! Could not find the location."
  //     );
  //   });

  //   // test("calls setError on axios response", () => {
  //   //   React.useState = jest.fn(() => ["", mockFn]);
  //   //   wrapper = shallow(<Form />);
  //   //   const button = wrapper.find(`[data-test="search-button"]`);

  //   //   const mockEvent = { preventDefault: jest.fn() };
  //   //   button.simulate("click", mockEvent);

  //   //   moxios.wait(() => {
  //   //     const request = moxios.requests.mostRecent();
  //   //     request.
  //   //   });

  //   //   expect(mockFn).toHaveBeenCalledWith("Oops! something went wrong.");
  //   // });
  // });
});
