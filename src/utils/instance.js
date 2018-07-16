import axios from 'axios'

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? ''
      : false, //设置默认api路径
  timeout: 1000, //设置超时时间
  // headers: { 'X-Custom-Header': 'foobar' }
})

export default instance
