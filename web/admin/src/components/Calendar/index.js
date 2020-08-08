import React, { useCallback, useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Container } from './styles';

const Calendar = () => {
  const [selectDate, setSelectDate] = useState(new Date());

  const handleDateChange = useCallback((day, modifiers) => {
    setSelectDate(day);
  }, []);

  return (
    <Container>
      <DayPicker
        weekdaysShort={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
        modifiers={{ available: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6, 7] } }}
        onDayClick={handleDateChange}
        selectedDays={selectDate}
      />
    </Container>
  );
};

export default Calendar;
