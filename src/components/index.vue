<template>
  <div style="background-color: #EBEBEB;min-height:800px">
    <div style="width:100%;background-color: #636363; overflow: hidden">
            <span class="demonstration" style="float:left;padding-top:10px;color:white;margin-left:1%">
                网站首页
            </span>
      <span class="demonstration" style="float:left;padding:5px;color:white;margin-left:2%;width:15%">
                <el-input
                  placeholder="请输入"
                  icon="search"
                  v-model="searchCriteria"
                  :on-icon-click="handleIconClick">
                </el-input>
            </span>
      <span class="demonstration" style="float:right;padding-top:10px;margin-right:1%">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link" style="color:white">
                    admin<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </span>
    </div>

    <div style="margin-top:5px">
      <el-row :gutter="10">
        <el-col :xs="4" :sm="4" :md="4" :lg="4">
          <div>
            <el-menu default-active="1" class="el-menu-vertical-demo" style="min-height:800px" router>
              <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>项目管理</template>
                <el-menu-item index="1-1">项目删除</el-menu-item>
                <el-menu-item index="1-2">项目创建</el-menu-item>
                <el-menu-item index="1-3">项目查询</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>数据管理</template>
                <el-menu-item index="/index/CellRayTracing">数据导入</el-menu-item>
                <el-menu-item index="2-2">数据导出</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title"><i class="el-icon-setting"></i>覆盖分析</template>
                <el-menu-item index="/index/2d_map">2D展示</el-menu-item>
                <el-menu-item index="3-2">3D展示</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="20">
<!--          <div>-->
<!--            <div style="border: 1px solid #A6A6A6; border-radius:6px; padding:5px; margin:2px; background-color: white">-->
<!--              <el-breadcrumb separator="/">-->
<!--                <el-breadcrumb-item v-for="item in breadcrumbItems">{{item}}</el-breadcrumb-item>-->
<!--              </el-breadcrumb>-->
<!--            </div>-->
<!--          </div>-->

          <div style="margin-top:10px">
            <router-view/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name:'index',
    data(){
      return {
        searchCriteria: '',
      }
    },
    methods:{
      handleIconClick(ev) {
        console.log(ev);
      },

      handleSelect(key, keyPath){
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
