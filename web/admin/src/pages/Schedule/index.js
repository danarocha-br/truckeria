import React, { useEffect, useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';
import { motion, useCycle } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import {useParams} from "react-router-dom";
import AsyncSelect from 'react-select/async';
import { Map, TileLayer, Marker } from "react-leaflet";

import DefaultLayout from '../_layouts/default';
import { PanelLeft, PanelRight, Header } from '../_layouts/default/styles';
import Title from '../../components/Title';
import ScheduleItem from '../../components/List/ScheduleItem';
import Calendar from '../../components/Calendar';
import Button from '../../components/Button';
import SkeletonGroup from '../../components/SkeletonGroup';
import { listGroup } from '../../components/List/animations';
import NewScheduleModal from './NewSchedule';
import { loadSchedulesRequest } from '~/store/modules/schedules/actions';
import { loadTruckProfileRequest } from '~/store/modules/truckProfile/actions';

import { customSelectStyles } from "./styles";

const Schedule = () => {
  // Modal
  const [isOpen, toggleOpen] = useCycle(false, true);
  const dispatch = useDispatch()

  const schedules = useSelector((state) => state.schedules.list);
  const isLoading = useSelector((state) => state.schedules.loading);
  const truckProfiles = useSelector((state) => state.truckProfile.list);
  let { truck_id } = useParams();

  useEffect(() => {
    dispatch(loadSchedulesRequest(truck_id))
    dispatch(loadTruckProfileRequest());

  }, [dispatch])

//   const defaultValue = truckProfiles &&
//     truckProfiles.filter((profile) => {
//       profile.id === truck_id
//       return { value: profile.id, label: profile.name };
// });

//   const truckProfileOptions =
//     truckProfiles &&
//     truckProfiles.map((profile) => {
//       return { value: profile.id, label: profile.name };
//   });

//   console.log(defaultValue)

  return (
    <>
      <NewScheduleModal isOpen={isOpen} toggleOpen={toggleOpen} id={truck_id} />
      <DefaultLayout>
        <PanelLeft>
          <Header>
            {/* <AsyncSelect
            styles={customSelectStyles}
            defaultValue={defaultValue}
            // isDisabled={isDisabled}
            // isLoading={isLoading}>
            name="color"
            options={truckProfileOptions}
          /> */}
            <Button
              type="button"
              icon={FiPlus}
              action
              onClick={() => toggleOpen()}
            />
          </Header>
          <Title title="April, 2020" />

          <motion.ul variants={listGroup} initial="hidden" animate="visible">
            {isLoading && <SkeletonGroup />}

            {schedules &&
              schedules.map((schedule) => (
                <ScheduleItem
                  key={schedule.id}
                  date={schedule.date}
                  day={schedule.day}
                  startsIn={schedule.starts_in}
                  address={schedule.address}
                  isLoading={isLoading}
                />
              ))}
          </motion.ul>
        </PanelLeft>
        <PanelRight>
          <Calendar />
          {/* <Map center={[59.5009761, 24.8487613]} zoom={15}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[59.5009761, 24.8487613]} />
          </Map> */}
        </PanelRight>
      </DefaultLayout>
    </>
  );
};

export default Schedule;
