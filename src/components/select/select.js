import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  minimumInputHeight,
  inputPadding,
  highLightColor,
  dropDownMenuColor,
  labelBackgroundColor,
  borderColor,
  formLineWidth,
  aboveOthers,
  inputBackgroundColor,
  largerBoxShadow,
  inputColor
} from "../common/variables";

import { hover } from "../common/animations";

const Container = styled.div`
  position: relative;
  width: 100%;
  &:after {
    content: "▼";
    position: absolute;
    top: calc(${props => minimumInputHeight(props) / 2}px - 0.6em);
    right: 5px;
  }
`;

const MenuContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 25vh;
`;
const Menu = styled.div`
  ${aboveOthers};
  position: absolute;
  border-top-color: ${borderColor};
  border-top-width: 2px;
  background-color: ${dropDownMenuColor};
  width: 100%;
  visibility: hidden;
  opacity: 0;
  transform: translate(0, -50%);
  ${largerBoxShadow};
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${formLineWidth}px;
    background-color: ${labelBackgroundColor};
  }
  &.show {
    visibility: visible;
    transform: translate(0, 0);
    transition: opacity 0.3s, transform 0.2s ease-in-out;
    opacity: 1;
  }
`;

const RevealButton = styled.button`
  display: block;
  border: none;
  color: ${inputColor};
  background-color: ${inputBackgroundColor};
  min-height: ${minimumInputHeight}px;
  width: 100%;
  text-align: left;
  padding: ${inputPadding};
  &.show {
  }
  &.show:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${formLineWidth}px;
    background-color: ${labelBackgroundColor};
  }
  ${hover};
  &:hover {
    background-color: ${highLightColor};
    cursor: pointer;
  }
`;

const Item = styled.span`
  width: 100%;
  cursor: pointer;
  display: block;
  padding: ${inputPadding};
  padding-top: 5px;
  padding-bottom: 5px;
  ${hover};
  &:hover {
    background-color: ${highLightColor};
  }
`;

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMenu: [] };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.revealClicked = this.revealClicked.bind(this);
    this.setRef = this.setRef.bind(this);
  }
  toggleMenu(cb) {
    let i = this.state.showMenu.slice();
    if (!i.length) {
      i.push("show");
    } else {
      i.pop();
    }
    const args = [
      {
        showMenu: i
      }
    ];
    if (cb) args.push(cb);
    setTimeout(() => {
      this.setState.apply(this, args);
    }, 0);
  }
  revealClicked(e) {
    if (e && e.target) this.toggleMenu();
  }

  outsideClick(e) {
    if (this.state.showMenu.length)
      this.setState({
        showMenu: []
      });
  }
  setRef(node) {
    this.ref = node;
  }
  render() {
    const {
      disabled,
      displayProperty,
      valueChanged,
      value,
      keyProperty,
      label,
      items,
      ItemElement
    } = this.props;
    const MenuItem = ItemElement || Item;
    const showMenu = this.state.showMenu.join(" ");
    return (
      <Container innerRef={node => this.props.innerRef(this, node)}>
        <RevealButton
          className={showMenu}
          onClick={this.revealClicked}
          disabled={disabled}
        >
          {value || label || ""}
        </RevealButton>
        <Menu className={showMenu}>
          <MenuContainer>
            {items.map(x => (
              <MenuItem
                onClick={() => this.toggleMenu(valueChanged(x[keyProperty]))}
                key={x[keyProperty]}
                data={x}
              >
                {x[displayProperty]}
              </MenuItem>
            ))}
          </MenuContainer>
        </Menu>
      </Container>
    );
  }
}

Select.propTypes = {
  disabled: PropTypes.bool,
  displayProperty: PropTypes.string,
  valueChanged: PropTypes.func,
  value: PropTypes.oneOfType(PropTypes.object, PropTypes.string),
  keyProperty: PropTypes.string.isRequired,
  label: PropTypes.string,
  items: PropTypes.array.isRequired,
  ItemElement: PropTypes.element
};
export default Select;
