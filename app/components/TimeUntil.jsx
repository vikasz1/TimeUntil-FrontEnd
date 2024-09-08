"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import styles from "../styles/TimeUntil.module.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Audio } from "react-loader-spinner";
import { fetchDataFromApi } from "../utils/getDates";
require("dotenv").config();

const API = process.env.NEXT_PUBLIC_API_URL;
// const events = [
//   { title: "Birthday (24 Years)", date: new Date("2024-05-28") },
//   { title: "Optum Joining Date", date: new Date("2024-05-07") },
//   {title:"Next Year",date:new Date("2025-01-01T12:30:00")}
//   // Add more events as needed
// ];

const events = [];

const getUserData = (allUserData, user) => {
  if (user)
    allUserData.forEach((element) => {
      console.log("Result", element.timers);
      return element.email == user.email ? element.timers : "Nothing";
    });
};

const TimeUntil = () => {
  const [allUserData, setUserData] = useState([]);
  // const [isLoading, setLoading] = useState(true);
  const { user, error, isLoading } = useUser();
  const [userTimers, setUserTimers] = useState([]);

  // console.log(user);

  useEffect(() => {
    fetchDataFromApi(API).then((data) => {
      setUserData(data);
      // setLoading(false);
    });
  }, []);
  // const finalData = getUserData(allUserData, user);
  // console.log("finaldata", allUserData, user, finalData);

  useEffect(() => {
    if (user)
      allUserData.forEach((element) => {
        if (element.email == user.email) setUserTimers(element.timers);
      });
  });

  console.log("Mere Timers", userTimers);
  const parseDates = (targetDate) => {
    const dateObj = new Date(targetDate);
    // console.log("date: " + dateObj.getDay());
    return dateObj;
  };

  return isLoading ? (
    <div className={styles.loader}>
      <Audio color="red" width={200} height={200} />
      <h1 className="ml-10 text-6xl">Loading...</h1>
    </div>
  ) : (
    <>
      <Link href="/Manage">
        <Button>Manage counters</Button>
      </Link>
      {!user ? (
        <a href="/api/auth/login">
          <button>Login</button>
        </a>
      ) : (
        <>
          {/* {console.log(user)} */}
          <h1>Hello {user?.given_name || user?.name}</h1>

          <a href="/api/auth/logout">
            <button className="btn-primary btn">logout</button>
          </a>
        </>
      )}

      <h1 className={styles.pageTitle}>All My Counters</h1>
      <div className={styles.pageContainer}>
        <div className={styles.mainContent}>
          {userTimers.map((event, index) => (
            <Card
              key={index}
              eventTitle={event.title}
              targetDate={parseDates(event.timestamp)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TimeUntil;
