import React from 'react';
import { FiPlus } from 'react-icons/fi';

import DefaultLayout from '../_layouts/default';
import { PanelLeft, PanelRight, Header } from '../_layouts/default/styles';

const Dashboard = () => {
  return (
    <DefaultLayout>
      <PanelLeft>
        <Header>
          <h1>Dashboard</h1>
        </Header>
      </PanelLeft>
      <PanelRight></PanelRight>
    </DefaultLayout>
  );
};

export default Dashboard;
