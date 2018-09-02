import React from "react";
import Calendar from "react-calendar/dist/entry.nostyle";
import styled from "styled-components";
import { inputFactory } from "./input";
import {
  labelBackgroundColor,
  labelColor,
  elementPadding,
  buttonDefaults,
  minimumInputHeight,
  highLightColor,
  inputPadding,
  Icon
} from "../common";

const StyledCalendar = styled(Calendar).attrs({
  nextLabel: <Icon icon="arrow-alt-circle-right" />
})`
  button.react-calendar__tile,
  button.react-calendar__navigation__arrow,
  button.react-calendar__navigation__label {
    border: none;
  }
  .react-calendar__month-view__weekdays__weekday {
    text-align: center;
  }
  button.react-calendar__tile {
    padding: ${elementPadding}px;
    transition: color 1s, background-color 0.6s;
    background-color: transparent;
  }
  button.react-calendar__navigation__label,
  button.react-calendar__navigation__arrow {
    background-color: transparent;
  }
  button.react-calendar__tile:enabled:hover,
  button.react-calendar__tile:enabled:focus {
    background-color: ${labelBackgroundColor};
    color: ${labelColor};
    cursor: pointer;
  }
`;

const RevealButton = styled.button`
  ${buttonDefaults};
  min-height: ${minimumInputHeight}px;
  padding: ${inputPadding};
  width: 100%;
  text-align: left;
  background-color: transparent;
  transition: background-color 0.6s,color 1s;
  &:hover {
    // background-color: ${highLightColor};
    background-color: ${labelBackgroundColor};
    color: ${labelColor};

  }
  &:hover svg {
    fill:${labelColor};
  }
`;
const DatePicker = props => {
  const value =
    typeof props.value == "string" ? new Date(props.value) : props.value;
  const valueString = value.toLocaleString();
  return [
    <RevealButton>
      <Icon icon="calendar" />
      {valueString}
    </RevealButton>,
    <StyledCalendar value={value} onChange={props.valueChanged} />
  ];
};

// class DatePicker extends React.Component {
//     constructor(props){
//         super(props);
//         this.state={

//         }
//     }

// }
export default inputFactory(DatePicker);
