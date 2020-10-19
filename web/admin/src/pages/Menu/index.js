import React, { useEffect, useCallback, useMemo } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import _ from 'lodash';

import DefaultLayout from '../_layouts/default';
import { PanelLeft, PanelRight, Header } from '../_layouts/default/styles';
import Title from '~/components/Title';
import MenuItem from '~/components/List/MenuItem';
import Button from '~/components/Button';
import SkeletonGroup from '~/components/SkeletonGroup';
import MenuOverview from './MenuOverview';
import { listGroup } from '~/components/List/animations';
import { loadMenusRequest, deleteMenuRequest } from '~/store/modules/menus/actions';
import { showModal } from '~/store/modules/modals/actions';

const Menu = () => {
  const dispatch = useDispatch()

  const menus = useSelector((state) => state.menus.list);
  const isLoading = useSelector((state) => state.menus.loading);
  let { truck_id } = useParams();

  //group items by type
  const groupBy = useCallback((array, key) => {
      return array.reduce((result, currentValue) => {
        (result[currentValue.type] = result[currentValue.type] || []).push(
          currentValue
        );
        return result;
      }, []);
  }, []);

  useEffect(() => {
    dispatch(loadMenusRequest(truck_id));

  }, [dispatch, truck_id])

  const menusGrouped = menus && groupBy(menus, 'type');

  // const test = menus && Array.from(menusGrouped, ([key, value]) => value * value)
  // console.log(menus && Array.from(menusGrouped))

  // menu overview data
  const totalMenuItems = useMemo(() => {
    return menus && menus.length;
  }, [menus])

  const totalCategories = useMemo(() => {
    return menus && Array(menus.types);
  }, [menus])

  console.log(totalCategories)


 //handle update schedule
 const handleUpdateMenu = useCallback((menu) => {
  dispatch(showModal('UpdateMenu', { menu }))
}, [dispatch]);

// handle delete schedule item
const handleDeleteMenu = useCallback((menu_id) => {
  dispatch(deleteMenuRequest(menu_id));
}, [dispatch])


  return (
    <>
      <DefaultLayout>
        <PanelLeft>
          <Header>
            <h1>TruckName menu items</h1>
            <Button
              type="button"
              icon={FiPlus}
              action
              onClick={() => dispatch(showModal('NewMenu', { truck_id }))}
            />
          </Header>

            {menus &&
              menus.map((menu) => (
                <div key={menu.id}>
                <Title title={menu.type} />
                <motion.ul variants={listGroup} initial="hidden" animate="visible" >
                  {isLoading && <SkeletonGroup />}
                    <MenuItem
                      title={menu.title}
                      description={menu.description}
                      price={menu.price}
                      isLoading={isLoading}
                      categories={menu.options}
                      thumb={menu.photo_url}
                      onUpdate={() => handleUpdateMenu(menu)}
                      onDelete={() => handleDeleteMenu(menu.id)}
                    />
                </motion.ul>
                </div>
            ))}
        </PanelLeft>
        <PanelRight>
          <MenuOverview isLoading={isLoading} totalCount={totalMenuItems} totalCategories={totalCategories}/>
        </PanelRight>
      </DefaultLayout>
    </>
  );
};

export default Menu;
