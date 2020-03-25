import {useCallback, useEffect, useState} from "react";
import {StationApi} from "../../api/station/station.api";
import Station from "../../models/station.model";
import Index from "../../models/index.model";

export interface IndexHooks {
  index: Index | null;
}

export const useIndex = (
  selectedStation: Station | null
): IndexHooks => {
  const [index, setIndex] = useState<Index | null>(null)

  const fetchIndex = useCallback(() => {
    (async (): Promise<void> => {
      if (selectedStation) {
        const index = await StationApi.getIndex(selectedStation.id)
        setIndex(index)
      }
    })();
  }, [selectedStation])

  useEffect(() => {
    fetchIndex()
  }, [fetchIndex])

  return {
    index
  }
}