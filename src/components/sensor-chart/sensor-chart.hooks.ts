import {useEffect, useState} from "react";
import Sensor from "../../models/sensor.model";
import Measurement from "../../models/measurement.model";

export interface SensorChartHooks {
  categories: string[] | null,
  data: number[] | null
}

export const useSensorChart = (
  sensor: Sensor | null
): SensorChartHooks => {
  const [categories, setCategories] = useState<string[]>([])
  const [data, setData] = useState<number[]>([])

  useEffect(() => {
    if (sensor?.measurements) {
      const measurements = sensor.measurements
      let categoriesArr: string[] = []
      let dataArr: number[] = []
      const last24 = measurements?.filter(({value}: Measurement) => value != null).slice(0, 24)
      last24?.map((measurement) => {
        categoriesArr.push(measurement.date.replace(/\s/, "T"))
        dataArr.push(measurement.value)
      })
      setCategories(categoriesArr)
      setData(dataArr)
    }
  }, [sensor])

  return {
    categories,
    data
  }
}