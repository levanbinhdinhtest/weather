import React from 'react';

import ChartComponent from './Daily/ChartComponentDaily';
import ChartComponentMonthly from './Monthly/ChartComponentMonthly';
import ChartComponentWeekly from './Weekly/ChartComponentWeekly';
const layout = () => {

  return (
      <div>
          <h1>Ngay</h1>
            <ChartComponent/>
          <h1>thang</h1>
          <ChartComponentMonthly/>
          <h1>Tuan</h1>
          <ChartComponentWeekly/>
      </div>
  );
};

export default layout;