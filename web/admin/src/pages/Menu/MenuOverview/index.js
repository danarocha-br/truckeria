import React from 'react';
import { FiPieChart } from 'react-icons/fi';

import { Container, Thumb, List } from './styles';
import Overview from '../../../components/List/Overview';

const MenuOverview = () => {
  return (
    <Container>
      <h1>Menu Overview</h1>
      <Thumb />
      <hr />
      <List>
        <Overview icon={FiPieChart} title="25" label="Total Items" />
        <Overview icon={FiPieChart} title="25" label="Total Items" />
        <Overview icon={FiPieChart} title="25" label="Total Items" />
        <Overview icon={FiPieChart} title="25" label="Total Items" />
      </List>
    </Container>
  );
};

export default MenuOverview;
