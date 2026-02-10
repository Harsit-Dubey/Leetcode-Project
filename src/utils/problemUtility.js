const axios = require("axios");

const getLanguageById = (lang) => {

  const language = {
    "c++": 54,
    "java": 62,
    "javascript": 63
  }

  return language[lang.toLowerCase()];

}

const submitBatch = async (Submissions) => {

  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    headers: {
      'x-rapidapi-key': 'c631a26080msha7d210ffe11b45fp1d52e8jsnd66345225e85',
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {

      Submissions

    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return await fetchData();

}


const waiting = async (timer) => {
  setTimeout(() => {
    return 1;
  }, timer)
}


const submitToken = async (resultToken) => {

  const options = {
    method: 'GET',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
      tokens: resultToken.join(),
      base64_encoded: 'false',
      fields: '*'
    },
    headers: {
      'x-rapidapi-key': 'c631a26080msha7d210ffe11b45fp1d52e8jsnd66345225e85',
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  while (true) {
    const result = await fetchData();
    const IsResultObtained = result.Submissions.every((r) => r.status_id > 2)

    if (IsResultObtained)
      return result.Submissions;

    await waiting(1000);
  }
}


module.exports = { getLanguageById, submitBatch, submitToken };