import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ru'; 
import localizedFormat from 'dayjs/plugin/localizedFormat'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import calendar from "../../imgMFC/calendar.svg";
import {useState} from "react";

dayjs.extend(localizedFormat);

// Стили для DatePicker (label, input и т.д.)
const StyledDatePicker = styled(DatePicker)({
  '& label': {
    fontFamily: "PT Sans",
    color: 'var(--blackContent)', 
    fontSize: '16px',
    transform: 'translate(25px, 19px) scale(1)', // Положение лейбла по умолчанию
  },
  '& label.MuiInputLabel-shrink': {
    transform: 'translate(25px, -20px) scale(0.9)', 
  },
  '& label.Mui-focused': {
    color: 'var(--blackContent)', 
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'var(--beigeOpacity10)',
    width: '320px',
    height: '66px',
    borderRadius: '10px',
    '& fieldset': {
      border: 'none', 
    },
    '&:hover fieldset': {
      border: 'none', 
    },
    '&.Mui-focused fieldset': {
      border: 'none', 
    },
  },
});

const customTheme = createTheme({
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#B8B8B8', // Цвет при наведении
            borderRadius: '0px', // Радиус при наведении
          },
          '&:not(:hover)': {
            borderRadius: '0px', // Радиус по умолчанию
          },
          '&.Mui-selected': {
            backgroundColor: 'var(--beigeOpacity20)', // Цвет выбранного дня
            color: 'var(--blackContent) !important', // Цвет текста выбранного дня
            borderRadius: '0px', // Радиус выбранного дня
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'var(--beigeOpacity40) !important', // Цвет при наведении на выбранный день
          },
          '&.MuiPickersDay-today': {
            color: 'var(--blackContent) !important', // Цвет сегодняшнего дня
            border: '0px !important', // Убрать обводку для сегодняшнего дня
            borderRadius: '0px', // Радиус круга для сегодняшнего дня
          },
       
          '&.Mui-selected:focus': {
            backgroundColor: 'var(--beigeOpacity20)', // Цвет фокусированного дня (когда день выбран)
            color: 'var(--blackContent) !important', // Цвет текста выбранного дня
          },
        },
      },
    },
    MuiPickersYear: {
      styleOverrides: {
        root: {
          textAlign: 'center',
          '&.Mui-selected': {
            backgroundColor: 'var(--beigeOpacity20)', // Цвет выбранного дня
            color: 'var(--blackContent) !important', // Цвет текста выбранного дня
            borderRadius: '0px', // Радиус выбранного дня
          },
          '&.Mui-selected:focus': {
            backgroundColor: 'var(--beigeOpacity20)', // Цвет фокусированного дня (когда день выбран)
            color: 'var(--blackContent) !important', // Цвет текста выбранного дня
          },
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize', 
        },
      },
    },
  },
});

const DatePickerMy = (props) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue)
    if (props.onDateChange) {
      props.onDateChange(newValue)
    }
  }

  dayjs.locale('ru');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <ThemeProvider theme={customTheme}>
        <DemoContainer sx={{ paddingRight: '15px', paddingTop: '30px' }} components={['DatePicker']}>
          <StyledDatePicker 
            label={props.label}
            value={selectedDate}
            onChange={handleDateChange}
            slots={{ openPickerIcon: () => <img src={calendar} alt="Calendar Icon" /> }}
          />
        </DemoContainer>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default DatePickerMy;
