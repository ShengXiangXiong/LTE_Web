<template>
  <div>
    <div class="floatPage">
      <div class="title_css">
        叠加分析
      </div>
      <div class="title_css">
        建筑物叠加分析
      </div>
      <div class="sub_css">
        <el-button type="primary" @click="building()">确定</el-button>
        <el-button type="primary" @click="jumpProgress()">查看进度</el-button>
      </div>
      <div class="title_css">
        水面叠加分析
      </div>
      <div class="sub_css">
        <el-button type="primary" @click="water()">确定</el-button>
        <el-button type="primary" @click="jumpProgress()">查看进度</el-button>
      </div>
      <div class="title_css">
        草地叠加分析
      </div>
      <div class="sub_css">
        <el-button type="primary" @click="grass()">确定</el-button>
        <el-button type="primary" @click="jumpProgress()">查看进度</el-button>
      </div>
    </div>
  </div>
</template>
<script>
    import {PostBuildingOverlay} from '@/httpConfig/api'
    import {PostWaterOverlay} from '@/httpConfig/api'
    import {PostGrassOverlay} from '@/httpConfig/api'
    export default {
        name: 'Overlay',
        data () {
            return{}
        },
        methods: {
            building ()
            {
              console.log(this.$store.state.sceneModelFlag);
              if(this.$store.state.sceneModelFlag)
              {
                PostBuildingOverlay();
                this.$message.success({message: '建筑物叠加分析任务提交成功!'})
              }
              else{
                this.$message.success({message: '当前有任务正在进行，请等待!'});
                console.log('当前有任务正在进行');
              }

            },
            water()
            {
              if(this.$store.state.sceneModelFlag)
              {
                PostWaterOverlay();
                this.$message.success({message: '水面叠加分析任务提交成功!'})
              }
              else{
                this.$message.success({message: '当前有任务正在进行，请等待!'});
                console.log('当前有任务正在进行');
              }

            },
            grass()
            {
              if(this.$store.state.sceneModelFlag)
              {
                PostGrassOverlay();
                this.$message.success({message: '草地叠加分析任务提交成功!'})
              }
              else{
                this.$message.success({message: '当前有任务正在进行，请等待!'});
                console.log('当前有任务正在进行');
              }

            },
            jumpProgress(){
              this.$router.push({ path: "/index/taskProgress"});
                // let routeUrl = this.$router.resolve({
                //     path: "/index/taskProgress",
                // });
                // window.open(routeUrl.href, '_blank');
            }
        }
    }

</script>

<style scoped>
  .sub_css {
    padding-top: 60px;
  }

  .sub_title_css {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
    font-size: 16px;
    padding-right: 87%;
    padding-bottom: 10px;
    padding-top: 10px;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, .12), 0 -1px 0 0 rgba(0, 0, 0, .12);
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .floatPage {
    /*border: 0px ;*/
    /*display: inline-block;*/
    padding: 10px 10px 10px 10px;
    margin: 10px 10% 10px 10%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background: #ffffff;
  }

  .title_css {
    font-size: 20px;
    padding-bottom: 20px;
  }</style>
