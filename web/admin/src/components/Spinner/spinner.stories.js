import React from 'react';
import styles from '@sambego/storybook-styles';

import Spinner from './index';
import colors from '../../styles/tokens/colors';

export default {
  title: 'Spinner',
  component: Spinner,
  decorators: [
    styles({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px',
      backgroundColor: colors.gray900,
    }),
  ],
};

export const Default = (args) => (
  <>
    <h4 style={{ marginBottom: '10px', color: 'white' }}>Default Size</h4>
    <Spinner {...args} />
  </>
);

Default.args = {
  small: false,
};

export const Small = (args) => (
  <>
    <h4 style={{ marginTop: '30px', marginBottom: '10px', color: 'white' }}>
      Small Size
    </h4>
    <Spinner {...args} />
  </>
);

Small.args = {
  small: true,
};
