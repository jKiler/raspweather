import Station from "../../models/station.model";
import {useCallback, useEffect, useMemo, useState} from "react";
import {haversine} from "../helpers";
import {StationApi} from "../../api/station/station.api";

export interface StationsHooks {
  closestStation: Station | null;
  stations: Station[] | null;
}

export const useStations = (
  coords: Coordinates | undefined
): StationsHooks => {
  const latitude = coords?.latitude || parseFloat("50.092895")
  const longitude = coords?.longitude || parseFloat("50.092895")
  const [stations, setStations] = useState<Station[] | null>(null)

  const closestStation = useMemo<Station | null>((): Station | null => {
    function findClosestStation(stations: Station[]): Station {
      return stations.reduce((prev, curr) => {
        const prevDist = haversine(latitude, longitude, prev.gegrLat, prev.gegrLon)
        const currDist = haversine(latitude, longitude, curr.gegrLat, curr.gegrLon)
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
  }, [stations, latitude, longitude]);

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