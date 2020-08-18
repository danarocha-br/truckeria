import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FiEdit2, FiTrash } from 'react-icons/fi';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ThemeContext } from 'styled-components';

import { Container, Thumb, Actions } from './styles';
import Button from '../../Button';
import { listItems } from '../animations';

const MenuItem = ({
  thumb,
  title,
  description,
  price,
  isActive,
  isLoading,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Container isActive={isActive} isLoading={isLoading} variants={listItems}>
      {isLoading ? (
        <SkeletonTheme
          color={theme.colors.shade}
          highlightColor={theme.colors.tabbar}
        >
          <Skeleton circle={true} height={50} width={50} />
        </SkeletonTheme>
      ) : (
        <Thumb thumb={thumb} />
      )}
      <div className="mr-auto ml-8">
        {isLoading ? (
          <h2>
            <SkeletonTheme
              color={theme.colors.shade}
              highlightColor={theme.colors.tabbar}
            >
              <Skeleton width={100} />
            </SkeletonTheme>
          </h2>
        ) : (
          <>
            <h2>{title}</h2>
            <small>{description}</small>
          </>
        )}
      </div>
      {isLoading ? (
        <SkeletonTheme
          color={theme.colors.shade}
          highlightColor={theme.colors.tabbar}
        >
          <Skeleton width={100} />
        </SkeletonTheme>
      ) : (
        <span className="c-menu__price">{price}</span>
      )}
      {!isLoading && (
        <Actions>
          <Button icon={FiEdit2} onClick={() => 'clicked'} />
          <Button icon={FiTrash} onClick={() => 'clicked'} />
        </Actions>
      )}
    </Container>
  );
};

MenuItem.propTypes = {
  thumb: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default MenuItem;
