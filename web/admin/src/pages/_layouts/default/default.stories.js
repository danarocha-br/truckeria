import React from 'react';
import StoryRouter from 'storybook-react-router';

import DefaultLayout from './index';
import {
  PanelLeft,
  PanelRight,
  Header,
} from '../../../pages/_layouts/default/styles';
import Menu from '../../../components/Menu';

export default {
  title: 'Pages/Layouts',
  component: DefaultLayout,
  decorators: [StoryRouter()],
};

export const Default = () => (
  <DefaultLayout>
    <Menu></Menu>
    <PanelLeft>
      <Header>
        <h1>Panel Left goes here</h1>
        {/* <Button
          type="button"
          icon={FiPlus}
          action
          onClick={handleOpenModal}
        /> */}
      </Header>
    </PanelLeft>

    <PanelRight>
      <h3 style={{ padding: '24px 30px' }}>Right Panel goes here.</h3>
    </PanelRight>
  </DefaultLayout>
);
