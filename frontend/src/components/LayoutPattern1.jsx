import React from 'react';
import ChartComponent from './Daily/ChartComponentDaily';
import ChartComponentMonthly from './Monthly/ChartComponentMonthly';
import ChartComponentWeekly from './Weekly/ChartComponentWeekly';

const layout = () => {

  return (
      <div>
        <h1>Pattern 1 : TIME</h1>s
          <h1>Theo ngày</h1>
            <ChartComponent/>
          <h1>Theo tháng</h1>
          <ChartComponentMonthly/>
          <h1>Theo tuần</h1>
          <ChartComponentWeekly/>

      </div>
  );
};

export default layout;