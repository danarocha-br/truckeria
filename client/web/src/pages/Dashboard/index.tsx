import React from 'react';

import {} from './styles';
import ContainerLayout from '../_layouts/Default';

export interface DashboardProps {
  currentUser: null | firebase.User;
}

const Dashboard: React.SFC<DashboardProps> = ({ currentUser }) => {
  return <ContainerLayout>{currentUser && 'test'}</ContainerLayout>;
};

export default Dashboard;
