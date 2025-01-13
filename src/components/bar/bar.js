import React from 'react';
import './bar.scss';

// const data = [
//   {
//     month: 'Янв.',
//     bars: [
//       { height: '60px', color: 'var(--brownOpacity80)' },
//       { height: '70px', color: 'var(--beigeOpacity80)' },
//       { height: '50px', color: 'var(--redOpacity80)' }
//     ]
//   },
//   {
//     month: 'Фев.',
//     bars: [
//       { height: '50px', color: 'var(--brownOpacity80)' },
//       { height: '80px', color: 'var(--beigeOpacity80)' },
//       { height: '60px', color: 'var(--redOpacity80)' }
//     ]
//   },
//   {
//     month: 'Мар.',
//     bars: [
//       { height: '60px', color: 'var(--brownOpacity80)' },
//       { height: '70px', color: 'var(--beigeOpacity80)' },
//       { height: '50px', color: 'var(--redOpacity80)' }
//     ]
//   },
//   {
//     month: 'Апр.',
//     bars: [
//       { height: '50px', color: 'var(--brownOpacity80)' },
//       { height: '80px', color: 'var(--beigeOpacity80)' },
//       { height: '60px', color: 'var(--redOpacity80)' }
//     ]
//   },
//   {
//     month: 'Май',
//     bars: [
//       { height: '60px', color: 'var(--brownOpacity80)' },
//       { height: '70px', color: 'var(--beigeOpacity80)' },
//       { height: '50px', color: 'var(--redOpacity80)' }
//     ]
//   },
//   {
//     month: 'Июн.',
//     bars: [
//       { height: '50px', color: 'var(--brownOpacity80)' },
//       { height: '80px', color: 'var(--beigeOpacity80)' },
//       { height: '60px', color: 'var(--redOpacity80)' }
//     ]
//   },
//   {
//     month: 'Июл.',
//     bars: [
//       { height: '60px', color: 'var(--brownOpacity80)' },
//       { height: '70px', color: 'var(--beigeOpacity80)' },
//       { height: '50px', color: 'var(--redOpacity80)' }
//     ]
//   },
//   {
//     month: 'Авг.',
//     bars: [
//       { height: '50px', color: 'var(--brownOpacity80)' },
//       { height: '80px', color: 'var(--beigeOpacity80)' },
//       { height: '60px', color: 'var(--redOpacity80)' }
//     ]
//   },
//   {
//     month: 'Сен.',
//     bars: [
//       { height: '60px', color: 'var(--brownOpacity80)' },
//       { height: '70px', color: 'var(--beigeOpacity80)' },
//       { height: '50px', color: 'var(--redOpacity80)' }
//     ]
//   },
//   {
//     month: 'Окт.',
//     bars: [
//       { height: '50px', color: 'var(--brownOpacity80)' },
//       { height: '80px', color: 'var(--beigeOpacity80)' },
//       { height: '60px', color: 'var(--redOpacity80)' }
//     ]
//   },
//   {
//     month: 'Ноя.',
//     bars: [
//       { height: '60px', color: 'var(--brownOpacity80)' },
//       { height: '70px', color: 'var(--beigeOpacity80)' },
//       { height: '50px', color: 'var(--redOpacity80)' }
//     ]
//   },
//   {
//     month: 'Дек.',
//     bars: [
//       { height: '50px', color: 'var(--brownOpacity80)' },
//       { height: '80px', color: 'var(--beigeOpacity80)' },
//       { height: '60px', color: 'var(--redOpacity80)' }
//     ]
//   },
// ];

const Bar = (props) => {
  return (
    <div className="bar-chart-container">
      {props.data.map((monthData, monthIndex) => (
            <div className="month-container" key={monthIndex}>
                <div className="bars">
                    {monthData.bars.map((bar, barIndex) => (
                        <div className='bar-wrapper'>
                            <div className="bar-item"
                                key={barIndex}
                                style={{ height: bar.height, backgroundColor: bar.color }}
                            ></div>
                        </div>
                    ))}
                </div>
                <div className="month-label">{monthData.month}</div>
            </div>
      ))}
    </div>
  );
};

export default Bar;
