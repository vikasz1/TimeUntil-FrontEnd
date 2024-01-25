"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import AddCounter from "./AddCounter";
import styles from "../styles/TimeUntil.module.css";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "dotenv/config";
const API = process.env.NEXT_PUBLIC_API_URL;

// const events = [
//   { title: "Birthday (24 Years)", date: new Date("2024-05-28") },
//   { title: "Optum Joining Date", date: new Date("2024-05-07") },
//   {title:"Next Year",date:new Date("2025-01-01T12:30:00")}
//   // Add more events as needed
// ];

const events = [];

const sidebarItems = [
  "Item 1",
  "Item 2",
  "Item 3",
  // Add more sidebar items as needed
];

const TimeUntil = () => {
  const [events, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
// console.log(API)
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const parseDates = (targetDate) => {
    const dateObj = new Date(targetDate);
    // console.log("date: " + dateObj.getDay());
    return dateObj;
  };

  return isLoading ? (
    <div className={styles.loader}>
      <Audio color="red" width={200} height={200} /><h1 className="ml-10 text-6xl">Loading...</h1>
    </div>
  ) : (
    <>
      <ToastContainer />
      <h1 className={styles.pageTitle}>All My Counters</h1>
      <div className={styles.pageContainer}>
        {/* <div className={styles.sidebar}>
    <ul>
    {sidebarItems.map((item, index) => (
      <li key={index}>{item}</li>
      ))}
      </ul>
    </div> */}

        <div className={styles.mainContent}>
          {events.map((event, index) => (
            <Card
              key={index}
              eventTitle={event.title}
              targetDate={parseDates(event.date)}
            />
          ))}
        </div>
      </div>
      <AddCounter events={events} setData={setData} />
    </>
  );
};

export default TimeUntil;
