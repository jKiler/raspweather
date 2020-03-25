import React from "react";
import "./progress-ring.component.css"

interface ProgressRingProps {
  radius: number,
  stroke: number,
  progress: number,
  counter: number
}

export const ProgressRing = ({radius, stroke, progress, counter}: ProgressRingProps) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = progress <= 100 ? circumference - progress / 100 * circumference : 0;

  const className = `
      ${counter > 50 ? 'blue-stroke' : 'green-stroke'}
      ${counter > 100 ? 'light-red-stroke' : ''}
      ${counter > 200 ? 'red-stroke' : ''}
    `;
  const classNameBg = `
      ${counter > 50 ? 'blue-stroke-bg' : 'green-stroke-bg'}
      ${counter > 100 ? 'light-red-stroke-bg' : ''}
      ${counter > 200 ? 'red-stroke-bg' : ''}
    `;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
    >
      <circle className={"circle" + classNameBg}
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
      />
      <circle className={"circle" + className}
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              strokeLinecap="round"
              style={{strokeDashoffset}}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
      />
      <text
        stroke="none"
        fill="white"
        dy=".3em"
        x="50%"
        y="50%"
        textAnchor="middle"
        fontSize={radius / 2}
      >
        {counter}%
      </text>
    </svg>
  );
}