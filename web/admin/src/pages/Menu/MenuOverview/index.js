import React from 'react';
import { FiPieChart } from 'react-icons/fi';

import { Container, Thumb, List } from './styles';
import Overview from '../../../components/List/Overview';

const listGroup = {
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.05 },
  },
  hidden: {
    transition: { staggerChildren: 0.8 },
  },
};

const MenuOverview = () => {
  return (
    <Container>
      <h1>Menu Overview</h1>
      <Thumb />
      <hr />
      <List variants={listGroup} initial="hidden" animate="visible">
        <Overview key="id1" icon={FiPieChart} title="25" label="Total Items" />
        <Overview key="id1" icon={FiPieChart} title="25" label="Total Items" />
        <Overview key="id1" icon={FiPieChart} title="25" label="Total Items" />
        <Overview key="id1" icon={FiPieChart} title="25" label="Total Items" />
      </List>
    </Container>
  );
};

export default MenuOverview;
