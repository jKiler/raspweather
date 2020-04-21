import React from "react";
import {SensorListItemLoader} from "../sensor-list-item-loader/sensor-list-item-loader.component";
import "./sensor-list-loader.component.css"

export const SensorListLoader = (): JSX.Element => {
  const arr = [1, 2, 3, 4, 5]
  return (
    <section className="sensor-list">
      {arr?.map((val: number) => (
        <SensorListItemLoader
          key={val}
        />
      ))}
    </section>
  )
}