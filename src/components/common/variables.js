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
export const buttonDefaults = "display: block;  border: none;";
export const formComponentBackgroundColor = "#00000003";
