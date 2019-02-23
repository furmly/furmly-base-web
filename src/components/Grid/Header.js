import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { animated, Transition } from "react-spring/renderprops";
import { StyledIconButton } from "../common/components/Button";
import {
  boxShadow,
  containerPadding,
  labelColor,
  highLightColor
} from "../common/variables";
import Icon from "../common/components/Icon";
import SubTitle from "../common/components/SubTitle";

const HeaderButton = styled(StyledIconButton)`
  margin: ${containerPadding}px;
`;
const Title = styled(SubTitle)`
  cursor: pointer;
  padding: ${containerPadding}px;
  font-weight: bold;
  color: ${labelColor};
  &:hover {
    background-color: ${highLightColor};
  }
`;
const Container = styled.div`
  ${boxShadow};
  border-bottom: rgba(0, 0, 0, 0.18) solid 1px;
`;

class GridHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({ open: !this.state.open });
  }
  render() {
    if (!React.isValidElement(this.props.children)) return null;

    return (
      <Container>
        <Title onClick={this.toggle}>
          <Icon icon="filter" color={labelColor} size={16} />
          Filter
        </Title>
        <Transition
          items={this.state.open}
          native
          from={{ height: 0, opacity: 0 }}
          enter={{ height: "auto", opacity: 1 }}
          leave={{ height: 0, opacity: 0 }}
        >
          {open =>
            (open &&
              (props => (
                <animated.div style={{ ...props, overflow: "hidden" }}>
                  {this.props.children}
                  <HeaderButton icon="search" onClick={this.props.filter}>
                    SEARCH
                  </HeaderButton>
                </animated.div>
              ))) ||
            null
          }
        </Transition>
      </Container>
    );
  }
}

GridHeader.propTypes = {
  filter: PropTypes.func.isRequired
};

export default GridHeader;
