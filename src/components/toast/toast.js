import React from "react";
import ReactDOM from "react-dom";
import styled, { ThemeProvider } from "styled-components";
import { Transition, animated } from "react-spring/renderprops";
import {
  largerBoxShadow,
  modalBackgroundColor,
  inputColor,
  elementPadding,
  dropShadowColor,
  secondaryBackgroundColor
} from "../common/variables";
export const DURATION = {
  SHORT: 300000,
  LONG: 6000,
  INFINITE: 0
};
export default ({ rootTargetId, theme } = { rootTargetId: "furmly-toast" }) => {
  let modalRoot = document.getElementById(rootTargetId);
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = rootTargetId;
    document.body.append(modalRoot);
  }
  const AnimatedDiv = styled(animated.div)`
    min-width: 200px;
    min-height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: ${elementPadding}px;
    background-image: linear-gradient(to left, #3584b1, #47afeb 95%);
    color: ${inputColor};
    box-shadow:5px 5px 4px 0px ${dropShadowColor};
  `;
  const ToastContainer = styled.div`
    pointer-events: none;
    position: absolute;
    bottom: 0;
    right: 0;
  `;

  const hooks = {};
  class Toast extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        messages: []
      };
      this.close = this.close.bind(this);
      hooks.show = (message, duration = DURATION.SHORT) => {
        let handle;
        this.setState({
          messages: [...this.state.messages, message]
        });
        if (duration) {
          handle = setTimeout(this.close.bind(this, message), duration);
        }
        return () => {
          if (handle) clearTimeout(handle);
          this.close(message);
        };
      };
    }
    close(message) {
      const messages = this.state.messages.slice();
      messages.splice(messages.findIndex(x => x === message), 1);
      this.setState({
        messages
      });
    }
    render() {
      return (
        <ToastContainer>
          <Transition
            native
            items={this.state.messages}
            from={{ opacity: 0, transform: "translateX(100%)" }}
            enter={{ opacity: 1, transform: "translateX(10px)" }}
            leave={{ opacity: 0, transform: "translateX(100%)" }}
          >
            {x => style => (
              <AnimatedDiv className={"toast"} style={style}>
                {x}
              </AnimatedDiv>
            )}
          </Transition>
        </ToastContainer>
      );
    }
  }
  ReactDOM.render(
    <ThemeProvider theme={theme || {}}>
      <Toast />
    </ThemeProvider>,
    modalRoot
  );
  return hooks;
};
