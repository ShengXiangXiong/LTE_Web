<template>
  <div class="floatPage">
    <div class="title_css">
      选点图层刷新
    </div>
    <el-form
      ref="SDTForm"
      :model="SDTForm"
      :rules="rules"
      label-width="150px"
      type="flex"
      justify="center"
      border
      style="margin:10px 10% 10px 10%;;min-width:600px;"
    >
      <el-form-item label="对应路测数据版本号" prop="version">
        <el-input  v-model="SDTForm.version"></el-input>
      </el-form-item>
        <el-button
          type="primary"
          @click="addSubmit()"
          :loading="addLoading"
        >提交</el-button>
        <el-button @click="cancleSubmit()">重置</el-button>
    </el-form>
  </div>
</template>

<script>
    import {RefreshSPLayer} from "@/httpConfig/api";

    export default {
        name: "SPRefresh",
        data () {
            return {
                addLoading: false,
                SDTForm: {
                    version:"Test_v5"
                },
                rules: {

                }
            }
        },
        methods: {
            addSubmit: function () {
                this.$refs.SDTForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = this.SDTForm;
                            console.log(this.SDTForm);
                            RefreshSPLayer(para).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                //console.log(res.headers);
                                //console.log(res.data);
                                this.$message({
                                    message: "执行结束",
                                    type: 'success'
                                });
                                //this.$refs['file'].resetFields();
                                //this.$router.go(-1)
                            });
                            //this.jumpProgress();
                        });
                    }
                });
            },
            cancleSubmit: function () {
                this.$refs['SDTForm'].resetFields();
                //this.$router.go(-1);
            },
            jumpProgress(){
                // let routeUrl = this.$router.resolve({
                //     path: "/index/taskProgress",
                // });
                // window.open(routeUrl.href, '_blank');
                this.$router.push({ path: "/index/taskProgress"});
            },
        }
    }
</script>

<style scoped>
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
  }
</style>
