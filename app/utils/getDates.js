const axios = require("axios");

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// const apiUrl1 = "http://localhost:5000/data";
// console.log(apiUrl);
//
async function fetchDataFromApi(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    // console.log(apiUrl);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
}

module.exports = { fetchDataFromApi };
