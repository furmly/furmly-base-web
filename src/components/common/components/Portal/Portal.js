import React from "react";
import styled, { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Overlay from "../Overlay";
import { media } from "../../utils";
import StyledButton from "../Button";
import { containerPadding } from "../../variables";

const ActionContainer = styled.div`
  align-self: flex-end;
  margin: ${containerPadding}px;
`;
const ContentContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${media.xSmall`
  min-width:100%;
`};
  ${props => props.extend && props.extend(props)}
`;

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.id = "furmly-dialog";
    this.portalElement = null;
    this.overlayClicked = this.overlayClicked.bind(this);
  }
  render() {
    return null;
  }
  overlayClicked() {
    if (this.props.overlayClicked) {
      this.props.overlayClicked();
    }
  }
  componentDidMount() {
    let id = this.props.portalId || this.id;
    let p = id && document.getElementById(id);
    if (!p) {
      p = document.createElement("div");
      p.addEventListener("click", this.clickOverlay);
      p.id = id;
      document.body.appendChild(p);
    }
    this.portalElement = p;
    this.componentDidUpdate();
  }
  componentWillUnmount() {
    this.portalElement.removeEventListener("click", this.overlayClicked);
    try {
      document.body.removeChild(this.portalElement);
    } catch (e) {
      if (e.message == "Failed to execute 'removeChild' on 'Node'") return;
    }
  }
  componentDidUpdate() {
    ReactDOM.render(
      <ThemeProvider theme={this.props.theme}>
        <Overlay isOpen={this.props.isOpen}>
          <ContentContainer extend={this.props.extend}>
            {this.props.children}
            {this.props.actionButtons && (
              <ActionContainer>
                {this.props.actionButtons.map((x, index) => (
                  <StyledButton
                    onClick={x.onClick}
                    key={x.key || index}
                    intent={x.intent}
                  >
                    {x.icon && <Icon icon={x.icon} />}
                    {x.content}
                  </StyledButton>
                ))}
              </ActionContainer>
            )}
          </ContentContainer>
        </Overlay>
      </ThemeProvider>,
      this.portalElement
    );
  }
}

Portal.propTypes = {
  theme: PropTypes.object.isRequired
};
export default Portal;
