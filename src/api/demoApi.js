import axios from 'axios';

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/v1',
    timeout: 2000
});