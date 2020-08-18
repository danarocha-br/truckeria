import React, { useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { motion, useCycle } from 'framer-motion';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { useFirestoreConnect } from 'react-redux-firebase';

import DefaultLayout from '../_layouts/default';
import { PanelLeft, PanelRight, Header } from '../_layouts/default/styles';
import Title from '../../components/Title';
import ScheduleItem from '../../components/List/ScheduleItem';
import Calendar from '../../components/Calendar';
import Button from '../../components/Button';
import SkeletonGroup from '../../components/SkeletonGroup';
import { listGroup } from '../../components/List/animations';
import NewScheduleModal from './NewSchedule';

const Schedule = () => {
  // Modal
  const [isOpen, toggleOpen] = useCycle(false, true);

  // Firebase
  const auth = useSelector((state) => state.firebase.auth);

  useFirestoreConnect([{ collection: 'schedules' }]);
  const schedules = useSelector((state) => state.firestore.ordered.schedules);
  // const hasErrors = useSelector((state) => state.firestore.errors);

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
            {!isLoaded(schedules) && <SkeletonGroup />}

            {schedules &&
              schedules.map((schedule) => (
                <ScheduleItem
                  key={schedule.id}
                  date="9:00-18:00, Monday, June 09 2020"
                  address="test"
                  isLoading={!isLoaded(schedules)}
                />
              ))}
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
