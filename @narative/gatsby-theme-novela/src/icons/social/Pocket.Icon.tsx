import React from 'react';
import { Icon } from '@types';

const PocketIcon: Icon = ({ fill = "white" }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none"
    >
      <path 
        d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"
        fill={fill}
      />
      <polyline
        points="8 10 12 14 16 10"
      />
    </svg>
);

export default PocketIcon;
