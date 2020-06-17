import React, { useContext } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import { Container, Wrapper, Date, Info } from './styles';

export interface ScheduleItemProps {
  date: string;
  address: string;
  isActive?: boolean;
}

const ScheduleItem: React.SFC<ScheduleItemProps> = ({
  date,
  address,
  isActive,
}) => {
  const theme = useContext(ThemeContext);
  return (
    <Container isActive={isActive}>
      <FiCalendar size="20" color={theme.colors.primary} />
      <Wrapper>
        <Date>
          <p>15</p>
          <p>WED</p>
        </Date>

        <Info>
          <address>{address}</address>
          <span>
            <small>{date}</small>
            <small>in 3 days</small>
          </span>
        </Info>
      </Wrapper>
    </Container>
  );
};

export default ScheduleItem;
