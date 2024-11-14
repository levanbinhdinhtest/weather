import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const TemperatureTime = () => {
  const [timeData, setTimeData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);

  useEffect(() => {
      // Fetch weather data from the API
      axios.get('http://localhost:5000/api/weather')
          .then((response) => {
              const times = response.data.map(item => new Date(item.time).toISOString());
              const temperatures = response.data.map(item => item.temperature);

              setTimeData(times);
              setTemperatureData(temperatures);
          })
          .catch((error) => {
              console.error('Error fetching data:', error);
          });
  }, []);

  return (
      <div>
          
          <h2>Temperature Over Time</h2>
          <Plot
              data={[
                  {
                      x: timeData,
                      y: temperatureData,
                      type: 'scatter',
                      mode: 'lines+markers',
                      line: { color: '#ff5733', width: 2, shape: 'spline' },
                      marker: { color: 'red', size: 4,symbol: 'circle'  },
                  },
              ]}
              layout={{
                  title: { text: 'Temperature vs Time', font: { size: 24 } },
                  xaxis: {
                      title: { text: 'Time', font: { size: 18 } },
                      type: 'date',  // Set x-axis to date type for time scale
                      tickformat: '%b %Y', // Format ticks to show month and year
                      tickangle: -45,
                  },
                  yaxis: {
                      title: { text: 'Temperature (°C)', font: { size: 18 } },
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

export default TemperatureTime;
