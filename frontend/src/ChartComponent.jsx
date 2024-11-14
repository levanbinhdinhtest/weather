import React, { useState, useEffect } from 'react';

import Temperatureovertime from './components/Temperatureovertime';
import DaylightDurationOverTime from './components/DaylightDurationOverTime';

const ChartComponent = () => {

  return (
      <div>
          <h1>Pattern 1 : Dữ liệu theo thời gian thực</h1>
          <Temperatureovertime/>
          <DaylightDurationOverTime/>
      </div>
  );
};

export default ChartComponent;
