import React, {useEffect, useState} from "react";
import {useStations} from "../../components/stations/stations.hooks";
import {useSensors} from "../../components/sensors/sensors.hooks";
import {useIndex} from "../../components/air-quality-index/air-quality-index.hooks";
import {StationInfoLoader} from "../../components/station-info-loader/station-info-loader.component";
import {SensorListLoader} from "../../components/sensor-list-loader/sensor-list-loader.component";
import {SensorChartLoader} from "../../components/sensor-chart-loader/sensor-chart-loader.component";
import {geolocated, GeolocatedProps} from "react-geolocated";
import DynamicModule from "../../components/dynamic-module";
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

  const {selectedStation, stations} = useStations(coordinates)
  const {selectedSensor, sensors} = useSensors(selectedStation, selectedSensorId)
  const {airQualityIndex} = useIndex(selectedStation)

  return (
    <figure>
      <DynamicModule
        placeholder={<StationInfoLoader/>}
        component={() => import("../../components/station-info/station-info.component")}
        selectedStation={selectedStation}
        index={airQualityIndex}
      />
      <DynamicModule
        placeholder={<SensorListLoader/>}
        component={() => import("../../components/sensor-list/sensor-list.component")}
        sensors={sensors}
      />
      <DynamicModule
        placeholder={<SensorChartLoader/>}
        component={() => import("../../components/sensor-chart/sensor-chart.component")}
        selectedSensor={selectedSensor}
      />
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
  userDecisionTimeout: 5000,
})(Dashboard);