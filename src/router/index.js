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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
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
        {path: 'CoefficientCorrection', component: CoefficientCorrection},
        {path: 'RayRecord', component: RayRecord},
        {path: 'ExtraInterferenceLoc', component: ExtraInterferenceLoc},
        {path: 'InterferenceRayRecord', component: InterferenceRayRecord},
        {path: 'GridDivision', component: GridDivision},
        {path: 'InternalInterferenceAnalysis', component: InternalInterferenceAnalysis}
      ]
    },
    {
      path: '/CellRayTracing',
      name: 'CellRayTracing',
      component: CellRayTracing
    }
  ]
})
