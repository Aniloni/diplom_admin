import arrowRight from '../../img/arrowRight.svg'
import arrowLeft from '../../img/arrowLeft.svg'
import React, { useState} from 'react';
import './Calendar.scss'

// Месяца для отображения
const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const Calendar = function () {
  // Состояния для выбранного месяца и года
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  // Получаем данные месяца
  const getMonthData = (year, month) => {
    // Первый день месяца
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayWeekday = firstDayOfMonth.getDay(); // День недели первого числа месяца

    // Если первый день месяца воскресенье, то считаем его как 7 (для удобства)
    const weekdayOffset = firstDayWeekday === 0 ? 7 : firstDayWeekday;

    // Количество дней в текущем месяце
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Количество дней в предыдущем месяце
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Массив для дней месяца, с учетом дней из предыдущего и следующего месяца
    const days = [];

    // Добавляем последние дни предыдущего месяца (чтобы заполнить первую неделю)
    const prevMonthDaysCount = weekdayOffset - 1;
    for (let i = prevMonthDaysCount; i > 0; i--) {
      days.push({ day: daysInPrevMonth - i + 1, isPrevMonth: true });
    }

    // Добавляем дни текущего месяца
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isPrevMonth: false, isNextMonth: false });
    }

    // Добавляем первые дни следующего месяца (чтобы заполнить последний ряд)
    const totalCells = days.length;
    const remainingCells = 42 - totalCells;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({ day: i, isNextMonth: true });
    }

    return { days, daysInMonth, weekdayOffset };
  };

  const { days, daysInMonth } = getMonthData(selectedYear, selectedMonth);

  // Определяем текущий день
  const today = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Обработчик для изменения месяца
  const changeMonth = (direction) => {
    setSelectedMonth((prevMonth) => {
      const newMonth = prevMonth + direction;
      if (newMonth < 0) {
        setSelectedYear(selectedYear - 1);
        return 11; // Декабрь
      } else if (newMonth > 11) {
        setSelectedYear(selectedYear + 1);
        return 0; // Январь
      }
      return newMonth;
    });
  };

  // Обработчик для изменения выбранного месяца
  const handleMonthChange = (event) => {
    setSelectedMonth(Number(event.target.value));
  };

  // Обработчик для изменения выбранного года
  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  // Функция для отображения месяца и года
  const getMonthYearLabel = () => {
    const month = MONTHS[selectedMonth];
    const year = selectedYear;
    return `${month} ${year}`;
  };

  // Генерация списка годов для выбора
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 50; i <= currentYear + 50; i++) {
      years.push(i);
    }
    return years;
  };

 
    return (
      <div className="calendar">
      <div className="headerCalendar">
        {/* Выпадающий список для месяца */}
        <select className='selectCalendar' value={selectedMonth} onChange={handleMonthChange}>
          {MONTHS.map((month, index) => (
            <option  key={index} value={index}>
              {month}
            </option>
          ))}
        </select>

        {/* Выпадающий список для года */}
        <select className='selectCalendar' value={selectedYear} onChange={handleYearChange}>
          {generateYearOptions().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

{/* Кнопки для изменения месяца */}
        <div className="calendarBtnContainer">
          <button className="calendarBtn" onClick={() => changeMonth(-1)}>
          <img src={arrowLeft}/>
          </button>
          <button className="calendarBtn" onClick={() => changeMonth(1)}>
          <img src={arrowRight}/>
          </button>
        </div>
      </div>

      {/* Таблица с календарем */}
      <table className="calendarContent">
        <thead>
          <tr className="trWeekDays">
            {WEEKDAYS.map((day, index) => (
              <th className="weekDays" key={index}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {days.slice(rowIndex * 7, (rowIndex + 1) * 7).map((dayObj, colIndex) => {
                const { day, isPrevMonth, isNextMonth } = dayObj;

                // Определяем, является ли день текущим
                const isCurrentDay =
                day === today && selectedMonth === currentMonth && selectedYear === currentYear;
              
              const isPrevOrNextMonth = isPrevMonth || isNextMonth; // Проверка на присутствие классов prev-month или next-month
              
              // добавление классов
              const classes = [
                'day',
                isPrevMonth ? 'prev-month' : '',
                isNextMonth ? 'next-month' : '',
                !isPrevOrNextMonth && isCurrentDay ? 'current-day' : ''  // Добавляем current-day только если не prev/next month
              ].join(' ').trim();
              
              return (
                <td key={colIndex} className={classes}>
                  <span>{day}</span>
                </td>
              );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
    
}

export default Calendar;



