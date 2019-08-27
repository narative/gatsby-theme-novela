import React from "react";

const UnsplashIcon = ({ fill = "white" }) => (
  <svg
    width="32"
    height="32"
    xmlns="http://www.w3.org/2000/svg">
    <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"
    fill={fill}/>
  </svg>

);

export default UnsplashIcon;
