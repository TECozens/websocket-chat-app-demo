import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001',
    dataType: 'json'
});
export default instance;