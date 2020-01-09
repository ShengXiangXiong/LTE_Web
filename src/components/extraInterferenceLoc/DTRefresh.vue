<template>
  <div class="floatPage">
    <div class="title_css">
      指定路测参数[可选]
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
      <el-form-item label="扫频路测版本号" prop="version">
        <el-input  v-model="SDTForm.version"></el-input>
      </el-form-item>
      <el-form-item label="路测数据与基站距离" prop="distance">
        <el-input type="pointNum" v-model="SDTForm.distance"></el-input>
      </el-form-item>
      <el-form-item label="根据范围获取路测：最小地理x坐标" prop="minx">
        <el-input type="AngleCons" v-model="SDTForm.minx"></el-input>
      </el-form-item>
      <el-form-item label="根据范围获取路测：最小地理y坐标" prop="miny">
        <el-input type="DisCons" v-model="SDTForm.miny"></el-input>
      </el-form-item>
      <el-form-item label="根据范围获取路测：最大地理x坐标" prop="maxx">
        <el-input type="RSRPCons" v-model="SDTForm.maxx"></el-input>
      </el-form-item>
      <el-form-item label="根据范围获取路测：最大地理y坐标" prop="maxy">
        <el-input type="RSRPCons" v-model="SDTForm.maxy"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button
          type="primary"
          @click="addSubmit()"
          :loading="addLoading"
        >提交</el-button>
        <el-button @click="cancleSubmit()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import {RefreshDTLayer} from "@/httpConfig/api";

    export default {
        name: "DTRefresh",
        data () {
            return {
                addLoading: false,
                SDTForm: {
                    version:"绿建大厦中兴宏基站",
                    distance: '0',
                    minx: '0',
                    miny: '0',
                    maxx: '0',
                    maxy: '0'
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
                            RefreshDTLayer(para).then((res) => {
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
                            this.jumpProgress();
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
