import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import dayjs from "dayjs";

import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers";

import getBranchesAndHours, {
  GET_BRANCHES_AND_HOURS_QUERY_KEY,
} from "../../../api/restaurant/branches/getBranchesAndHours";

import { useDispatch } from "react-redux";

const SchedulePicker = (props) => {
  const {
    openSchedulePopup,
    setOpenSchedulePopup,
    showTimePicker,
    setShowTimePicker,
    menuCard,
  } = props;

  const dispatch = useDispatch();

  const { id: restaurant_id } = useParams();
  const popularDishRestId = localStorage.getItem("restaurantIdForRedirect");

  const [pickDate, setPickDate] = useState(
    dayjs(new Date()).format("MMM DD, YYYY")
  );
  const asapTime = new Date().setMinutes(new Date().getMinutes() + 30);
  const [isAsap, setIsAsap] = useState(true);
  const [pickTime, setPickTime] = useState(dayjs(asapTime).format("hh:mm a"));
  const [fromDetail, setFromDetail] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isAsap", isAsap) === null) {
      localStorage.setItem("isAsap", isAsap);
    }

    if (localStorage.getItem("pickTime", pickTime) === null) {
      localStorage.setItem("pickTime", pickTime);
    }

    if (localStorage.getItem("pickDate", pickDate) === null) {
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

  const timeByDate = branchesAndHoursResponse?.data[0]?.branch_hours?.find(
    (val) => {
      return val.week_day == localStorage.getItem("pickDate").split("-")[1];
    }
  );

  const onDateSelected = () => {
    if (localStorage.getItem("pickDate") !== null) {
      setOpenSchedulePopup(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        onChange={(date) => setPickDate(date.format("MMM DD, YYYY-dddd"))}
        minDate={dayjs(new Date())}
        open={openSchedulePopup}
        defaultValue={dayjs(new Date().toString())}
        onClose={() => onDateSelected()}
        onAccept={(date) => {
          if (date) {
            localStorage.setItem("pickDate", date.format("MMM DD, YYYY-dddd"));
            setShowTimePicker(true);
          }
        }}
        sx={{
          display: "none",
        }}
      />
      {showTimePicker && (
        <MobileTimePicker
          minTime={dayjs(
            new Date().setHours(parseInt(timeByDate?.from_time?.split(":")[0]))
          )}
          maxTime={dayjs(
            new Date().setHours(
              parseInt(timeByDate?.to_time?.split(":")[0]) + 12
            )
          )}
          defaultValue={dayjs(new Date())}
          open={showTimePicker}
          onChange={(time) => {
            setPickTime(time.format("hh:mm a"));
            setIsAsap(false);
            setFromDetail(false);
          }}
          onClose={() => setShowTimePicker(false)}
          onAccept={(time) => {
            localStorage.setItem("isAsap", false);
            localStorage.setItem("pickTime", time.format("hh:mm a"));
          }}
          sx={{
            display: "none",
          }}
        />
      )}
    </LocalizationProvider>
  );
};

export default SchedulePicker;
