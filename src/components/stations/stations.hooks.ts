import Station from "../../models/station.model";
import {useCallback, useEffect, useMemo, useState} from "react";
import {haversine} from "../helpers";
import {StationApi} from "../../api/station/station.api";

export interface StationsHooks {
  selectedStation: Station | null;
  stations: Station[] | null;
}

export const useStations = (
  coords: Coordinates | undefined
): StationsHooks => {
  const [stations, setStations] = useState<Station[] | null>(null)

  const selectedStation = useMemo<Station | null>((): Station | null => {
    function findClosestStation(stations: Station[], coords: Coordinates): Station {
      return stations.reduce((prev, curr) => {
        const prevDist = haversine(coords.latitude, coords.longitude, prev.gegrLat, prev.gegrLon)
        const currDist = haversine(coords.latitude, coords.longitude, curr.gegrLat, curr.gegrLon)
        return prevDist > currDist ? curr : prev
      })
    }

    if (stations?.length && coords) {
      const foundStation = findClosestStation(stations, coords);
      if (!foundStation) {
        return stations[0];
      }
      return foundStation;
    }
    return null;
  }, [stations, coords]);

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
    selectedStation,
    stations
  }
}