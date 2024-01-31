import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import "./style.css";

const CountDown = () => {
  // Set the target date to February 10th midnight
  const targetDate = new Date("2024-02-10T00:00:00");

  // Initial state for countdown values
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Function to update countdown values
    const updateCountdown = () => {
      // Get the current date and time
      const currentDate = new Date();

      // Calculate the time difference in milliseconds
      const timeDifference = targetDate - currentDate;

      // Check if the target date has not been reached
      if (timeDifference > 0) {
        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Update state with new countdown values
        setCountdown({ days, hours, minutes, seconds });
      } else {
        // If the target date has been reached, set countdown to 0
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Update every second
    const intervalId = setInterval(updateCountdown, 1000);

    // Clear interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on mount

  // Helper function to add leading zeros
  const addLeadingZero = (value) => (value < 10 ? `0${value}` : value);

  return (
    <div className="countdown_container">
      <div className="top_logos">
        <img
          src="../../../assets/img/logo.webp"
          className="countdown_logoLeft"
        ></img>
        <img
          src="../../../assets/img/time.webp"
          className="countdown_logoRight"
        ></img>
      </div>
      <div className="countdown_section">
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={4.5} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                border: "5px solid #fff",
                borderRadius: "20px",
                padding: "0rem 1.5rem",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: "clamp(2rem, 10vw, 20rem)",
                  fontFamily: "Messapia-Bold",
                }}
              >
                {countdown.days}
              </Typography>
              <br />
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: "clamp(1rem, 4.5vw, 8rem)",
                  fontFamily: "Messapia-Bold",
                  lineHeight: "0.75",
                }}
              >
                DAYS
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={7.5}>
            <Box
              sx={{
                border: "5px solid #fff",
                borderRadius: "20px",
                padding: "2rem 0.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: "clamp(1.2rem, 6vw, 12rem)",
                  margin: "0 1rem",
                  fontFamily: "Messapia-Bold",
                  textAlign: "center",
                }}
              >
                {addLeadingZero(countdown.hours)} :
                <br />
                <span style={{ fontFamily: "Messapia-Bold", fontSize: "4vw" }}>
                  Hr.
                </span>
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "clamp(1.2rem, 6vw, 12rem)",
                  margin: "0 1rem",
                  fontFamily: "Messapia-Bold",
                  textAlign: "center",
                }}
              >
                {addLeadingZero(countdown.minutes)} :
                <br />
                <span style={{ fontFamily: "Messapia-Bold", fontSize: "4vw" }}>
                  Min.
                </span>
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "clamp(1.2rem, 6vw, 12rem)",
                  margin: "0 1rem",
                  fontFamily: "Messapia-Bold",
                  textAlign: "center",
                }}
              >
                {addLeadingZero(countdown.seconds)}
                <br />
                <span style={{ fontFamily: "Messapia-Bold", fontSize: "4vw" }}>
                  Sec.
                </span>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CountDown;
