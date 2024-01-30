"use client";

import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/TimeUntil.module.css";
import { fetchDataFromApi } from "../utils/getDates";
import { Audio } from "react-loader-spinner";
import Link from "next/link";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import AddCounter from "../components/AddCounter";

const Manage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // console.log(API)
  useEffect(() => {
    fetchDataFromApi().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  // const [events, setEvents] = useState([
  //   { id: 1, title: "Event 1", date: "2024-02-01" },
  //   { id: 2, title: "Event 2", date: "2024-02-15" },
  //   { id: 3, title: "Event 3", date: "2024-03-01" },
  // ]);

  const handleDelete = (_id) => {
    const updatedEvents = events.filter((event) => event._id !== _id);
    console.log(_id);
    toast.success("Deleted Successfully", {
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
      theme: "dark",
      transition: Zoom,
    });

    axios.delete(apiUrl, { data: { eventId: _id } }).then((res) => {
      console.log(res);
    });
    setEvents(updatedEvents);
  };

  return isLoading ? (
    <div className={styles.loader}>
      <Audio color="red" width={200} height={200} />
      <h1 className="ml-10 text-6xl">Loading...</h1>
    </div>
  ) : (
    <div className="manage">
      <ToastContainer />
      <Link href="/" className="btn btn-primary">
        Home
      </Link>
      <h2>Manage Events</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Event Title</th>
            <th>Event Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{event.date.slice(0, 10)}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(event._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddCounter events={events} setData={setEvents} />
    </div>
  );
};

export default Manage;
