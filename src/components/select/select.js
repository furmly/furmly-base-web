import React from "react";
import styled from "styled-components";
import {
  minimumInputHeight,
  inputPadding,
  highLightColor,
  boxShadow,
  dropDownMenuColor,
  labelBackgroundColor,
  labelColor
} from "../common/variables";
import { inputFactory } from "../input/input";
import { hover } from "../common/animations";

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Menu = styled.div`
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${dropDownMenuColor};
  width: 100%;
  visibility: hidden;
  opacity: 0;
  transform: translate(0, -50%);
  ${boxShadow};
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 2px;
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
  background-color: transparent; 
  min-height: ${minimumInputHeight}px;
  width: 100%;
  text-align: left;
  &.show {
    background-color: ${labelColor}; 
  }
  &.show:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 2px;
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
    }, 300);
  }
  revealClicked(e) {
    if (e && e.target) this.toggleMenu();
  }

  render() {
    const {
      disabled,
      displayProperty,
      valueChanged,
      value,
      keyProperty,
      label,
      items
    } = this.props;
    const showMenu = this.state.showMenu.join(" ");
    return (
      <Container onBlur={this.revealClicked}>
        <RevealButton
          className={showMenu}
          onClick={this.revealClicked}
          disabled={disabled}
        >
          {value || `${label}`}
        </RevealButton>
        <Menu className={showMenu}>
          {items.map(x => (
            <Item
              onClick={() => this.toggleMenu(valueChanged(x[keyProperty]))}
              key={x[keyProperty]}
            >
              {x[displayProperty]}
            </Item>
          ))}
        </Menu>
      </Container>
    );
  }
}

export default inputFactory(Select, true);
