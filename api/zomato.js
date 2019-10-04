const axios = require("axios")

const instance = axios.create({
    baseURL: 'https://developers.zomato.com/api/v2.1/',
    headers: {
      'Accept': 'application/json',
      'user-key': process.env.ZOMATO_TOKEN
    }
  });

module.exports = instance