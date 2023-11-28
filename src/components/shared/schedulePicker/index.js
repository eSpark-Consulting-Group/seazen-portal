import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// import { useDispatch } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import dayjs from "dayjs";

// import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateTimePicker,
  // , MobileTimePicker
} from "@mui/x-date-pickers";

import getBranchesAndHours, {
  GET_BRANCHES_AND_HOURS_QUERY_KEY,
} from "../../../api/restaurant/branches/getBranchesAndHours";

const SchedulePicker = (props) => {
  const {
    openSchedulePopup,
    setOpenSchedulePopup,
    // showTimePicker,
    // setShowTimePicker,
    // menuCard,
  } = props;

  // const dispatch = useDispatch();

  const popularDishRestId = localStorage.getItem("restaurantIdForRedirect");
  const restaurant_id = localStorage.getItem("restaurantID");

  const [pickDate, setPickDate] = useState(
    dayjs(new Date()).format("MMM DD, YYYY")
  );
  const asapTime = new Date().setMinutes(new Date().getMinutes() + 30);
  const [isAsap, setIsAsap] = useState(true);
  const [pickTime, setPickTime] = useState(dayjs(asapTime).format("hh:mm a"));
  // const [fromDetail, setFromDetail] = useState(false);
  const [pickDay, setPickDay] = useState("");
  const [minTime, setMinTime] = useState(dayjs());
  const [maxTime, setMaxTime] = useState(dayjs());

  useEffect(() => {
    if (localStorage.getItem("isAsap") === null) {
      localStorage.setItem("isAsap", isAsap);
    }

    if (localStorage.getItem("pickTime") === null) {
      localStorage.setItem("pickTime", pickTime);
    }

    if (
      localStorage.getItem("pickDate") === null ||
      new Date(localStorage.getItem("pickDate", pickDate)) < new Date()
    ) {
      localStorage.setItem("pickDate", pickDate);
    }
  }, [localStorage]);

  const { data: branchesAndHoursResponse } = useQuery({
    queryKey: [
      GET_BRANCHES_AND_HOURS_QUERY_KEY,
      restaurant_id === undefined ? popularDishRestId : restaurant_id,
    ],
    queryFn: () => {
      return getBranchesAndHours(
        restaurant_id === undefined ? popularDishRestId : restaurant_id
      );
    },
  });

  const onDateSelected = () => {
    if (localStorage.getItem("pickDate") !== null) {
      setOpenSchedulePopup(false);
    }
  };

  const branchId = localStorage.getItem("branchId");

  const timeByDate = branchesAndHoursResponse?.data
    ?.find((val) => (val.id = branchId))
    ?.branch_hours?.find((val) => {
      return val.week_day == pickDay;
    });

  const getSingleDigitHour = (fullTime) => {
    let Hour;
    Hour =
      fullTime?.split(":")[0][0] == "0"
        ? fullTime?.split(":")[0][1]
        : fullTime?.split(":")[0];

    if (fullTime?.includes("AM")) {
      return parseInt(Hour);
    }
    if (fullTime?.includes("PM")) {
      return parseInt(Hour) + 12;
    }
  };

  const handlerFunc = (ampm, date) => {
    const selectedTime = dayjs(date);
    if (ampm == "pm") {
      setMinTime(
        selectedTime
          .set("hour", getSingleDigitHour(timeByDate?.from_time))
          .set("minute", 0)
      );
      setMaxTime(
        selectedTime
          .set("hour", getSingleDigitHour(timeByDate?.to_time))
          .set("minute", 0)
          .add(1, "day")
      );
    }
    if (ampm == "am") {
      setMinTime(
        selectedTime
          .subtract(1, "day")
          .set("hour", getSingleDigitHour(timeByDate?.from_time))
          .set("minute", 0)
      );
      setMaxTime(
        selectedTime
          .subtract(1, "day")
          .set("hour", getSingleDigitHour(timeByDate?.to_time))
          .set("minute", 0)
          .add(1, "day")
      );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        open={openSchedulePopup}
        sx={{
          display: "none",
        }}
        minTime={minTime}
        maxTime={maxTime}
        disablePast
        ampm={true}
        onChange={(date, e, ew) => {
          handlerFunc(date.format("a"), date.format("YYYY-MM-DD"));
          setPickDay(date.format("dddd"));
          date.preventDefault();
        }}
        onClose={() => {
          onDateSelected();
        }}
        onAccept={(date) => {
          setOpenSchedulePopup(false);
          if (date) {
            localStorage.setItem("pickDate", date.format("MMM DD, YYYY-dddd"));
            localStorage.setItem("isAsap", false);
            localStorage.setItem("pickTime", date.format("hh:mm a"));
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default SchedulePicker;
