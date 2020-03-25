import City from "./city.model";

export default interface Station {
  id: number,
  stationName: string,
  gegrLat: number,
  gegrLon: number,
  city: City,
  addressStreet: string,
}