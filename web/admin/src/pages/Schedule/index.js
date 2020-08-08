import React from 'react';
import { FiPlus } from 'react-icons/fi';

import DefaultLayout from '../_layouts/default';
import { PanelLeft, PanelRight, Header } from '../_layouts/default/styles';
import Title from '../../components/Title';
import ScheduleItem from '../../components/List/ScheduleItem';
import Calendar from '../../components/Calendar';
import Button from '../../components/Button';

const Schedule = () => {
  return (
    <>
      <DefaultLayout>
        <PanelLeft>
          <Header>
            <h1>schedule</h1>
            <Button
              type="button"
              icon={FiPlus}
              action
              onClick={() => 'clicked'}
            />
          </Header>
          <Title title="April, 2020" />

          <ul>
            <ScheduleItem
              key="id1"
              date="9:00-18:00, Monday, June 09 2020"
              address="767 5th Ave, New York"
            />
            <ScheduleItem
              key="id2"
              date="9:00-18:00, Monday, June 09 2020"
              address="767 5th Ave, New York"
              isActive
            />
            <ScheduleItem
              key="id3"
              date="9:00-18:00, Monday, June 09 2020"
              address="767 5th Ave, New York"
            />

            <Title title="May, 2020" />
            <ScheduleItem
              key="id4"
              date="9:00-18:00, Monday, June 09 2020"
              address="767 5th Ave, New York"
            />
            <ScheduleItem
              key="id5"
              date="9:00-18:00, Monday, June 09 2020"
              address="767 5th Ave, New York"
            />
            <ScheduleItem
              key="id6"
              date="9:00-18:00, Monday, June 09 2020"
              address="767 5th Ave, New York"
            />
            <ScheduleItem
              key="id7"
              date="9:00-18:00, Monday, June 09 2020"
              address="767 5th Ave, New York"
            />
            <ScheduleItem
              key="id8"
              date="9:00-18:00, Monday, June 09 2020"
              address="767 5th Ave, New York"
            />
          </ul>
        </PanelLeft>
        <PanelRight>
          <Calendar />
        </PanelRight>
      </DefaultLayout>
    </>
  );
};

export default Schedule;
