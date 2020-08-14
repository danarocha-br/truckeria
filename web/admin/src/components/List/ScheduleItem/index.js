import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FiCalendar, FiTrash, FiEdit2, FiChevronRight } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { Container, Wrapper, Date, Info, Actions } from './styles';
import Button from '../../Button';
import { listItems } from '../animations';

const ScheduleItem = ({ date, address, isActive, key, isLoading }) => {
  const theme = useContext(ThemeContext);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return (
    <Container
      key={key}
      isActive={isActive}
      isLoading={isLoading}
      variants={listItems}
    >
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
              <p>15</p>
              <p>WED</p>
            </>
          )}

          {isTabletOrMobile && !isLoading && <small>in 3 days</small>}
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
              <small>in 3 days</small>
            </span>

            {isTabletOrMobile && (
              <FiChevronRight size="20" color={theme.colors.text} />
            )}
          </Info>
        )}
        {!isLoading && (
          <Actions>
            <Button icon={FiEdit2} />
            <Button icon={FiTrash} />
          </Actions>
        )}
      </Wrapper>
    </Container>
  );
};

ScheduleItem.propTypes = {
  key: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default ScheduleItem;
