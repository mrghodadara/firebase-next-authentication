import React from 'react';

interface ISpinner {
  width?: number;
  height?: number;
  className?: string;
  stroke?: string;
}
const Spinner = ({ className, height, width, stroke }: ISpinner) => {
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      stroke={stroke || '#1D7AFC'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <style>
        {`
          .spinner {
            transform-origin: center;
            animation: rotate 2s linear infinite;
          }
          .spinner circle {
            stroke-linecap: round;
            animation: dash 1.5s ease-in-out infinite;
          }
          @keyframes rotate {
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes dash {
            0% {
              stroke-dasharray: 0 150;
              stroke-dashoffset: 0;
            }
            47.5% {
              stroke-dasharray: 42 150;
              stroke-dashoffset: -16;
            }
            95%, 100% {
              stroke-dasharray: 42 150;
              stroke-dashoffset: -59;
            }
          }
        `}
      </style>
      <g className="spinner">
        <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="2" />
      </g>
    </svg>
  );
};

export { Spinner };
