import Station from "../../models/station.model";
import {useCallback, useEffect, useMemo, useState} from "react";
import {haversine} from "../helpers";
import {StationApi} from "../../api/station/station.api";

export interface StationsHooks {
  closestStation: Station | null;
  stations: Station[] | null;
}

export const useStations = (
  currentLat: number,
  currentLon: number
): StationsHooks => {
  const [stations, setStations] = useState<Station[] | null>(null)

  const closestStation = useMemo<Station | null>((): Station | null => {
    function findClosestStation(stations: Station[]): Station {
      return stations.reduce((prev, curr) => {
        const prevDist = haversine(currentLat, currentLon, prev.gegrLat, prev.gegrLon)
        const currDist = haversine(currentLat, currentLon, curr.gegrLat, curr.gegrLon)
        return prevDist > currDist ? curr : prev
      })
    }

    if (stations?.length) {
      const foundStation = findClosestStation(stations);
      if (!foundStation) {
        return stations[0];
      }
      return foundStation;
    }
    return null;
  }, [stations, currentLat, currentLon]);

  const fetchStations = useCallback(() => {
    (async (): Promise<void> => {
      const stations = await StationApi.getStations()
      setStations(stations)
    })();
  }, [])

  useEffect(() => {
    fetchStations()
  }, [fetchStations])

  return {
    closestStation,
    stations
  }
}