import React from "react";

import { Icon } from '@types';

const ToggleOpen: Icon = ({ fill }) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.3209 8.86719L8.50026 12.0396L11.6796 8.86719L12.6563 9.84385L8.50026 13.9999L4.34424 9.84385L5.3209 8.86719Z"
      fill={fill}
    />
    <path
      d="M11.6791 8.13281L8.49974 4.96039L5.32039 8.13281L4.34373 7.15615L8.49974 3.00013L12.6558 7.15615L11.6791 8.13281Z"
      fill={fill}
    />
  </svg>
);

export default ToggleOpen;
