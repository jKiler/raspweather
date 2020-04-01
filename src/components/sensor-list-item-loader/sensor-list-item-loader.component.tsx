import React from "react";
import ContentLoader from "react-content-loader";

export const SensorListItemLoader = (): JSX.Element => {
  return (
    <figure>
      <ContentLoader
        speed={2}
        width={120}
        height={154}
        viewBox="0 0 120 154"
        backgroundColor="#1a275c"
        foregroundColor="#121f56"
      >
        <circle cx="60" cy="60" r="52"/>
        <rect x="0" y="138" rx="10" ry="10" width="120" height="16"/>
      </ContentLoader>
    </figure>
  )
}