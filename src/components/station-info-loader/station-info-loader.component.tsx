import React from "react";
import ContentLoader from "react-content-loader";

export const StationInfoLoader = (): JSX.Element => {
  return (
    <div>
      <ContentLoader
        speed={2}
        width={300}
        height={78}
        viewBox="0 0 300 78"
        backgroundColor="#1a275c"
        foregroundColor="#121f56"
      >
        <rect x="15" y="0" rx="10" ry="10" width="270" height="16" />
        <rect x="0" y="31" rx="10" ry="10" width="300" height="16" />
        <rect x="30" y="62" rx="10" ry="10" width="240" height="16" />
      </ContentLoader>
    </div>
  )
}