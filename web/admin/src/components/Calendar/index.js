import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Container } from './styles';

const Calendar = ({ onMonthChange, selectedDays, onDayClick }) => {

  return (
    <Container>
      <DayPicker
        weekdaysShort={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
        modifiers={{ daysOfWeek: [0, 1, 2, 3, 4, 5, 6, 7]  }}
        selectedDays={selectedDays}
        onDayClick={onDayClick}
        onMonthChange={onMonthChange}
      />
    </Container>
  );
};

export default Calendar;
