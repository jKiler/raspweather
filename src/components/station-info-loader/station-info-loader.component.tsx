import React from "react";
import ContentLoader from "react-content-loader";

export const StationInfoLoader = (): JSX.Element => {
  return (
    <section>
        <ContentLoader
          speed={2}
          width={1000}
          height={78}
          viewBox="0 0 1000 78"
          backgroundColor="#1a275c"
          foregroundColor="#121f56"
        >
          <rect x="365" y="0" rx="5" ry="5" width="270" height="16" />
          <rect x="350" y="31" rx="5" ry="5" width="300" height="16" />
          <rect x="380" y="62" rx="5" ry="5" width="240" height="16" />
        </ContentLoader>
    </section>
  )
}