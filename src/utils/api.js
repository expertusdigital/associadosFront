import axios from 'axios';

const api = axios.create({
    baseURL: 'https://associados.api.expertusdigital.com',
});

const apiUrl = 'https://associados.api.expertusdigital.com'

export default {api,apiUrl};

  
  