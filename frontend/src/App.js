import React from 'react';
// import ChartComponent from './ChartComponent';
import LayoutPattern1 from './components/Pattern1/LayoutPattern1';
//import Header from './components/Header';
import LayoutPattern from './components/LayoutPattern';
function App() {
  return (
    <div>
      
      <h1>Ứng dụng Hiển thị Biểu đồ</h1>
      <div>
      <LayoutPattern1 />
      <LayoutPattern/>
      </div>
     
    </div>
  );
}

export default App;
