import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import {useParams} from "react-router-dom";
import { format, toDate, parseISO, getDate } from 'date-fns';
// import AsyncSelect from 'react-select/async';
// import { Map, TileLayer, Marker } from "react-leaflet";

import DefaultLayout from '../_layouts/default';
import { PanelLeft, PanelRight, Header } from '../_layouts/default/styles';
import Title from '../../components/Title';
import ScheduleItem from '../../components/List/ScheduleItem';
import Calendar from '../../components/Calendar';
import Button from '../../components/Button';
import SkeletonGroup from '../../components/SkeletonGroup';
import { listGroup } from '../../components/List/animations';
import { loadMonthSchedulesRequest } from '~/store/modules/schedules/actions';
import { loadTruckProfileRequest } from '~/store/modules/truckProfile/actions';
import { showModal } from '~/store/modules/modals/actions';

const Schedule = () => {

  const dispatch = useDispatch()

  const schedules = useSelector((state) => state.schedules.list);
  const isLoading = useSelector((state) => state.schedules.loading);
  let { truck_id } = useParams();

  // Month
  const [currenthMonth, setCurrentMonth] = useState(new Date());
  const [selectDate, setSelectDate] = useState(new Date());

  const handleMonthChange = useCallback((month) => {
    setCurrentMonth(month)
  }, [])

  useEffect(() => {
    const year = currenthMonth.getFullYear()
    const month = currenthMonth.getMonth() + 1

    dispatch(loadMonthSchedulesRequest(truck_id, month, year))

  }, [dispatch, currenthMonth, truck_id])

  const monthFormatted = useMemo(() => {
    return format(currenthMonth, "MMMM, YYY")
  }, [currenthMonth])

  //get total month's schedule
  const totalSchedules = useMemo(() => {
    return schedules && schedules.length
  }, [schedules])

  //get days to book into calendar
  const daysBooked = useMemo(() => {
    const days = schedules && schedules.map(schedule => toDate(parseISO(schedule.date_start)))
    return days

  }, [schedules])

  //handle change date
  const handleDateChange = useCallback((day) => {
    setSelectDate(day);
  }, []);

  const isMatchingDates = useMemo(() => {
    const year = currenthMonth.getFullYear()
    const month = currenthMonth.getMonth()
    return schedules && schedules.filter(schedule => new Date(year, month, getDate(parseISO(schedule.date_start)), 12,0,0,0).valueOf() === selectDate.valueOf())

  }, [selectDate, schedules, currenthMonth])


  // load truck Profile
  useEffect(() => {
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


 //handle update schedule
 const handleUpdateSchedule = useCallback((schedule) => {
    dispatch(showModal('UpdateSchedule', { schedule }))
}, [dispatch]);

 //handle delete schedule
 const handleDeleteSchedule = useCallback((schedule_id) => {
    // dispatch(updateScheduleRequest(schedule_id))
}, [dispatch]);

  return (
    <>
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
              onClick={() => dispatch(showModal('NewSchedule', { truck_id }))}
            />
          </Header>
          <Title title={monthFormatted} total={totalSchedules} />

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
                  isActive={isMatchingDates && isMatchingDates.some(date => date.id === schedule.id) ? true : false}
                  onUpdate={() => handleUpdateSchedule(schedule)}
                  onDelete={handleDeleteSchedule}
                />
              ))}
          </motion.ul>
        </PanelLeft>
        <PanelRight>
          <Calendar onMonthChange={handleMonthChange} selectedDays={daysBooked} onDayClick={handleDateChange}/>
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
