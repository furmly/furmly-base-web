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
  inputColor
} from "../common/variables";

import { hover } from "../common/animations";

const Container = styled.div`
  position: relative;
  width: 100%;
  &:after {
    content: "▼";
    color: ${inputColor};
    position: absolute;
    top: calc(${props => minimumInputHeight(props) / 2}px - 0.6em);
    right: 5px;
    pointer-events: none;
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
  color: ${props => (!props.queryOpen && inputColor(props)) || "transparent"};
  background-color: ${inputBackgroundColor};
  min-height: ${minimumInputHeight}px;
  width: 100%;
  text-align: left;
  padding: ${inputPadding};
  transition: background-color 0.6s, color 1s
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

const Input = styled.input`
  position: absolute;
  background-color: transparent;
  padding: ${inputPadding};
  border: none;
  color: ${inputColor};
  min-height: ${minimumInputHeight}px;
  width: calc(100% - 20px);
`;

class Select extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: "",
      displayLabel: null,
      query: "",
      inputHasFocus: false,
      queryResult: []
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.revealClicked = this.revealClicked.bind(this);
    this.onMenuScroll = this.onMenuScroll.bind(this);
    this.setRef = this.setRef.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.menuRef = this.menuRef.bind(this);
    this.inputFocused = this.inputFocused.bind(this);
    this.cleanInput = this.cleanInput.bind(this);
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
      const { displayProperty } = props;
      for (let i = 0; i < props.items.length; i++) {
        if (this.props.getKeyValue(props.items[i]) === props.value) {
          this.setState({ displayLabel: props.items[i][displayProperty] });
          return;
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
    if (e.target.scrollTop > 0 && e.target.className !== "shadow") {
      e.target.classList.add("shadow");
    } else {
      e.target.classList.remove("shadow");
    }
  }

  setQuery(e) {
    this.setState({
      query: e.target.value,
      queryResult: this.props.filter(e.target.value)
    });
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
  menuRef(ref) {
    this.menu = ref;
  }
  cleanInput() {
    this.setState({
      query: "",
      queryResult: [],
      inputHasFocus: false
    });
  }
  inputFocused() {
    this.setState(
      {
        inputHasFocus: true
      },
      this.toggleMenu
    );
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
    const { showMenu, queryResult, query, inputHasFocus } = this.state;
    return (
      <Container innerRef={node => this.setRef(node)}>
        <Input
          value={query}
          onChange={this.setQuery}
          onFocus={this.inputFocused}
          onBlur={this.cleanInput}
          disabled={disabled}
        />
        <RevealButton
          className={showMenu}
          onClick={this.revealClicked}
          disabled={disabled}
          queryOpen={inputHasFocus}
        >
          {this.state.displayLabel || "Select..."}
        </RevealButton>
        <Menu className={showMenu} innerRef={this.menuRef}>
          <MenuContainer onScroll={this.onMenuScroll}>
            {((query && queryResult) || items || []).map(x => {
              const key = this.props.getKeyValue(x);
              return (
                <MenuItem
                  onClick={() => {
                    // this.cleanInput();
                    this.toggleMenu(valueChanged(key));
                  }}
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
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number
  ]),
  keyProperty: PropTypes.array.isRequired,
  label: PropTypes.string,
  items: PropTypes.array.isRequired,
  ItemElement: PropTypes.element
};
export default Select;
