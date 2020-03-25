import {useMemo} from "react";
import Measurement from "../../models/measurement.model";

export interface MeasurementsHooks {
  latestMeasurement: Measurement | null,
}

export const useMeasurements = (
  measurements: Measurement[] | null
): MeasurementsHooks => {
  const latestMeasurement = useMemo<Measurement | null>((): Measurement | null => {
    function findLatestMeasurement(measurements: Measurement[]) {
      return measurements.find(({value}: Measurement) => value != null)
    }

    if (measurements?.length) {
      const foundMeasurement = findLatestMeasurement(measurements);
      if (!foundMeasurement) {
        return measurements[0];
      }
      return foundMeasurement;
    }
    return null;
  }, [measurements])

  return {
    latestMeasurement
  }
}