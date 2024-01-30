import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import "./style.css";

const CountDown = () => {
  const calculateTimeLeft = () => {
    const duration = 10 * 24 * 60 * 60 * 1000; 
    const difference = duration - (new Date() - +new Date("2024-02-04"));
    let timeLeft = {};

    if (difference > 0) {
      const totalSeconds = Math.floor(difference / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);

      timeLeft = {
        hours: totalHours,
        minutes: totalMinutes % 60,
        seconds: totalSeconds % 60,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

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
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                border: "5px solid #fff",
                borderRadius: "20px",
                padding: "1.5rem",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: "clamp(2rem, 10vw, 20rem)",
                  fontFamily: "Messapia-Bold",
                }}
              >
                10
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
          <Grid item xs={12} sm={8}>
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
                {timeLeft.hours} :
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
                {timeLeft.minutes} :
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
                {timeLeft.seconds}
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
