import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: 'https://conduit.productionready.io' // url = base url + request url
})

// request interceptor

// response interceptor

export default service
