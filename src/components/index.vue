<template>
  <div style="background-color: #EBEBEB;min-height:800px">
    <div style="width:100%; overflow: hidden">
      <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
               active-text-color="#ffd04b" @select="handleSelect" router>
        <el-menu-item index="/index">网站首页</el-menu-item>
        <!--        <el-menu-item index="2"><el-input placeholder="快速搜索" icon="search" v-model="searchCriteria" :on-icon-click="handleIconClick"></el-input></el-menu-item>-->
        <el-submenu index="3">
          <template slot="title"><div class="el-icon-menu"></div>项目管理</template>
          <el-menu-item index="1-1">项目删除</el-menu-item>
          <el-menu-item index="1-2">项目创建</el-menu-item>
          <el-menu-item index="1-3">项目查询</el-menu-item>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title"><div class="el-icon-menu"></div>数据管理</template>
          <el-menu-item index="4-1">数据导入</el-menu-item>
          <el-menu-item index="4-2">数据导出</el-menu-item>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title"><div class="el-icon-menu"></div>场景建模</template>
          <el-menu-item index="/index/GridDivision">网格划分</el-menu-item>
          <el-menu-item index="/index/Fishnet">渔网生成</el-menu-item>
          <el-menu-item index="/index/Overlay">叠加分析</el-menu-item>
          <el-menu-item index="/index/ScenePart">场景划分</el-menu-item>
          <el-menu-item index="5-2">建筑物底边平滑</el-menu-item>
          <el-menu-item index="5-2">小区理论覆盖半径计算</el-menu-item>
        </el-submenu>

        <el-submenu index="6">
          <template slot="title"><div class="el-icon-menu"></div>覆盖计算</template>
          <el-menu-item index="/index/CellRayTracing">小区覆盖计算</el-menu-item>
          <el-menu-item index="/index/CellCoverageLayerRefresh">小区覆盖图层刷新</el-menu-item>
          <el-menu-item index="/index/AreaCoverageComputation">区域覆盖计算</el-menu-item>
          <el-menu-item index="/index/AreaCoverageLayerRefresh">区域覆盖图层刷新</el-menu-item>
        </el-submenu>

        <el-submenu index="7">
          <template slot="title"><div class="el-icon-menu"></div>网内干扰分析</template>
          <el-menu-item index="/index/InternalInterferenceAnalysis">网内干扰分析</el-menu-item>
          <el-menu-item index="/index/InternalInterferenceLayerRefresh">网内干扰图层刷新</el-menu-item>
        </el-submenu>

        <el-submenu index="8">
          <template slot="title"><div class="el-icon-menu"></div>网外干扰源定位</template>
<!--          <el-menu-item index="/index/ExtraInterferenceLoc">网外干扰定位</el-menu-item>-->
<!--          <el-menu-item index="/index/InterferenceRayRecord">网外干扰定位射线记录</el-menu-item>-->
          <el-menu-item index="/index/DTDataProcess">路测数据预处理</el-menu-item>
          <el-menu-item index="/index/PointSelected">反向跟踪点选取</el-menu-item>
          <el-menu-item index="/index/GeneratedRays">信号反向跟踪</el-menu-item>
          <el-menu-item index="/index/AnalysisLoc">网外干扰源定位</el-menu-item>
          <el-menu-item index="/index/RankLoc">基于排序模型的网外干扰源定位</el-menu-item>
        </el-submenu>

        <el-submenu index="9">
          <template slot="title"><div class="el-icon-menu"></div>系数校正</template>
          <el-menu-item index="/index/RayRecord">系数校正射线记录</el-menu-item>
          <el-menu-item index="/index/CoefficientCorrection">系数校正</el-menu-item>
        </el-submenu>

        <el-submenu index="10">
          <template slot="title"><div class="el-icon-menu"></div>图层刷新</template>
          <el-menu-item index="/index/DTRefresh">路测图层刷新</el-menu-item>
          <el-menu-item index="/index/SPRefresh">选点图层刷新</el-menu-item>
          <el-menu-item index="10-1">小区图层</el-menu-item>
        </el-submenu>

        <el-submenu index="11" style="padding-left: 6%">
          <template slot="title"><div class="el-icon-user-solid"></div>admin</template>
          <el-menu-item index="11-1">个人信息</el-menu-item>
          <el-menu-item index="11-2">退出登录</el-menu-item>
        </el-submenu>

      </el-menu>
    </div>
    <div v-show="showMap">
      <!--      组件缓存-->
      <keep-alive>
        <planeMap></planeMap>
      </keep-alive>
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import planeMap from './map_show/planeMap'

  export default {
    name: 'index',
    components: {planeMap},
    data () {
      return {
        searchCriteria: '',
        showMap: true,
      }
    },
    watch: {
      '$route': 'handleSelect'
    },
    mounted () {
      // 防止直接访问地址导致显隐出错
      this.showMap = this.$route.path === '/' || this.$route.path === '/index'
    },
    methods: {
      handleSelect () {
        let path = this.$route.path

        // 选中非首页时地图组件隐藏
        this.showMap = !(path !== '/' && path !== '/index')
        /* switch(key){
            case '1-1':
              this.$router.push('/Page1');
              this.breadcrumbItems  = ['导航一']
              break;
            case '1-2':
              this.$router.push('/Page2')
              this.breadcrumbItems  = ['导航二']
              break;
            case '1-3':
              this.$router.push('/Page3')
              this.breadcrumbItems  = ['导航三']
              break;
            case '3-1':
              this.$router.push('/cov_analysis/2d_map_show')
              this.breadcrumbItems  = ['覆盖分析平面显示']
              break;
          }*/
      },
    },
  }
</script>

<style scoped>

</style>
