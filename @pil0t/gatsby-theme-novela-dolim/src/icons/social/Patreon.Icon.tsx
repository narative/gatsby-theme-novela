import React from "react";

import { Icon } from '@types';

const PatreonIcon: Icon = ({ fill = "white" }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M512 194.8c0 101.3-82.4 183.8-183.8 183.8-101.7 0-184.4-82.4-184.4-183.8 0-101.6 82.7-184.3 184.4-184.3C429.6 10.5 512 93.2 512 194.8zM0 501.5h90v-491H0v491z"
      fill={fill}/>
  </svg>

);

export default PatreonIcon;
