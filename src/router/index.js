import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login/login";
import project_show from "../components/project_manage/project_show";
import index from "../components/index"
import planeMap from "../components/map_show/planeMap"
import CellRayTracing from "../components/coverageCompute/CellRayTracing";

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
      path:'/index',
      name:'index',
      component:index,
      children: [
        {path:'CellRayTracing',component:CellRayTracing}
      ]
    },
    {
      path:'/CellRayTracing',
      name:'CellRayTracing',
      component:CellRayTracing
    }
    ]
})
