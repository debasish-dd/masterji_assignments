import React, { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart';


export default function LineChartComponent({ historicalCoinData }) {
  const [dates, setDates] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    if (historicalCoinData?.prices) {
      const d = [];
      const p = [];

      historicalCoinData.prices.forEach(([timestamp, price]) => {
        d.push(timestamp);
        p.push(price);
      });
      setDates(d);
      setPrices(p);
    }
  }, [historicalCoinData]);

  // render safely only when we have data
  if (dates.length === 0 || prices.length === 0) {
    return <p>Loading chart...</p>;
  }

  return (

    <LineChart 
      xAxis={[
        {
          data: dates,
          valueFormatter: (value) =>
            new Date(value).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            }),
        },
      ]}
      series={[{
        data: prices,
        label: 'Price',
        showMark: false,
        color: '#e5ff00',
        curve: 'natural',
      }]}
      width={800}
      height={400}
    />
  )
}
