import React from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import {
  minimumInputHeight,
  inputPadding,
  highLightColor,
  dropDownMenuColor,
  borderColor,
  aboveOthers,
  inputBackgroundColor,
  largerBoxShadow,
  inputColor,
  dropShadowColor
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
const show = keyframes`
  0% {
  opacity:0;
  display:block;
  transform: translate(0, -5%);
  }
  50% {
  opacity:0.25
  }
  90% {
  opacity:0.8
  }
  100% {
  opacity:1;
  transform: translate(0, 0);
  }
`;

const hide = keyframes`
0% {
  opacity:1;
  display:block;
  transform: translate(0,0%);
  }
  90% {
  opacity:0.1
  display:block;
  }
  100% {
  opacity:0;
  display: none;
  transform: translate(0,-5%);
  }
`;

const MenuContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 25vh;
  position: relative;
  &.shadow:after {
    content: "";
    width: 100%;
    height: 10px;
    background-image: linear-gradient(
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.05),
      rgba(255, 0, 0, 0)
    );
    position: fixed;
    top: 0px;
  }
`;
const Menu = styled.div`
  ${aboveOthers};
  position: absolute;
  border-top-color: ${borderColor};
  border-top-width: 2px;
  background-color: ${dropDownMenuColor};
  width: 100%;
  display: none;
  opacity: 0;
  transform: translate(0, -5%);
  ${largerBoxShadow};
  &.show {
    display: block;
    animation-name: ${show};
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
    opacity: 1;
  }
  &.hide {
    animation-name: ${hide};
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
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
  padding-right: 20px;
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
  color: ${inputColor};
  padding: ${inputPadding};
  padding-top: 5px;
  padding-bottom: 5px;
  ${hover};
  &:hover {
    background-color: ${highLightColor};
  }
`;

class Select extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { showMenu: "", displayLabel: null };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.revealClicked = this.revealClicked.bind(this);
    this.onMenuScroll = this.onMenuScroll.bind(this);
    this.setRef = this.setRef.bind(this);
  }
  componentWillMount() {
    this.getDisplayLabel();
  }
  componentWillReceiveProps(next) {
    if (next.value !== this.props.value) {
      this.getDisplayLabel(next);
    }
  }
  componentWillUnmount() {
    if (this.scrollable) {
      this.scrollable.removeEventListener("scroll", this.scrollHandler);
    }
  }
  getDisplayLabel(props = this.props) {
    if (props.value && props.items) {
      const { keyProperty, displayProperty } = props;
      for (let i = 0; i < props.items.length; i++) {
        for (let z = 0; z <= keyProperty.length - 1; z++) {
          if (props.items[i][keyProperty[z]] == props.value) {
            this.setState({ displayLabel: props.items[i][displayProperty] });
            return;
          }
        }
      }
    } else {
      this.setState({ displayLabel: null });
    }
  }
  toggleMenu(cb) {
    const showMenu =
      !this.state.showMenu || this.state.showMenu == "hide" ? "show" : "hide";
    const args = [
      {
        showMenu
      }
    ];
    if (cb) args.push(cb);
    setTimeout(() => {
      if (showMenu == "show" && this.scrollable) {
        const { top } = this.container.getBoundingClientRect();
        this.menu.style.top = `${top + this.container.offsetHeight}px`;
      }
      this.setState.apply(this, args);
    }, 0);
  }
  revealClicked(e) {
    if (e && e.target) this.toggleMenu();
  }

  outsideClick(e) {
    if (this.state.showMenu == "show") {
      if (this.menu) {
        this.menu.style.display = "";
      }
      this.setState({
        showMenu: "hide"
      });
    }
  }
  onMenuScroll(e) {
    console.log("menu scrolling");
    if (e.target.scrollTop > 0 && e.target.className !== "shadow") {
      e.target.classList.add("shadow");
    } else {
      e.target.classList.remove("shadow");
    }
  }
  fetchKey(item) {
    const { keyProperty } = this.props;
    for (let i = 0; i <= keyProperty.length - 1; i++) {
      if (item[keyProperty[i]]) return item[keyProperty[i]];
    }
    return item[keyProperty[0]];
  }
  setRef(node) {
    this.container = node;
    const scrollable = node && node.closest(".furmly-scrollable");
    if (scrollable) {
      const { top: scrollableTop } = scrollable.getBoundingClientRect();
      if (this.menu) {
        this.menu.style.position = "fixed";
        this.menu.style.width = this.container.offsetWidth + "px";
      }
      this.scrollHandler = e => {
        if (this.menu && this.menu.className.indexOf("show") !== -1) {
          const { top } = this.container.getBoundingClientRect();

          this.menu.style.top = `${top + this.container.offsetHeight}px`;
          this.menu.style.display =
            top <= scrollableTop ||
            top >
              scrollableTop + scrollable.offsetHeight >=
              this.container.offsetHeight
              ? "none"
              : "block";
        }
      };
      scrollable.addEventListener("scroll", this.scrollHandler);
      this.scrollable = scrollable;
    }

    this.props.innerRef(this, node);
  }
  render() {
    const {
      disabled,
      displayProperty,
      valueChanged,
      items,
      ItemElement
    } = this.props;
    const MenuItem = ItemElement || Item;
    const showMenu = this.state.showMenu;
    return (
      <Container innerRef={node => this.setRef(node)}>
        <RevealButton
          className={showMenu}
          onClick={this.revealClicked}
          disabled={disabled}
        >
          {this.state.displayLabel || "Select..."}
        </RevealButton>
        <Menu className={showMenu} innerRef={node => (this.menu = node)}>
          <MenuContainer onScroll={this.onMenuScroll}>
            {(items || []).map(x => {
              const key = this.fetchKey(x);
              return (
                <MenuItem
                  onClick={() => this.toggleMenu(valueChanged(key))}
                  key={key}
                  data={x}
                >
                  {x[displayProperty]}
                </MenuItem>
              );
            })}
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
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  keyProperty: PropTypes.array.isRequired,
  label: PropTypes.string,
  items: PropTypes.array.isRequired,
  ItemElement: PropTypes.element
};
export default Select;
