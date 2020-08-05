import React from 'react';
import styles from '@sambego/storybook-styles';
import { actions } from '@storybook/addon-actions';
import { FiPlus } from 'react-icons/fi';

import Button from './index';
import doc from './Button.docs.mdx';
import colors from '../../styles/tokens/colors';

// const eventsFromObject = actions({
//   onClick: 'clicked',
//   onMouseOver: 'hovered',
// });

export default {
  title: 'Button',
  component: Button,
  parameters: {
    docs: { page: doc },
  },
  decorators: [
    styles({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.gray700,
    }),
  ],
};

export const Default = (args) => {
  return (
    <div style={{ width: 400 }}>
      <Button label="hello" {...args} />
    </div>
  );
};

Default.args = {
  label: 'hello',
  isLoading: false,
  disabled: false,
  onClick: () => 'clicked',
};

export const Action = (args) => {
  return <Button {...args} icon={FiPlus} />;
};

Action.args = {
  icon: () => FiPlus,
  action: true,
  isLoading: false,
  disabled: false,
  onClick: () => 'clicked',
};

export const IconOnly = (args) => {
  return <Button {...args} icon={FiPlus} />;
};

IconOnly.args = {
  icon: () => FiPlus,
  isLoading: false,
  disabled: false,
  onClick: () => 'clicked',
};
