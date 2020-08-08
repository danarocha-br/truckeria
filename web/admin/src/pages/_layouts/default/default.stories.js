import React from 'react';
import StoryRouter from 'storybook-react-router';
import { FiPlus } from 'react-icons/fi';
import styles from '@sambego/storybook-styles';

import DefaultLayout from './index';
import AuthLayout from '../auth';
import {
  PanelLeft,
  PanelRight,
  Header,
} from '../../../pages/_layouts/default/styles';
import Button from '../../../components/Button';
import colors from '../../../styles/tokens/colors';

export default {
  title: 'Pages/Layouts',
  component: DefaultLayout,
  decorators: [
    StoryRouter(),
    styles({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '30px',
      backgroundColor: colors.gray900,
    }),
  ],
};

export const Default = () => (
  <DefaultLayout>
    <PanelLeft>
      <Header>
        <h1>Panel Left goes here</h1>
        <Button
          type="button"
          icon={FiPlus}
          action
          // onClick={handleOpenModal}
        />
      </Header>
    </PanelLeft>

    <PanelRight>
      <h3 style={{ padding: '24px 30px' }}>Right Panel goes here.</h3>
    </PanelRight>
  </DefaultLayout>
);

export const Auth = () => (
  <AuthLayout>
    <h1 style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
      Content goes here
    </h1>
  </AuthLayout>
);
