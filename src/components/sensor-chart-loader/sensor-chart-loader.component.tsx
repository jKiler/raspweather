import React from "react";
import ContentLoader from "react-content-loader";

export const SensorChartLoader = (): JSX.Element => {
  return (
    <div>
        <ContentLoader
          speed={2}
          width={1000}
          height={335}
          viewBox="0 0 1000 335"
          backgroundColor="#1a275c"
          foregroundColor="#121f56"
        >
          <rect x="0" y="0" rx="5" ry="5" width="1000" height="335"/>
        </ContentLoader>
    </div>
  )
}