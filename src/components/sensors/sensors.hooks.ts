import {useCallback, useEffect, useMemo, useState} from "react";
import {SensorApi} from "../../api/sensor/sensor.api";
import Station from "../../models/station.model";
import Sensor from "../../models/sensor.model";

export interface SensorsHooks {
  selectedSensor: Sensor | null;
  sensors: Sensor[] | null;
}

export const useSensors = (
  selectedStation: Station | null,
  selectedSensorId: number,
): SensorsHooks => {
  const [sensors, setSensors] = useState<Sensor[] | null>(null)
  const [isFetchInProgress, setIsFetchInProgress] = useState<boolean>(false)

  const selectedSensor = useMemo<Sensor | null>((): Sensor | null => {
    function findSensorById(id: number): Sensor | null {
      return (
        (sensors?.find((sensor: Sensor): boolean => sensor.id === id)) || null
      );
    }

    if (sensors?.length && !isFetchInProgress) {
      const foundSensor = findSensorById(selectedSensorId);
      if (!foundSensor) {
        return sensors[0];
      }
      return foundSensor;
    }
    return null;
  }, [selectedSensorId, sensors, isFetchInProgress]);

  const fetchSensors = useCallback(() => {
    (async (): Promise<void> => {
      if (selectedStation) {
        setIsFetchInProgress(true);
        try {
          const sensors = await SensorApi.getSensors(selectedStation.id)
          setSensors(sensors)
        } catch (err) {
          console.log(err)
        } finally {
          setIsFetchInProgress(false)
        }
      }
    })();
  }, [selectedStation])

  function updateSensorsWithMeasurements(sensors: Sensor[]): Promise<any> {
    return Promise.all(
      sensors.map(async (sensor: Sensor) => {
        const sensorData = await SensorApi.getSensorData(sensor.id)
        sensor.measurements = sensorData.values
        return sensor
      })
    );
  }

  const fetchMeasurements = useCallback(() => {
    (async (): Promise<void> => {
      if (sensors?.length) {
        setIsFetchInProgress(true)
        try {
          await updateSensorsWithMeasurements(sensors)
        } catch (err) {
          console.log(err)
        } finally {
          setIsFetchInProgress(false)
        }
      }
    })();
  }, [sensors])

  useEffect(() => {
    fetchSensors()
  }, [fetchSensors])

  useEffect(() => {
    fetchMeasurements()
  }, [fetchMeasurements])

  return {
    selectedSensor,
    sensors
  }
}