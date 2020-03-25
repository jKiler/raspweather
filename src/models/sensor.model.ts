import Param from "./param.model";
import Measurement from "./measurement.model";

export default interface Sensor {
    id: number,
    stationId: number,
    param: Param,
    measurements: Measurement[]
}