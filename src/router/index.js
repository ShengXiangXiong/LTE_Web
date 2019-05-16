import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from "../components/login/login";
import project_show from "../components/project_manage/project_show";
import index from "../components/index"
import mycomponents from "../components/mycomponents"
import CellRayTracing from "../components/CellRayTracing";
// import plane_map_show from "../components/map_show/plane_map_show";

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
        {path: '2d_map', component: mycomponents},
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
