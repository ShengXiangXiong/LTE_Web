/**
 * 统一http请求地址
 */

// import service from 'http'
import axios from 'axios'
export const userLogin = (params) => axios.post("api/Login/PostLogin", params)
// export const coverageCompute =  (params) =>{axios.post("api/CellRayTracing/PostRayTracing",params)};
export const coverageCompute = (params) => axios.post('api/CellRayTracing/PostRayTracing', params);

