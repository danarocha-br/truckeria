import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";


import DefaultLayout from '../_layouts/default';
import { PanelLeft, PanelRight, Header } from '../_layouts/default/styles';
import {loadTruckProfileRequest} from '../../store/modules/truckProfile/actions';
import {loadSchedulesRequest} from '../../store/modules/schedules/actions';

const Dashboard = () => {

  const truckProfiles = useSelector((state) => state.truckProfile.list);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTruckProfileRequest());
  }, [dispatch]);

  return (
    <DefaultLayout>
      <PanelLeft>
        <Header>
          <h1>Dashboard</h1>
        </Header>

        {truckProfiles && truckProfiles.map(truckProfile => {
          return <button key={truckProfile.id} onClick={() => dispatch(loadSchedulesRequest(truckProfile.id))}>{truckProfile.name}</button>
        })}

      </PanelLeft>
      <PanelRight></PanelRight>
    </DefaultLayout>
  );
};

export default Dashboard;
