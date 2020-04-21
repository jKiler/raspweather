import IndexLevel from "./index-level.model";

export default interface AirQualityIndex {
  id: number,
  stCalcDate: string,
  stIndexLevel: IndexLevel,
  stSourceDataDate: string,
}