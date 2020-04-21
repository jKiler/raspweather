import React, {useEffect} from 'react';
import {SensorListItem} from "../sensor-list-item/sensor-list-item.component";
import Sensor from "../../models/sensor.model";
import "./sensor-list.component.css"

export interface SensorListProps {
  sensors: Sensor[] | null;
  onInitialized?: () => void;
  style?: React.CSSProperties;
}

const SensorList = (props: SensorListProps): JSX.Element => {
  const {sensors, onInitialized, style} = props;

  useEffect(() => {
    if (onInitialized && sensors) {
      onInitialized()
    }
  }, [onInitialized, sensors])

  return (
    <div style={style}>
      <section className="sensor-list">
        {sensors?.map((sensor: Sensor) => (
          <SensorListItem
            key={sensor.id}
            id={sensor.id}
            param={sensor.param}
            measurements={sensor.measurements}
          />
        ))}
      </section>
    </div>
  )
}

export default SensorList;