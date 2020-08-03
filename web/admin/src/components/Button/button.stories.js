import React from 'react';
import styles from '@sambego/storybook-styles';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { FiPlus } from 'react-icons/fi';

import Button from './index';
import colors from '../../styles/tokens/colors';

export default {
  title: 'Button',
  component: Button,
  decorators: [
    withKnobs,
    styles({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px',
      maxWidth: '300px',
      backgroundColor: colors.gray500,
    }),
  ],
};

export const Default = () => (
  <>
    <Button
      label={text('Label', 'Im a Label')}
      isLoading={boolean('isLoading', false)}
      disabled={boolean('Disabled', false)}
    />

    <Button
      isLoading={boolean('isLoading', false)}
      disabled={boolean('Disabled', false)}
      icon={FiPlus}
      action
    />
    <Button
      isLoading={boolean('isLoading', false)}
      disabled={boolean('Disabled', false)}
      icon={FiPlus}
    />
  </>
);
