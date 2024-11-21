import React, { useState, useEffect } from 'react';

import Temperatureovertime from './components/Temperatureovertime';
import DaylightDurationOverTime from './components/DaylightDurationOverTime';
import Residual from './components/residual';
import Seasonal from './components/Seasonal';
import Trend from './components/trend';

const ChartComponent = () => {

  return (
      <div>
          <h1>Pattern 3 : Trend</h1>
          <Trend/>
          <h1>Pattern 4 : Seasional</h1>
          <Seasonal/>
          <h1>Pattern 5 : residual</h1>
          <Residual/>
      </div>
  );
};

export default ChartComponent;
