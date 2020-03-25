import Commune from "./commune.model";

export default interface City {
  id: number,
  name: string,
  commune: Commune,
}