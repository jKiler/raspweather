import React, {useEffect} from "react";
import Station from "../../models/station.model";
import AirQualityIndex from "../../models/air-quality-index.model";
import "./station-info.component.css"

export interface StationInfoProps {
  selectedStation: Station | null;
  index: AirQualityIndex | null;
  onInitialized?: () => void;
  style?: React.CSSProperties;
}

const StationInfo = (props: StationInfoProps): JSX.Element => {
  const {selectedStation, index, onInitialized, style} = props;

  useEffect(() => {
    if (onInitialized && selectedStation && index) {
      onInitialized()
    }
  }, [onInitialized, selectedStation, index])

  return (
    <div style={style}>
      <section className="station-info">
        <figcaption className="station" style={{marginTop: "0px"}}>
          {selectedStation?.city.name}
        </figcaption>
        <figcaption className="station">
          {selectedStation?.addressStreet || selectedStation?.stationName}
        </figcaption>
        <figcaption className="station">
          Jakość powietrza: <b>{index?.stIndexLevel?.indexLevelName?.replace(/y$/i, "a")}</b>
        </figcaption>
      </section>
    </div>
  )
}

export default StationInfo;