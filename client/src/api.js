import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Check karo aapka backend isi port par hai na?
});

export default API;