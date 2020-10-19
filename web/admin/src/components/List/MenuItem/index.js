import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FiEdit2, FiTrash } from 'react-icons/fi';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ThemeContext } from 'styled-components';

import { Container, Thumb, Actions, Categories } from './styles';
import Button from '../../Button';
import { listItems } from '../animations';

const MenuItem = ({
  thumb,
  title,
  description,
  price,
  isActive,
  isLoading,
  categories,
  onUpdate,
  onDelete
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Container isActive={isActive} isLoading={isLoading} variants={listItems}>
      <div className='flex w-full items-center'>
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
        <div className="mr-auto ml-8 flex-1 pr-4">
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
              <div className='c-menu__description flex-1'>
                <p>{description}</p>
              </div>
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
            <Button icon={FiEdit2} onClick={onUpdate} />
            <Button icon={FiTrash} onClick={onDelete} />
          </Actions>
        )}
      </div>

      <Categories>{categories && categories.map(category => <span key={category}>{category}</span>)}</Categories>

    </Container>
  );
};

MenuItem.propTypes = {
  thumb: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isLoading: PropTypes.bool,
  category: PropTypes.array,
};

export default MenuItem;
