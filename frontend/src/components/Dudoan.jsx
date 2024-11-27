import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios để sử dụng
import Plot from 'react-plotly.js';  // Import thư viện Plotly để vẽ biểu đồ

import './Dudoan.css';  // Import CSS để trang trí giao diện

const DuDoan = () => {
  const [predictedTemperature, setPredictedTemperature] = useState(null);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [dateData, setDateData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [colorData, setColorData] = useState([]);  // Thêm để lưu màu sắc theo adjusted_label

  useEffect(() => {
    // Lấy dữ liệu từ API pattern4 để vẽ biểu đồ seasonal
    axios.get('http://127.0.0.1:5000/api/weather/pattern6')  // API lấy dữ liệu seasonal
      .then((response) => {
        const dates = response.data.map(item => new Date(item.date).toISOString());
        const temperatures = response.data.map(item => item.temperature_2m);
        const colors = response.data.map(item => item.adjusted_label === 0 ? 'blue' : 'red');  // 0 là xanh, 1 là đỏ

        setDateData(dates);
        setTemperatureData(temperatures);
        setColorData(colors);  // Cập nhật dữ liệu màu sắc
      })
      .catch((error) => {
        console.error('Error fetching data for chart:', error);
      });

    // Dự đoán nhiệt độ từ API pattern7
    axios.get('http://127.0.0.1:5000/api/weather/pattern7')  // API dự đoán nhiệt độ
      .then((response) => {
        const temp = response.data[0].predicted_Temperature;
        setPredictedTemperature(temp);

        // Xác định thông điệp và hình ảnh dựa trên nhiệt độ
        if (temp < 20) {
          setMessage('Trời lạnh, độ ẩm không khí thấp');
          setImage('/anh1.jpeg'); // Đường dẫn tới ảnh lạnh
        } else if (temp >= 20 && temp <= 30) {
          setMessage('Thời tiết dễ chịu, không khí thoải mái');
          setImage('/anh2.jpeg'); // Đường dẫn tới ảnh dễ chịu
        } else {
          setMessage('Trời nóng, độ ẩm cao');
          setImage('/anh3.jpeg'); // Đường dẫn tới ảnh nóng
        }
      })
      .catch((error) => {
        console.error('Error fetching predicted temperature:', error);
      });
  }, []);

  return (
    <div className="duDoan-container">
      {/* Biểu đồ nhiệt độ theo adjusted_label */}
      <div className="chart-container">
        <h3>Biểu đồ nhiệt độ qua các ngày</h3>
        <Plot
          data={[
            {
              x: dateData,
              y: temperatureData,
              type: 'scatter',
              mode: 'markers', // Hiển thị điểm dữ liệu
              marker: {
                color: colorData, // Màu sắc theo adjusted_label
                size: 6,           // Kích thước dấu chấm
              },
              name: 'Temperature Data',
            },
            {
              x: [dateData[dateData.length - 1], new Date().toISOString()],
              y: [temperatureData[temperatureData.length - 1], predictedTemperature],
              type: 'scatter',
              mode: 'lines+markers',
              line: { color: 'blue', width: 4, dash: 'dot' }, // Dự đoán nhiệt độ
              name: 'Predicted Temperature',
            },
          ]}
          layout={{
            title: { text: 'Temperature Prediction for Tomorrow', font: { size: 24 } },
            xaxis: {
              title: { text: 'Date', font: { size: 18 } },
              type: 'date',
              tickformat: '%b %Y',
              tickangle: -45,
            },
            yaxis: {
              title: { text: 'Temperature (°C)', font: { size: 18 } },
              rangemode: 'tozero',
              range: [10, 45], // Giới hạn trục Y từ 15 đến 50
            },
            margin: { t: 50, l: 50, r: 50, b: 100 },
            plot_bgcolor: '#f0f2f5',
            paper_bgcolor: '#ffffff',
          }}
          style={{ width: '100%', height: '400px' }}
        />
      </div>

      {/* Dự đoán nhiệt độ và hình ảnh trong một ô */}
      <div className="prediction-box">
        <div className="temperature-info">
          <h2>Dự đoán nhiệt độ ngày mai</h2>
          {predictedTemperature && (
            <h3>Nhiệt độ: {predictedTemperature.toFixed(2)}°C</h3>
          )}
          <p>{message}</p>
        </div>
        <div className="image-container">
          <img src={image} alt="weather" className="weather-image" />
        </div>
      </div>
    </div>
  );
};

export default DuDoan;
