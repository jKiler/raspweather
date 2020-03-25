import React, {useState} from "react";
import {useStations} from "../../components/stations/stations.hooks";
import {useSensors} from "../../components/sensors/sensors.hooks";
import {useIndex} from "../../components/index/index.hooks";
import {SensorList} from "../../components/sensor-list/sensor-list.component";
import {SensorChart} from "../../components/sensor-chart/sensor-chart.component";
import Sensor from "../../models/sensor.model";
import './dashboard.component.css';

const Dashboard = () => {
  const myLat = parseFloat("50.092895")
  // const myLon = parseFloat("19.992486")
  const myLon = parseFloat("50.092895")

  const [selectedSensorId, setSelectedSensorId] = useState<number>(0)

  const {closestStation, stations} = useStations(myLat, myLon)
  const {selectedSensor, sensors} = useSensors(closestStation, selectedSensorId)
  const {index} = useIndex(closestStation)

  return (
    <figure>
      <figcaption className="station">
        {closestStation?.city.name || '-'}
      </figcaption>
      <figcaption className="station">
        {closestStation?.addressStreet || closestStation?.stationName || '-'}
      </figcaption>
      <figcaption className="station">
        Jakość powietrza: <b>{index?.stIndexLevel?.indexLevelName?.replace(/.$/, "a") || '-'}</b>
      </figcaption>
      <SensorList sensors={sensors}/>
      <SensorChart selectedSensor={selectedSensor}/>
      {sensors?.map((sensor: Sensor) => (
        <button key={sensor.id} onClick={() => setSelectedSensorId(sensor.id)}>{sensor.param.paramCode}</button>
      ))}
    </figure>
  );
}

export default Dashboard;