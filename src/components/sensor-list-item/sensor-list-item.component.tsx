import React, {useEffect, useState} from 'react';
import {ProgressRing} from "../progress-ring/progress-ring.component";
import {useMeasurements} from "../measurements/measurements.hooks";
import {useInterval} from "../helpers";
import Param from "../../models/param.model";

export interface SensorListItemProps {
  id: number;
  param?: Param
}

export const SensorListItem = (props: SensorListItemProps) => {
  const {latestMeasurement} = useMeasurements(props.id)

  const [progress, setProgress] = useState<number>(0)

  const [delay, setDelay] = useState<number>(0)
  const [counter, setCounter] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const [valueDelay, setValueDelay] = useState<number>(0)
  const [valueCounter, setValueCounter] = useState<number>(0)
  const [isValueCounterRunning, setIsValueCounterRunning] = useState<boolean>(false)

  useEffect(() => {
    if (latestMeasurement) {
      const {value} = latestMeasurement
      setProgress(value / 50 * 100)
      setDelay(900 / Math.round(value / 50 * 100))
      setValueDelay(900 / Math.round(value))
    }
  }, [latestMeasurement])

  useEffect(() => {
    if (progress && delay && !counter) {
      setIsRunning(true)
    }
    if (counter === Math.round(progress)) {
      setIsRunning(false)
    }
  }, [progress, delay, counter])

  useInterval(() => {
    setCounter(counter + 1);
  }, isRunning ? delay : null)

  useEffect(() => {
    if (latestMeasurement && valueDelay && !valueCounter) {
      setIsValueCounterRunning(true)
    }
    if (latestMeasurement && valueCounter === Math.round(latestMeasurement.value)) {
      setIsValueCounterRunning(false)
    }
  }, [latestMeasurement, valueDelay, valueCounter])

  useInterval(() => {
    setValueCounter(valueCounter + 1);
  }, isValueCounterRunning ? valueDelay : null)

  const className = `
      ${valueCounter > 25 ? 'blue-value' : 'green-value'}
      ${valueCounter > 50 ? 'light-red-value' : ''}
      ${valueCounter > 100 ? 'red-value' : ''}
    `;

  return (
    <figure>
      <ProgressRing
        radius={60}
        stroke={4}
        progress={progress}
        counter={counter}
      />
      <figcaption className="sensor">
        {props.param?.paramCode} <span className={className}>{valueCounter}</span> µg/m3
      </figcaption>
    </figure>
  )
}