import axios from 'axios';
// import QS from 'qs';
import { message } from 'antd';
import Cookies from 'js-cookie';

//环境切换
if (process.env.NODE_ENV === 'development') {//开发环境
  axios.defaults.baseURL = 'http://192.168.11.228/api'
} else if (process.env.NODE_ENV === 'dedug') {//测试环境
  axios.defaults.baseURL = 'http://192.168.11.139/api'
} else if (process.env.NODE_ENV === 'production') {//生产环境
  axios.defaults.baseURL = 'http://192.168.11.110/api'
}

//设置请求超时时间
axios.defaults.timeout = 10000;

//设置请求头的token值
let token = 'c3VwZXJ1c2VyOjEyMzQ1Ng==';
const userInfo = Cookies.get('token');
if (userInfo) {
  token = userInfo;
  axios.defaults.headers.common.token = `Bearer ${token}`;
} else {
  axios.defaults.headers.common.token = `Basic ${token}`;
}

//设置不同的请求方式
const fetch = options => {
  const { url, method = 'get', data = {} } = options;
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, { params: data })
    case 'delete':
      return axios.delete(url, { data: data })
    case 'post':
      return axios.post(url, data)
    case 'put':
      return axios.post(url, data)
    default:
      axios(options)
  }
}

export default function request(options) {
  return (
    fetch(options)
      .then(response => {
        const { data } = response;
        return Promise.resolve({
          ...data
        })
      })
      .catch(error => {
        const { response } = error;
        let msg;
        let statusCode;

        if (response && response instanceof Object) {
          const { data, status, statusText } = responsse;
          msg = data.message || statusText;
          statusCode = status;

          if (status === 401) {
            Cookies.remove('userInfo');
            Cookies.remove('token');
            window.sessionStorage.removeItem('sessionUserInfo');
            window.location = '/login';
          } else if (status === 403 && statusText === 'Forbidden' && error.message && error.message.indexOf('no privilege') !== -1) {
            message.error("接口没配置权限，自动退出系统", () => {
              Cookies.remove('userInfo');
              window.sessionStorage.removeItem("sessionUserInfo");
              window.location = '/login';
            })
          } else if (status === 405 && statusText === 'Forbidden' && error.message && error.message.indexOf('no privilege') !== -1) {
            message.error("禁止IP，自动退出系统", () => {
              Cookies.remove('userInfo');
              window.sessionStorage.removeItem("sessionUserInfo");
              window.location = '/login';
            })
          }
        } else {
          message.error("系统服务异常，自动退出系统", () => {
            Cookies.remove('userInfo');
            Cookies.remove('token');
            window.sessionStorage.removeItem("sessionUserInfo");
            window.location = '/login';
          })
        }

        return Promise.reject({
          error: true,
          statusCode,
          statusMessage: msg,
        })
      })
  )
}