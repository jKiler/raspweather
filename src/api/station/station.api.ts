import backend from "../backend";
import {handleResponse} from "../handleResponse";
import Station from "../../models/station.model";
import Index from "../../models/index.model";

export class StationApi {
  static getStations(): Promise<Station[]> {
    return handleResponse(backend.get(`/rest/station/findAll`))
  }

  static getIndex(stationId: number): Promise<Index> {
    return handleResponse(backend.get(`/rest/aqindex/getIndex/${stationId}`))
  }
}