import React, { useContext } from 'react';
import Proptypes from 'prop-types';
import { FiCalendar, FiTrash, FiEdit2, FiChevronRight } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';
import { useMediaQuery } from 'react-responsive';

import { Container, Wrapper, Date, Info, Actions } from './styles';
import Button from '../../Button';
import { PropTypes } from 'prop-types';

const ScheduleItem = ({ date, address, isActive }) => {
  const theme = useContext(ThemeContext);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return (
    <Container isActive={isActive}>
      <FiCalendar size="20" color={theme.colors.primary} />
      <Wrapper isActive={isActive}>
        <Date>
          {isTabletOrMobile && (
            <FiCalendar size="20" color={theme.colors.primary} />
          )}
          <p>15</p>
          <p>WED</p>

          {isTabletOrMobile && <small>in 3 days</small>}
        </Date>

        <Info>
          <address>{address}</address>
          <span>
            <small>{date}</small>
            <small>in 3 days</small>
          </span>

          {isTabletOrMobile && (
            <FiChevronRight size="20" color={theme.colors.text} />
          )}
        </Info>

        <Actions>
          <Button icon={FiEdit2} />
          <Button icon={FiTrash} />
        </Actions>
      </Wrapper>
    </Container>
  );
};

ScheduleItem.propTypes = {
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  isActive: Proptypes.bool,
};

export default ScheduleItem;
