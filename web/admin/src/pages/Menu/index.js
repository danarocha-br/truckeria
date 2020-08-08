import React from 'react';
import { FiPlus } from 'react-icons/fi';

import DefaultLayout from '../_layouts/default';
import { PanelLeft, PanelRight, Header } from '../_layouts/default/styles';
import Title from '../../components/Title';
import MenuItem from '../../components/List/MenuItem';
import Button from '../../components/Button';
import MenuOverview from './MenuOverview';

const Menu = () => {
  return (
    <>
      <DefaultLayout>
        <PanelLeft>
          <Header>
            <h1>menu</h1>
            <Button
              type="button"
              icon={FiPlus}
              action
              onClick={() => 'clicked'}
            />
          </Header>
          <Title title="Food Category" />

          <ul>
            <MenuItem
              title="Salad Bowl"
              description="Asian salad with cryspy chicken, lettuce. etc."
              price="8.90"
            />
            <MenuItem
              title="Salad Bowl"
              description="Asian salad with cryspy chicken, lettuce. etc."
              price="8.90"
            />
            <MenuItem
              isActive
              title="Salad Bowl"
              description="Asian salad with cryspy chicken, lettuce. etc."
              price="8.90"
            />
            <MenuItem
              title="Salad Bowl"
              description="Asian salad with cryspy chicken, lettuce. etc."
              price="8.90"
            />
            <MenuItem
              title="Salad Bowl"
              description="Asian salad with cryspy chicken, lettuce. etc."
              price="8.90"
            />
          </ul>
        </PanelLeft>
        <PanelRight>
          <MenuOverview />
        </PanelRight>
      </DefaultLayout>
    </>
  );
};

export default Menu;
