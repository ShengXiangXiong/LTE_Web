import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login/login'
import project_show from '../components/project_manage/project_show'
import index from '../components/index'
import CellRayTracing from '../components/coverageCompute/CellRayTracing'
import CoefficientCorrection from '../components/coefficientCorrection/CoefficientCorrection'
import RayRecord from '../components/coefficientCorrection/RayRecord'
import GridDivision from '../components/sceneModeling/GridDivision'
import ExtraInterferenceLoc from '../components/extraInterferenceLoc/ExtraInterferenceLoc'
import InterferenceRayRecord from '../components/extraInterferenceLoc/InterferenceRayRecord'
import InternalInterferenceAnalysis from '../components/internalInterferenceAnalysis/InternalInterferenceAnalysis'
import taskProgress from '../components/toolComponents/taskProgress'
import AreaCoverageComputation from '../components/coverageCompute/AreaCoverageComputation'
import AreaCoverageLayerRefresh from '../components/coverageCompute/AreaCoverageLayerRefresh'
import CellCoverageLayerRefresh from '../components/coverageCompute/CellCoverageLayerRefresh'
import Fishnet from '../components/sceneModeling/Fishnet'
import Overlay from '../components/sceneModeling/Overlay'
import ScenePart from '../components/sceneModeling/ScenePart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'index',
      // component: index
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/project_show',
      name: 'project_show',
      component: project_show
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {path: 'CellRayTracing', component: CellRayTracing},
        {path: 'CellCoverageLayerRefresh', component: CellCoverageLayerRefresh},
        {path: 'AreaCoverageComputation', component: AreaCoverageComputation},
        {path: 'AreaCoverageLayerRefresh', component: AreaCoverageLayerRefresh},
        {path: 'CoefficientCorrection', component: CoefficientCorrection},
        {path: 'RayRecord', component: RayRecord},
        {path: 'ExtraInterferenceLoc', component: ExtraInterferenceLoc},
        {path: 'InterferenceRayRecord', component: InterferenceRayRecord},
        {path: 'GridDivision', component: GridDivision},
        {path: 'InternalInterferenceAnalysis', component: InternalInterferenceAnalysis},
        {path: 'taskProgress', component: taskProgress},
        {path: 'Fishnet',component: Fishnet},
        {path: 'Overlay',component: Overlay},
        {path: 'ScenePart',component: ScenePart}
      ]
    },
    {
      path: '/CellRayTracing',
      name: 'CellRayTracing',
      component: CellRayTracing
    },
    // {
    //   path: '/taskProgress',
    //   name: 'taskProgress',
    //   component: taskProgress
    // },

  ]
})
