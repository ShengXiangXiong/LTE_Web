/**
 * 统一http请求地址
 */

// import service from 'http'
import axios from 'axios'

export const userLogin = (params) => axios.post("api/Login/PostLogin", params);
export const coverageCompute = (params) => axios.post('api/CellRayTracing/PostRayTracing', params);
export const LoadShpLayer = (params) => axios.post('api/LoadShpLayer/getShpByCellName', params);
export const getInfo = (params) => axios.post('api/Loading/getLoadingInfo', params);
//刷新基站图层
export const PostRefreshCell = (params) => axios.post('api/RefreshLayer/PostRefreshCell', params);
//刷新小区地面覆盖图层
export const postRefreshCellGroundCover = (params) => axios.post('api/RefreshLayer/PostRefreshCellGroundCover', params);
//刷新小区立体覆盖图层
export const PostRefreshCell3DCover = (params) => axios.post('api/RefreshLayer/PostRefreshCell3DCover', params);
//刷新区域地面覆盖图层
export const PostRefreshAreaGroundCover = (params) => axios.post('api/RefreshLayer/PostRefreshAreaGroundCover', params);
//刷新区域立体覆盖图层
export const PostRefreshArea3DCover = (params) => axios.post('api/RefreshLayer/PostRefreshArea3DCover', params);
//刷新区域弱覆盖图层
export const PostRefreshWeakLayer = (params) => axios.post('api/RefreshLayer/PostRefreshWeakLayer', params);
//刷新区域过覆盖图层
export const PostRefreshExcessiveLayer = (params) => axios.post('api/RefreshLayer/PostRefreshExcessiveLayer', params);
//刷新区域重叠覆盖图层
export const PostRefreshOverlappedLayer = (params) => axios.post('api/RefreshLayer/api/RefreshLayer/PostRefreshOverlappedLayer', params);
//刷新区域PCI冲突图层
export const PostRefreshPCIconflictLayer = (params) => axios.post('api/RefreshLayer/PostRefreshPCIconflictLayer', params);
//刷新区域PCI混淆图层
export const PostRefreshPCIconfusionLayer = (params) => axios.post('api/RefreshLayer/PostRefreshPCIconfusionLayer', params);
//刷新区域PCI模3对打图层
export const PostRefreshPCImod3Layer = (params) => axios.post('api/RefreshLayer/PostRefreshPCImod3Layer', params);

export const AreaCoverAnalysis = (params) => axios.post('api/AreaCoverAnalysis/Post', params);
export const PostAreaCoverDefect = (params) => axios.post('api/AreaCoverDefect/PostAreaCoverDefect', params);


