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

export const loader = keyframes`
	0% {
		stroke-dasharray: 755 1006;
		stroke-dashoffset: 0;
		animation-timing-function: cubic-bezier(0.895, 0.03, 0.685, 0.22);
	}
	49.999% {
		stroke-dasharray: 0 1006;
		stroke-dashoffset: 0;
	}
	50.001% {
		stroke-dasharray: 0 1006;
		stroke-dashoffset: -1006;
		animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
	}
	100% {
		stroke-dasharray: 755 1006;
		stroke-dashoffset: -251;
	}
  `;

export const spin = keyframes` to { transform: rotate(1turn); }`;
export const hover = `
  transition: background-color 0.6s, color 1s
  `;
