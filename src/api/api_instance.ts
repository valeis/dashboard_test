import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL;

const axios_instance = axios.create({
    baseURL: baseURL,
    headers: {"Content-Type": "application/json"}
});

export default axios_instance;