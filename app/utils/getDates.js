const axios = require("axios");

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function fetchDataFromApi() {
  try {
    const response = await axios.get(apiUrl);
    console.log(apiUrl)
    const data = response.data;
    // console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
}

module.exports = { fetchDataFromApi };
