"use client";

import React, { useState } from "react";
import styles from "../styles/AddCounter.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import "dotenv/config";

const API = process.env.NEXT_PUBLIC_API_URL;

const AddCounter = ({ events, setData }) => {
  const [isloading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.title && formData.date) {
      axios.post(API, formData).then((response) => {
        console.log("response" + response);
      });

      toast("Submitted Successfully!");
      setData([...events, formData]);
    } else {
      console.log("You entered: " + formData.name);
    }
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.label}>
        <label htmlFor="title">Title:</label>
      </div>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        className={styles.input}
      />
      <div className={styles.label}>
        <label htmlFor="date">Date:</label>
      </div>
      <input
        type="date"
        id="date"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
        className={styles.input}
      />
      <div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddCounter;
