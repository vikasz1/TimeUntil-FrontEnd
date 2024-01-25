const axios = require("axios");

const apiUrl = "http://localhost:5000/data";

async function fetchDataFromApi() {
  try {
    const response = await axios.get(apiUrl);

    const data = response.data;

    // console.log("Data from API:", data);
    
    return data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
}

module.exports = { fetchDataFromApi };
