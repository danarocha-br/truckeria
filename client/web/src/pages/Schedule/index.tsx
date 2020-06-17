import React from 'react';

import ContainerLayout from '../_layouts/Default';
import Title from '../../components/Title';
import ScheduleItem from '../../components/List/ScheduleItem';
import { ColLeft, ColRight, Header } from '../_layouts/ContentWrapper/styles';

export interface ScheduleProps {}

const Schedule: React.SFC<ScheduleProps> = () => {
  return (
    <ContainerLayout>
      <ColLeft>
        <Header>
          <h1>schedule</h1>
          <button type="button">+</button>
        </Header>
        <Title title="April, 2020" />

        <ul>
          <ScheduleItem />
        </ul>
      </ColLeft>
      <ColRight />
    </ContainerLayout>
  );
};

export default Schedule;
