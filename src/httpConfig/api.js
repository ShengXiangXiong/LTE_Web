/**
 * 统一http请求地址
 */

// import service from 'http'
import axios from 'axios'
export const userLogin = (params) => axios.post("api/Login/PostLogin", params);
export const coverageCompute = (params) => axios.post('api/CellRayTracing/PostRayTracing', params);
export const LoadShpLayer = (params) => axios.post('api/LoadShpLayer/getShpByCellName', params);
export const getInfo = (params) => axios.post('api/Loading/getLoadingInfo', params);
export const postRefreshCellGroundCover = (params) => axios.post('api/RefreshLayer/PostRefreshCellGroundCover', params);
export const AreaCoverAnalysis = (params) => axios.post('api/AreaCoverAnalysis/Post', params);
export const PostAreaCoverDefect = (params) => axios.post('api/AreaCoverDefect/PostAreaCoverDefect', params);

