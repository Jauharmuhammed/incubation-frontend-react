import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://incubation-backend-django-production.up.railway.app/api',
});

export default axiosInstance