import React from "react";
import styled, { ThemeProvider, withTheme } from "styled-components";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Overlay from "../Overlay";
import StyledButton from "../Button";

const ActionContainer = styled.div`
  align-self: flex-end;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    document.body.removeChild(this.portalElement);
  }
  componentDidUpdate() {
    ReactDOM.render(
      <ThemeProvider theme={this.props.theme}>
        <Overlay isOpen={this.props.isOpen}>
          <ContentContainer>
            {this.props.children}
            {this.props.actionButtons && (
              <ActionContainer>
                {this.props.actionButtons.map(x => (
                  <StyledButton onClick={x.onClick} key={x.key}>
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
