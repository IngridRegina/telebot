import axios from 'axios'
import { useAuthStore } from '@/store/auth'


export default function setAxiosDefaults() {
  axios.interceptors.request.use(function (config) {
    config.baseURL = import.meta.env.VITE_BACKEND_API_URL
    config.headers['Accept'] = 'application/json'

    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers['Authorization'] = `Token ${authStore.token}`
    }
    return config
  })

  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    function (error) {
      return Promise.reject(error)
    },
  )
}
