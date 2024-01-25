'use client'

import { useState, useEffect } from "react";
const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <>
      <div className="border-8 border-red-800  ">
        <h1 className=" mx-auto text-9xl min-w-min">{`${hours}:${minutes}:${seconds}`}</h1>
      </div>
    </>
  );
};

export default Clock;
