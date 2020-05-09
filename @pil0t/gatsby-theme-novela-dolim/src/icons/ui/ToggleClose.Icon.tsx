import React from "react";

import { Icon } from '@types';

const ToggleClose: Icon = ({ fill }) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.6796 14L8.50023 10.8276L5.32088 14L4.34422 13.0233L8.50023 8.86732L12.6563 13.0233L11.6796 14Z"
      fill={fill}
    />
    <path
      d="M5.32041 3L8.49977 6.17243L11.6791 3L12.6558 3.97666L8.49977 8.13268L4.34375 3.97666L5.32041 3Z"
      fill={fill}
    />
  </svg>
);

export default ToggleClose;
