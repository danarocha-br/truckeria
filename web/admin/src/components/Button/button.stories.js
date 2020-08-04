import React from 'react';
import styles from '@sambego/storybook-styles';
import { actions } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { FiPlus } from 'react-icons/fi';

import Button from './index';
import doc from './Button.docs.mdx';
import colors from '../../styles/tokens/colors';

const eventsFromObject = actions({
  onClick: 'clicked',
  onMouseOver: 'hovered',
});

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
    }),
  ],
  parameters: {
    docs: { page: doc },
  },
};

export const Default = () => (
  <>
    <Button
      label={text('Label', 'Im a Label')}
      isLoading={boolean('isLoading', false)}
      disabled={boolean('Disabled', false)}
      {...eventsFromObject}
    />

    <Button
      isLoading={boolean('isLoading', false)}
      disabled={boolean('Disabled', false)}
      icon={FiPlus}
      action
      {...eventsFromObject}
    />
    <Button
      isLoading={boolean('isLoading', false)}
      disabled={boolean('Disabled', false)}
      icon={FiPlus}
      {...eventsFromObject}
    />
  </>
);
