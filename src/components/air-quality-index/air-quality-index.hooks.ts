import {useCallback, useEffect, useState} from "react";
import {StationApi} from "../../api/station/station.api";
import Station from "../../models/station.model";
import AirQualityIndex from "../../models/air-quality-index.model";

export interface AirQualityIndexHooks {
  airQualityIndex: AirQualityIndex | null;
}

export const useIndex = (
  selectedStation: Station | null
): AirQualityIndexHooks => {
  const [airQualityIndex, setAirQualityIndex] = useState<AirQualityIndex | null>(null)

  const fetchIndex = useCallback(() => {
    (async (): Promise<void> => {
      if (selectedStation) {
        const index = await StationApi.getIndex(selectedStation.id)
        setAirQualityIndex(index)
      }
    })();
  }, [selectedStation])

  useEffect(() => {
    fetchIndex()
  }, [fetchIndex])

  return {
    airQualityIndex: airQualityIndex
  }
}