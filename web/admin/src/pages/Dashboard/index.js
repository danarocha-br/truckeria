import React, {useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import DefaultLayout from '../_layouts/default';
import { Header } from '../_layouts/default/styles';
import TruckProfileItem from "~/components/List/TruckProfileItem";
import {loadTruckProfileRequest} from '~/store/modules/truckProfile/actions';
import {loadSchedulesRequest} from '~/store/modules/schedules/actions';
import { Grid, Container } from './styles';


const Dashboard = () => {

  const truckProfiles = useSelector((state) => state.truckProfile.list);
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch(loadTruckProfileRequest());
  }, [dispatch]);

  const handleLoadSchedules = useCallback((truck_id) => {
      dispatch(loadSchedulesRequest(truck_id));
      history.push(`/schedule/${truck_id}`);
  }, [dispatch, history])

  return (
    <DefaultLayout>
      <Container>

        <Header>
          <h1>Dashboard</h1>
        </Header>

        <Grid>
        {truckProfiles && truckProfiles.map(truckProfile => {
          return <TruckProfileItem key={truckProfile.id} title={truckProfile.name} cuisines={truckProfile.cuisines} city={truckProfile.city} state={truckProfile.state} onClick={() => handleLoadSchedules((truckProfile.id))}></TruckProfileItem>
        })}
        </Grid>
    </Container>

    </DefaultLayout>
  );
};

export default Dashboard;
