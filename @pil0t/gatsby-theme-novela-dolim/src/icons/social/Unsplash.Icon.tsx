import React from "react";

import { Icon } from '@types';

const UnsplashIcon: Icon = ({ fill = "white" }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 9V0H22V9H10ZM22 14H32V32H0V14H10V23H22V14Z" fill={fill} />
  </svg>
);

export default UnsplashIcon;
