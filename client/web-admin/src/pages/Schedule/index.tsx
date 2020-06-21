import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { motion, useCycle, useAnimation } from 'framer-motion';
import { useDispatch } from 'react-redux';

import ContainerLayout from '../_layouts/Default';
import { ColLeft, ColRight, Header } from '../_layouts/ContentWrapper/styles';
import Title from '../../components/Title';
import ScheduleItem from '../../components/List/ScheduleItem';
import Calendar from '../../components/Calendar';
import Button from '../../components/Button';
import ScheduleModal from './ScheduleModal';
import { showModal } from '../../store/modules/modal/actions';

export interface ScheduleProps {
  isOpen: boolean;
  // handleOpenModal?(): (value: string) => void;
}

const Schedule: React.SFC<ScheduleProps> = () => {
  // const [isOpen, setToggleOpen] = useCycle(false, true);
  const [isOpen, setToggleOpen] = useState<boolean>(true);

  // currentModal
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(showModal('ScheduleModal'));
  };
  return (
    <>
      <ContainerLayout>
        <ColLeft>
          <Header>
            <h1>schedule</h1>
            <Button
              type="button"
              icon={FiPlus}
              action
              onClick={handleOpenModal}
            />
          </Header>
          <Title title="April, 2020" />

          <ul>
            <ScheduleItem
              date="9:00-18:00, Monday, June 09 2020"
              address="767 5th Ave, New York"
            />
            <ScheduleItem
              date="9:00-18:00, Monday, June 09 2020"
              address="767 5th Ave, New York"
              isActive
            />
            <ScheduleItem
              date="9:00-18:00, Monday, June 09 2020"
              address="767 5th Ave, New York"
            />

            <Title title="May, 2020" />
            <ScheduleItem
              date="9:00-18:00, Monday, June 09 2020"
              address="767 5th Ave, New York"
            />
            <ScheduleItem
              date="9:00-18:00, Monday, June 09 2020"
              address="767 5th Ave, New York"
            />
            <ScheduleItem
              date="9:00-18:00, Monday, June 09 2020"
              address="767 5th Ave, New York"
            />
            <ScheduleItem
              date="9:00-18:00, Monday, June 09 2020"
              address="767 5th Ave, New York"
            />
            <ScheduleItem
              date="9:00-18:00, Monday, June 09 2020"
              address="767 5th Ave, New York"
            />
          </ul>
        </ColLeft>
        <ColRight>
          <Calendar />
        </ColRight>
      </ContainerLayout>
    </>
  );
};

export default Schedule;
