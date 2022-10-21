import axios from 'axios';

const api = axios.create({
    baseURL: 'http://associados.api.expertusdigital.com/',
});
  

export default api;
  
  