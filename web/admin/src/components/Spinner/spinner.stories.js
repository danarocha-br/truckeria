import React from 'react';
import styles from '@sambego/storybook-styles';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import Spinner from './index';

export default {
  title: 'Spinner',
  component: Spinner,
  decorators: [
    withKnobs,
    styles({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px',
      maxWidth: '300px',
    }),
  ],
};

export const Default = () => (
  <>
    <h4 style={{ marginBottom: '10px' }}>Default Size</h4>
    <Spinner />

    <h4 style={{ marginTop: '30px', marginBottom: '10px' }}>Small Size</h4>
    <Spinner small />
  </>
);
