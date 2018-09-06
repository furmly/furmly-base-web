import styled, {
  injectGlobal,
  withTheme,
  ThemeProvider,
  keyframes,
  css
} from "styled-components";
import Lato from "../fonts/Lato-Light.ttf";
import Roboto from "../fonts/Roboto-Thin.ttf";
import icons from "../icons";
import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

export const ns = "furmly";
export const smallText = props => props.theme.factor * 14;
export const smallestText = props => props.theme.factor * 12;
export const bodyText = props => props.theme.factor * 16;
export const labelBackgroundColor = props => props.theme.labelBackgroundColor;
export const labelColor = props => props.theme.labelColor;
export const errorColor = props => props.theme.errorColor || "red";
export const elementPadding = props => props.theme.factor * 5;
export const minimumInputHeight = props =>
  (props.large && props.theme.factor * 10 + 50) || props.theme.factor * 30;
export const highLightColor = props =>
  props.theme.highLightColor || "#0000001a";
export const inputPadding = props => `0px ${props.theme.factor * 5}px`;
export const iconSize = props => props.size || props.theme.factor * 10;

export const createMedia = (
  xSmall = 600,
  small = 600,
  medium = 768,
  large = 992,
  xlarge = 1200
) => ({
  xSmall: (...content) => css`
    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: ${xSmall}px) {
      ${css(...content)};
    }
  `,
  small: (...content) => css`
    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: ${small}px) {
      ${css(...content)};
    }
  `,
  medium: (...content) => css`
    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: ${medium}px) {
      ${css(...content)};
    }
  `,
  large: (...content) => css`
    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: ${large}px) {
      ${css(...content)};
    }
  `,
  xlarge: (...content) => css`
    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: ${xlarge}px) {
      ${css(...content)};
    }
  `
});
export const media = createMedia();

export const buttonDefaults = "display: block;  border: none;";
export const FormDiv = styled.div`
  padding: ${props => props.theme.factor * 10}px;
  background-color: #00000003;
`;
export const ripple = keyframes`
  0% {
    transform: scale(0, 0);
    opacity: 1;
  }
  20% {
    transform: scale(25, 25);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(40, 40);
  }`;

export const StyledButton = styled.button`
  ${media.medium`min-width:${props => props.theme.factor * 54}px`};
  background-color: ${labelBackgroundColor};
  color: ${labelColor};
  overflow: hidden;
  position: relative;
  border: none;
  min-height: ${minimumInputHeight}px;
  &:hover {
    font-weight: bold;
  }
  &:focus:not(:active)::after {
    animation: ${ripple} 1s ease-out;
  }
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }
`;
export const Label = styled.label`
  background-color: ${labelBackgroundColor};
  color: ${labelColor};
  padding: ${props => props.theme.factor * 5}px;
  font-size: ${smallText}px;
  display: inline-block;
  transition: background-color 1s;
  &.error {
    background-color: ${errorColor};
  }
`;

const FormLabelContainer = styled.div`
  width: 100%;
  position: relative;
`;
const FocusIndicator = styled.hr`
  width: 0%;
  position: absolute;
  bottom: 0px;
  border: none;
  margin: 0px;
  height: ${props => props.theme.factor * 2}px;
  background-color: ${labelBackgroundColor};
  transition: width ease-in-out 0.5s;
  transition-delay: 200ms;
  ${FormDiv}:hover & {
    width: 100%;
  }
  ${Label}.error+& {
    background-color: ${errorColor};
  }
`;
export const FormLabel = props => (
  <FormLabelContainer>
    <Label {...props} />
    <FocusIndicator />
  </FormLabelContainer>
);
export const Overlay = styled.div.attrs({
  className: props => props.isOpen && "show"
})`
  width:100%;
  height:100%
   z-index:-100;
  left:0;
  top:0;
  position:absolute;
  background-color:#0000007d;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  opacity:0;
  transition:opacity 0.5s;
  &.show {
    opacity:1;
    z-index:0;
  }
  & > * {
  max-width:50vw;
  max-height:50vh;
  }
`;

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
    console.log(this.props.theme);
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

export const StyledPortal = withTheme(Portal);

export const ErrorText = styled.p`
  color: ${errorColor};
  font-size: ${smallestText}px;
  margin: 1px 0px;
  display: block;
`;

export const Copy = styled.span`
  color: ${props => props.theme.copyColor || "gray"};
  font-size: ${smallestText}px;
  display: block;
`;

const IconContainer = styled.svg`
  width: ${iconSize}px;
  height: ${iconSize}px;
  margin-right: ${elementPadding}px;
`;

export const Icon = ({ icon }) => {
  const iconInfo = icons[icon];
  if (!iconInfo) throw new Error(`Unknown Icon bro ${icon}`);
  return (
    <IconContainer viewBox={`0 0 ${iconInfo[0]} ${iconInfo[1]}`}>
      <path d={iconInfo[4]} />
    </IconContainer>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired
};

injectGlobal`
textarea, select, input, button { outline: none; }
@font-face {
  font-family:'Lato';
  src:url(${Lato})
}
@font-face {
  font-family:'Roboto';
  src:url(${Roboto})
}

body,button{
  font-family:Lato;
}
`;
