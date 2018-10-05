import { keyframes } from "styled-components";

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

export const spin = keyframes`
  0% {
    transform:rotate(0deg);
  }
  20% {
    transform:rotate(60deg);
  }
  50% {
    transform:rotate(90deg);
  }
  80% {
    transform:rotate(180deg);
  }
  100% {
    transform:rotate(360deg);
  }
  `;

export const hover = `
  transition: background-color 0.6s, color 1s
  `;
