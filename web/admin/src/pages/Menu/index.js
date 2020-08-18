import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { motion, useCycle } from 'framer-motion';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { useFirestoreConnect } from 'react-redux-firebase';

import DefaultLayout from '../_layouts/default';
import { PanelLeft, PanelRight, Header } from '../_layouts/default/styles';
import Title from '../../components/Title';
import MenuItem from '../../components/List/MenuItem';
import Button from '../../components/Button';
import SkeletonGroup from '../../components/SkeletonGroup';
import MenuOverview from './MenuOverview';
import NewMenuItemModal from './NewMenuItem';
import { listGroup } from '../../components/List/animations';

const Menu = () => {
  // Modal
  const [isOpen, toggleOpen] = useCycle(false, true);

  // Firebase
  const auth = useSelector((state) => state.firebase.auth);

  useFirestoreConnect([{ collection: 'menus' }]);
  const menus = useSelector((state) => state.firestore.ordered.menus);

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
            {!isLoaded(menus) && <SkeletonGroup />}

            {menus &&
              menus.map((menu) => (
                <MenuItem
                  key={menu.id}
                  title={menu.title}
                  description={menu.description}
                  price={menu.price}
                  isLoading={!isLoaded(menus)}
                />
              ))}
          </motion.ul>
        </PanelLeft>
        <PanelRight>
          <MenuOverview isLoading={!isLoaded(auth)} />
        </PanelRight>
      </DefaultLayout>
    </>
  );
};

export default Menu;
