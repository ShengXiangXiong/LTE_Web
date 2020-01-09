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
//刷新固定终端图层
export const PostFixTerminalLayer = (params) => axios.post('api/RefreshLayer/PostFixTerminalLayer', params);

export const AreaCoverAnalysis = (params) => axios.post('api/AreaCoverAnalysis/Post', params);
export const PostAreaCoverDefect = (params) => axios.post('api/AreaCoverDefect/PostAreaCoverDefect', params);

export const PostFishnet = () => axios.post('api/Fishnet/PostFishnet');
export const PostBuildingOverlay = (params) => axios.post('api/Overlay/PostBuildingOverlay', params);
export const PostWaterOverlay = (params) => axios.post('api/Overlay/PostWaterOverlay', params);
export const PostGrassOverlay = (params) => axios.post('api/Overlay/PostGrassOverlay', params);
export const PostScenePart = (params) => axios.post('api/ScenePart/PostScenePart', params);
export const PostClusterShp = (params) => axios.post('api/ScenePart/PostClusterShp', params);
export const PostAdjCoefficient = (params) => axios.post('api/ScenePart/PostAdjCoefficient', params);
export const getShpByAreaLonLat = (params) => axios.post('api/LoadShpLayer/getShpByAreaLonLat', params);


export const RefreshDTLayer = (params) => axios.post('api/', params);
export const AnalysisLoc = (params) => axios.post('api/', params);
export const generateRayLoc = (params) => axios.post('api/', params);
export const pointSelected = (params) => axios.post('api/', params);
