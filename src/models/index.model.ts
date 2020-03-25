import IndexLevel from "./index-level.model";

export default interface Index {
  id: number,
  stCalcDate: string,
  stIndexLevel: IndexLevel,
  stSourceDataDate: string,
}