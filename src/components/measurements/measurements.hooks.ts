import {useCallback, useEffect, useMemo, useState} from "react";
import {SensorApi} from "../../api/sensor/sensor.api";
import Measurement from "../../models/measurement.model";

export interface MeasurementsHooks {
  latestMeasurement: Measurement | null,
  measurements: Measurement[] | null
}

export const useMeasurements = (
  sensorId: number | null
): MeasurementsHooks => {
  const [measurements, setMeasurements] = useState<Measurement[] | null>(null)

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

  const fetchSensorData = useCallback(() => {
    (async (): Promise<void> => {
      if (sensorId) {
        const sensorData = await SensorApi.getSensorData(sensorId)
        setMeasurements(sensorData.values)
      }
    })();
  }, [sensorId])

  useEffect(() => {
    fetchSensorData()
    console.log("*** FETCHING MEASUREMENTS ***")
  }, [fetchSensorData])

  return {
    latestMeasurement,
    measurements
  }
}