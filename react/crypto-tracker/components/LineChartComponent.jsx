import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useMediaQuery } from '@mui/material';
import useCoins from '../context/CoinContext';

export default function LineChartComponent({ historicalCoinData }) {
  const [dates, setDates] = useState([]);
  const [prices, setPrices] = useState([]);
  const { themeMode } = useCoins();

  // ✅ detect screen size for responsiveness
  const isSmall = useMediaQuery('(max-width:600px)');
  const isMedium = useMediaQuery('(max-width:900px)');

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

  if (!dates.length || !prices.length) return <p>Loading chart...</p>;

  // ✅ dynamic chart size
  const chartWidth = isSmall ? 320 : isMedium ? 600 : 900;
  const chartHeight = isSmall ? 250 : isMedium ? 350 : 450;

  return (
    <div className="flex justify-center items-center w-full">
      <LineChart
        xAxis={[
          {
            data: dates,
            scaleType: 'time',
            valueFormatter: (value) =>
              new Date(value).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              }),
          },
        ]}
        series={[
          {
            data: prices,
            label: 'Price',
            showMark: false,
            color: '#00e5ff',
            curve: 'monotoneX',
          },
        ]}
        width={chartWidth}
        experimentalFeatures={{ preferStrictDomainInLineCharts: true }}
        height={chartHeight}
        margin={{ left: 50, right: 30, top: 40, bottom: 40 }}
        sx={{
          '.MuiChartsAxis-tickLabel': {
            fill: themeMode ? '#fff !important' : '#000 !important',
            fontSize: 13,
            fontWeight: 500,
          },
          '.MuiChartsAxis-label': {
            fill: themeMode ? '#fff !important' : '#000 !important',
          },
        }}
      />
    </div>
  );
}
