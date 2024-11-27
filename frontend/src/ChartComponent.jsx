import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Temperatureovertime from './components/Temperatureovertime';
import DaylightDurationOverTime from './components/DaylightDurationOverTime';
import Residual from './components/residual';
import Seasonal from './components/Seasonal';
import Trend from './components/trend';
import DuDoan from './components/Dudoan';
import LayoutPattern1 from './components/LayoutPattern1'; 

import './ChartComponent.css';
import ChartComponentMonthly from './components/Monthly/ChartComponentMonthly';
import ChartComponentWeekly from './components/Weekly/ChartComponentWeekly';
import CorrelationMatrix from './components/correlation';

const ChartComponent = () => {
  // State để lưu pattern hiện tại
  const [activePattern, setActivePattern] = useState('');

  const handleButtonClick = (pattern) => {
    setActivePattern(pattern); // Cập nhật active pattern khi click
  };

  return (
    <div className="chart-container">
      <header className="header">
        <img src="an.jpg" alt="Banner" />
        <h1>Nhóm xinh gái</h1>
        <h1>Thời tiết Đà Nẵng</h1>
        {/* Thanh điều hướng */}
        <nav className="navbar">
          <ul>
            <li><button onClick={() => handleButtonClick('pat1')}>Pattern 1</button></li>
            <li><button onClick={() => handleButtonClick('pat2')}>Pattern 2:Trend</button></li>
            <li><button onClick={() => handleButtonClick('trend')}>Pattern 3: Seasonal</button></li>
            <li><button onClick={() => handleButtonClick('seasonal')}>Pattern 4: Ma trận</button></li>
            <li><button onClick={() => handleButtonClick('dudoan')}>Pattern 5: Dự đoán nhiệt độ ngày mai</button></li>
          </ul>
        </nav>
      </header>

      {/* Chỉ hiển thị phần tử khi activePattern trùng với id */}
      <section className={`chart-section ${activePattern === 'pat1' ? 'active' : ''}`} id="pat1">
        {activePattern === 'pat1' && (
          <>
            <h2>Pattern 1: Daylight Duration Over Time</h2>
            <LayoutPattern1 />
          </>
        )}
      </section>

      <section className={`chart-section ${activePattern === 'pat2' ? 'active' : ''}`} id="pat2">
        {activePattern === 'pat2' && (
          <>
            <h2>Pattern 2: Trend</h2>
            <Trend/>
          </>
        )}
      </section>

      <section className={`chart-section ${activePattern === 'trend' ? 'active' : ''}`} id="trend">
        {activePattern === 'trend' && (
          <>
            <h2>Pattern 3: Seasonal</h2>
            <Seasonal />
          </>
        )}
      </section>

      <section className={`chart-section ${activePattern === 'seasonal' ? 'active' : ''}`} id="seasonal">
        {activePattern === 'seasonal' && (
          <>
            <h2>Pattern 4: Ma trận Correlation</h2>
            <CorrelationMatrix />
          </>
        )}
      </section>

      <section className={`chart-section ${activePattern === 'dudoan' ? 'active' : ''}`} id="dudoan">
        {activePattern === 'dudoan' && (
          <>
            <h2>Pattern 5: Dự đoán nhiệt độ ngày mai</h2>
            <DuDoan />
          </>
        )}
      </section>

      <footer className="footer">
        <p>&copy; Nhóm xinh gái</p>
      </footer>
    </div>
  );
};

export default ChartComponent;
