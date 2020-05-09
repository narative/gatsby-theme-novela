import React from "react";

import { Icon } from '@types';

const FacebookIcon: Icon = ({ fill = "white" }) => (
  <svg
    width="7"
    height="14"
    viewBox="0 0 7 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.36849 7.36482H6.35279L6.64986 4.99457H4.36849V3.48124C4.36849 2.79501 4.55373 2.32731 5.5103 2.32731L6.73028 2.32673V0.206821C6.51919 0.17804 5.79505 0.113525 4.95257 0.113525C3.19363 0.113525 1.98943 1.21807 1.98943 3.24662V4.99464H0V7.36488H1.98936V13.4469L4.36849 13.4468V7.36482Z"
      fill={fill}
    />
  </svg>
);

export default FacebookIcon;
