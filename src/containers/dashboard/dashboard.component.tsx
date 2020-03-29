import React, {useEffect, useState} from "react";
import {useStations} from "../../components/stations/stations.hooks";
import {useSensors} from "../../components/sensors/sensors.hooks";
import {useIndex} from "../../components/index/index.hooks";
import {SensorList} from "../../components/sensor-list/sensor-list.component";
import {SensorChart} from "../../components/sensor-chart/sensor-chart.component";
import {geolocated, GeolocatedProps} from "react-geolocated";
import Sensor from "../../models/sensor.model";
import './dashboard.component.css';

const Dashboard = (props: GeolocatedProps): JSX.Element => {
  const {isGeolocationAvailable, isGeolocationEnabled, coords} = props
  const [coordinates, setCoordinates] = useState<Coordinates>()

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled) {
      setCoordinates(coords)
    }
  }, [isGeolocationAvailable, isGeolocationEnabled, coords])

  const [selectedSensorId, setSelectedSensorId] = useState<number>(0)

  const {closestStation, stations} = useStations(coordinates)
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

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Dashboard);