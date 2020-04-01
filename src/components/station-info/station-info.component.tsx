import React, {useEffect} from "react";
import Station from "../../models/station.model";
import AirQualityIndex from "../../models/air-quality-index.model";

export interface StationInfoProps {
  selectedStation: Station | null;
  index: AirQualityIndex | null;
}

const StationInfo = (props: StationInfoProps): JSX.Element => {
  const {selectedStation, index} = props

  return (
    <div>
      <figcaption className="station">
        {selectedStation?.city.name}
      </figcaption>
      <figcaption className="station">
        {selectedStation?.addressStreet || selectedStation?.stationName}
      </figcaption>
      <figcaption className="station">
        Jakość powietrza: <b>{index?.stIndexLevel?.indexLevelName?.replace(/.$/, "a")}</b>
      </figcaption>
    </div>
  )
}

export default StationInfo;