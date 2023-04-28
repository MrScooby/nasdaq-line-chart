import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_NASDAQ_DATA_LINK_URL,
  timeout: 4000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true'
  },
})

instance.interceptors.request.use((config) => {
  config.params = {
    api_key: process.env.REACT_APP_NASDAQ_DATA_LINK_API_KEY,
    ...config.params,
  }
  return config
})

export default instance
