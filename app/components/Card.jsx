"use client";
// components/Card.js

import React, { useEffect, useState } from "react";
import styles from "../styles/Card.module.css";

const Card = ({ eventTitle, targetDate }) => {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(calculateCountdown(targetDate));
      // console.log(targetDate.getFullYear())
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [targetDate]);

  function calculateCountdown(targetDate) {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;
    // console.log(Date.parse(targetDate)-now);

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  return (
    <div className={styles.card}>
      <div className={styles.eventTitle}>
        {eventTitle} {targetDate.getDate()}
        {"/"}
        {targetDate.getMonth() + 1}
        {"/"}
        {targetDate.getFullYear()}
      </div>
      <div className={styles.countdown}>
        {countdown.days} Days {countdown.hours} Hours {countdown.minutes}{" "}
        Minutes {countdown.seconds} Seconds
      </div>
    </div>
  );
};

export default Card;
