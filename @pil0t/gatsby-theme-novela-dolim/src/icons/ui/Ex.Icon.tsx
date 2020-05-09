import React from "react";

import { Icon } from '@types';

const ExIcon: Icon = ({ fill = "#08080B" }) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0.188477H24V24.2789H0V0.188477Z"
      stroke="black"
      strokeOpacity="0.01"
      strokeWidth="0"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 6.58848L17.6 5.18848L12 10.7885L6.4 5.18848L5 6.58848L10.6 12.1885L5 17.7885L6.4 19.1885L12 13.5885L17.6 19.1885L19 17.7885L13.4 12.1885L19 6.58848Z"
      fill={fill}
    />
  </svg>
);

export default ExIcon;
