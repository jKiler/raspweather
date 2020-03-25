import backend from "../backend";
import {handleResponse} from "../handleResponse";
import Station from "../../models/station.model";
import Index from "../../models/index.model";

export class StationApi {
  static getStations(): Promise<Station[]> {
    return handleResponse(backend.get(`/api/pjp-api/rest/station/findAll`))
  }

  static getIndex(stationId: number): Promise<Index> {
    return handleResponse(backend.get(`/api/pjp-api/rest/aqindex/getIndex/${stationId}`))
  }
}