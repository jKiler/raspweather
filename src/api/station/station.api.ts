import backend from "../backend";
import {handleResponse} from "../handleResponse";
import Station from "../../models/station.model";
import AirQualityIndex from "../../models/air-quality-index.model";

export class StationApi {
  static getStations(): Promise<Station[]> {
    return handleResponse(backend.get(`/rest/station/findAll`))
  }

  static getIndex(stationId: number): Promise<AirQualityIndex> {
    return handleResponse(backend.get(`/rest/aqindex/getIndex/${stationId}`))
  }
}