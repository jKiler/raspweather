import {useEffect, useRef} from "react";

export const useInterval = (callback: any, delay: number | null) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      // @ts-ignore
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const haversine = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
) => {
  const radians = (degrees: number) => degrees * Math.PI / 180;

  const radLat1 = radians(lat1)
  const radLon1 = radians(lon1)
  const radLat2 = radians(lat2)
  const radLon2 = radians(lon2)

  const radLatDiff = radLat2 - radLat1
  const radLonDiff = radLon2 - radLon1

  const computed = Math.sin(radLatDiff / 2) ** 2 + Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(radLonDiff / 2) ** 2
  return 2 * Math.asin(Math.sqrt(computed)) * 6371
}