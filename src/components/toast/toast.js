import React from "react";
import ReactDOM from "react-dom";
import styled, { ThemeProvider } from "styled-components";
import { Transition, animated } from "react-spring/renderprops";
import {
  inputColor,
  elementPadding,
  dropShadowColor,
  secondaryBackgroundColor
} from "../common/variables";
import Icon from "../common/components/Icon";
const DURATION = {
  SHORT: 4000,
  LONG: 10000,
  INFINITE: 0
};
export default ({ rootTargetId, theme } = { rootTargetId: "furmly-toast" }) => {
  let modalRoot = document.getElementById(rootTargetId);
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = rootTargetId;
    document.body.appendChild(modalRoot);
  }
  const foreground = props => props.theme.toastColor || inputColor(props);
  const AnimatedDiv = styled(animated.div)`
    min-width: 200px;
    min-height: 50px;
    margin-top: ${elementPadding}px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${elementPadding}px 16px;
    background: ${props =>
      props.theme.toastBackgroundColor || secondaryBackgroundColor(props)};
    color: ${foreground};
    box-shadow: 1px 0px 20px 2px ${dropShadowColor};
  `;
  const ToastContainer = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
  `;

  const hooks = {
    DURATION
  };
  let key = 0;
  class Toast extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        messages: []
      };
      this.close = this.close.bind(this);
      hooks.show = (message, duration = DURATION.SHORT, onDismissed) => {
        let handle;
        let _message = { key: key++, message, onDismissed };
        this.setState({
          messages: [...this.state.messages, _message]
        });
        if (duration) {
          handle = setTimeout(this.close.bind(this, _message), duration);
        }
        return () => {
          if (handle) clearTimeout(handle);
          this.close(_message);
        };
      };
      Object.freeze(hooks);
    }
    close(message) {
      const messages = this.state.messages.slice();
      messages.splice(messages.findIndex(x => x === message), 1);
      this.setState(
        {
          messages
        },
        () => {
          if (message.onDismissed) message.onDismissed();
        }
      );
    }
    render() {
      return (
        <ToastContainer>
          <Transition
            native
            items={this.state.messages}
            keys={item => item.key}
            from={{ opacity: 0, transform: "translateX(100%)" }}
            enter={{ opacity: 1, transform: "translateX(0)" }}
            leave={{ opacity: 0, transform: "translateX(100%)" }}
          >
            {x => style => (
              <AnimatedDiv className={"toast"} style={style}>
                {x.message}
                <Icon
                  icon={"times"}
                  color={foreground}
                  onClick={() => this.close(x)}
                />
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
