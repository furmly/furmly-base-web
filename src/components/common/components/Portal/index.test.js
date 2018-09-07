import React from "react";
import { mount } from "enzyme";
import Portal from "./Portal";

const clickFn = jest.fn();
const fakeTheme = {};
describe("Portal", () => {
  it("should render correctly", () => {
    const component = mount(
      <Portal
        theme={fakeTheme}
        actionButtons={[
          {
            onClick: clickFn,
            content: "Click here please",
            key: "Click here my guy"
          }
        ]}
      >
        <span className="text">This is life</span>
      </Portal>
    );
    expect(component).toMatchSnapshot();
  });
});
