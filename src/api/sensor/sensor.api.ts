import backend from '../backend';
import {handleResponse} from "../handleResponse";
import Sensor from "../../models/sensor.model";
import SensorData from "../../models/sensor-data.model";

export class SensorApi {
  static getSensors(stationId: number): Promise<Sensor[]> {
    return handleResponse(backend.get(`/rest/station/sensors/${stationId}`))
  }

  static getSensorData(sensorId: number): Promise<SensorData> {
    return handleResponse(backend.get(`/rest/data/getData/${sensorId}`))
  }
}