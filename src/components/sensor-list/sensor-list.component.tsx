import React from 'react';
import {SensorListItem} from "../sensor-list-item/sensor-list-item.component";
import Sensor from "../../models/sensor.model";
import "./sensor-list.component.css"

export interface SensorListProps {
  sensors: Sensor[] | null;
}

export const SensorList = (props: SensorListProps): JSX.Element => {
  const {sensors} = props;

  return (
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
  )
}