import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { motion, useCycle } from 'framer-motion';

import DefaultLayout from '../_layouts/default';
import { PanelLeft, PanelRight, Header } from '../_layouts/default/styles';
import Title from '../../components/Title';
import ScheduleItem from '../../components/List/ScheduleItem';
import Calendar from '../../components/Calendar';
import Button from '../../components/Button';
import { listGroup } from '../../components/List/animations';
import NewScheduleModal from './NewSchedule';

const Schedule = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <>
      <NewScheduleModal isOpen={isOpen} toggleOpen={toggleOpen} />
      <DefaultLayout>
        <PanelLeft>
          <Header>
            <h1>truckName schedule</h1>
            <Button
              type="button"
              icon={FiPlus}
              action
              onClick={() => toggleOpen()}
            />
          </Header>
          <Title title="April, 2020" />

          <motion.ul variants={listGroup} initial="hidden" animate="visible">
            <ScheduleItem
              key="id1"
              date="9:00-18:00, Monday, June 09 2020"
              address="767 5th Ave, New York"
            />
          </motion.ul>
        </PanelLeft>
        <PanelRight>
          <Calendar />
        </PanelRight>
      </DefaultLayout>
    </>
  );
};

export default Schedule;
