import Measurement from "./measurement.model";

export default interface SensorData {
    key: string,
    values: Measurement[]
}