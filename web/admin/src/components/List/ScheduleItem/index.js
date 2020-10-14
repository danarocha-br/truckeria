import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FiCalendar, FiTrash, FiEdit2, FiChevronRight } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { Container, Wrapper, Date, Info, Actions } from './styles';
import Button from '../../Button';
import { listItems } from '../animations';

const ScheduleItem = ({ date, day, address, startsIn, isActive, isLoading, onUpdate, onDelete }) => {
  const theme = useContext(ThemeContext);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return (
    <Container isActive={isActive} isLoading={isLoading} variants={listItems} onClick={onUpdate}>
      <FiCalendar size="20" color={theme.colors.primary} />
      <Wrapper isActive={isActive}>
        <Date>
          {isTabletOrMobile && (
            <FiCalendar size="20" color={theme.colors.primary} />
          )}
          {isLoading ? (
            <SkeletonTheme
              color={theme.colors.shade}
              highlightColor={theme.colors.tabbar}
            >
              <Skeleton width={50} />
            </SkeletonTheme>
          ) : (
            <>
              {day}
            </>
          )}

          {isTabletOrMobile && !isLoading && <small>{startsIn}</small>}
        </Date>

        {isLoading ? (
          <SkeletonTheme
            color={theme.colors.shade}
            highlightColor={theme.colors.tabbar}
          >
            <Skeleton className="ml-3" width={250} />
          </SkeletonTheme>
        ) : (
          <Info>
            <address>{address}</address>
            <span>
              <small>{date}</small>
              <small>{startsIn}</small>
            </span>

            {isTabletOrMobile && (
              <FiChevronRight size="20" color={theme.colors.text} />
            )}
          </Info>
        )}
        {!isLoading && (
          <Actions>
            <Button icon={FiEdit2} onClick={onUpdate} />
            <Button icon={FiTrash} onClick={onDelete} />
          </Actions>
        )}
      </Wrapper>
    </Container>
  );
};

ScheduleItem.propTypes = {
  date: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  startsIn: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isLoading: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ScheduleItem;
