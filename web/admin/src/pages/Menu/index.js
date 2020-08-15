import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { motion, useCycle } from 'framer-motion';

import DefaultLayout from '../_layouts/default';
import { PanelLeft, PanelRight, Header } from '../_layouts/default/styles';
import Title from '../../components/Title';
import MenuItem from '../../components/List/MenuItem';
import Button from '../../components/Button';
import MenuOverview from './MenuOverview';
import NewMenuItemModal from './NewMenuItem';
import { listGroup } from '../../components/List/animations';

const Menu = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <>
      <NewMenuItemModal isOpen={isOpen} toggleOpen={toggleOpen} />
      <DefaultLayout>
        <PanelLeft>
          <Header>
            <h1>TruckName menu items</h1>
            <Button
              type="button"
              icon={FiPlus}
              action
              onClick={() => toggleOpen()}
            />
          </Header>
          <Title title="Food Category" />

          <motion.ul variants={listGroup} initial="hidden" animate="visible">
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
          </motion.ul>
        </PanelLeft>
        <PanelRight>
          <MenuOverview />
        </PanelRight>
      </DefaultLayout>
    </>
  );
};

export default Menu;
