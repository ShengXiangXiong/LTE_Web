<template>
  <div>
        <div class="floatPage">
          <div class="title_css">
            渔网生成
          </div>
            <div class="sub_css">
              <el-button type="primary" @click="submitForm()">确定</el-button>
              <el-button type="primary" @click="jumpProgress()">查看进度</el-button>
            </div>
        </div>
  </div>
</template>
<script>
import {PostFishnet} from '@/httpConfig/api'
    export default {
        name: 'Fishnet',
        data () {
            return{}
        },
        methods: {
            submitForm() {
                console.log("test..........................");
                PostFishnet().catch(err => {
                  console.log('捕获');
                  errInfo = err;
                  // this.$message.success({message: '连接错误!'})
                });
                this.$message.success({message: '渔网任务提交成功!'})
                    // .then(response => {
                    //      console.log(response);
                    //     if (response && response.data.ok) {
                    //         this.jumpProgress();
                    //         this.$message.success({message: '渔网任务提交成功!'})
                    //      //   this.$router.push({path: '/index'})
                    //     } else {
                    //         this.$message.success({message: '渔网任务提交失败!'})
                    //    //     this.$router.push({path: '/index'})
                    //     }
                    // })

            },
            jumpProgress() {
                let routeUrl = this.$router.resolve({
                    path: "/index/taskProgress",
                });
                window.open(routeUrl.href, '_blank');
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
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
