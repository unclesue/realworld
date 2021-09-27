import axios from 'axios'

// create an axios instance
export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

export default ({ store }, inject) => {
  // Add a request interceptor
  request.interceptors.request.use(function(config) {
    // Do something before request is sent
    const auth = store.state.auth
    if (auth && auth.user && auth.user.token) {
      config.headers.Authorization = `Token ${auth.user.token}`
    }
    return config
  }, function(error) {
    // Do something with request error
    return Promise.reject(error)
  })

  // Add a response interceptor
  request.interceptors.response.use(function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  }, function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  })
}
