import React from 'react';
import './miniBar.scss'; // Подключение стилей

const MiniBar = (props) => {
    
  return (
    <div className="chart-container">
      {props.data.map((item, index) => (
        <div className="bar-container" key={index}>
          <div className="bar">
          <div className="bar-data" style={{ height: item.height, backgroundColor: item.color }}></div>
          </div>
          <div className="circle" style={{ backgroundColor: item.color }}></div>
          <div className="label">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default MiniBar;
