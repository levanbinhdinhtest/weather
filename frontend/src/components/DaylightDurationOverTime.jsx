import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const DaylightDurationOverTime = () => {
  const [timeData, setTimeData] = useState([]);
  const [DaylightDurationData, setDaylightDurationData] = useState([]);

  useEffect(() => {
      // Fetch weather data from the API
      axios.get('http://localhost:5000/api/weather')
          .then((response) => {
              const times = response.data.map(item => new Date(item.time).toISOString());
              const daylight_duration = response.data.map(item => item.daylight_duration);

              setTimeData(times);
              setDaylightDurationData(daylight_duration);
          })
          .catch((error) => {
              console.error('Error fetching data:', error);
          });
  }, []);

  return (
      <div>
          {/* <h1>Pattern 1 : Dữ liệu theo thời gian thực</h1> */}
          <h2>Daylight Duration Over Time</h2>
          <Plot
              data={[
                  {
                      x: timeData,
                      y: DaylightDurationData,
                      type: 'scatter',
                      mode: 'lines+markers',
                      line: { color: '#ff5733', width: 2, shape: 'spline' },
                      marker: { color: 'red', size: 4,symbol: 'circle'  },
                  },
              ]}
              layout={{
                  title: { text: 'Daylight Duration vs Time', font: { size: 24 } },
                  xaxis: {
                      title: { text: 'Time', font: { size: 18 } },
                      type: 'date',  // Set x-axis to date type for time scale
                      tickformat: '%b %Y', // Format ticks to show month and year
                      tickangle: -45,
                  },
                  yaxis: {
                      title: { text: 'Daylight Duration (s)', font: { size: 18 } },
                      rangemode: 'tozero',
                  },
                  margin: { t: 50, l: 50, r: 50, b: 100 },
                  plot_bgcolor: '#f0f2f5',
                  paper_bgcolor: '#ffffff',
              }}
              style={{ width: "100%", height: "500px" }}
          />
      </div>
  );
};

export default DaylightDurationOverTime;
