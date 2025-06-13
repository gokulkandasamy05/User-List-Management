import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {'x-api-key': 'reqres-free-v1'}
});

export default axios