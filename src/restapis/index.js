import axios from 'axios';

const BASE_URL = 'http://192.168.100.7:5000';
// const BASE_URL = 'https://send-verification-email.mfahad3.repl.co/api/v1';


const http = axios.create({
    baseURL: BASE_URL,
    headers:{
        'Content-Type': 'application/json',
    }
});
export default http;