<template>
  <div class="floatPage">
    <div class="title_css">
      反向跟踪点选取
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
      <el-form-item label="扫频路测版本号" prop="virname">
        <el-input  v-model="SDTForm.virname"></el-input>
      </el-form-item>
      <el-form-item label="选点个数" prop="pointNum">
        <el-input type="pointNum" v-model="SDTForm.pointNum"></el-input>
      </el-form-item>
      <el-form-item label="点间角约束" prop="AngleCons">
        <el-input type="AngleCons" v-model="SDTForm.AngleCons"></el-input>
      </el-form-item>
      <el-form-item label="点间距约束" prop="DisCons">
        <el-input type="DisCons" v-model="SDTForm.DisCons"></el-input>
      </el-form-item>
      <el-form-item label="RSRP约束" prop="RSRPCons">
        <el-input type="RSRPCons" v-model="SDTForm.RSRPCons"></el-input>
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
    import {pointSelected} from "@/httpConfig/api";

    export default {
        name: "PointSelected",
        data () {
            return {
                addLoading: false,
                SDTForm: {
                    virname:"绿建大厦中兴宏基站",
                    pointNum: '12',
                    AngleCons: '5',
                    DisCons: '150',
                    RSRPCons: '-80'
                },
                rules: {
                    virname: [
                        {required: true, message: '请输入扫频路测版本号', trigger: 'blur'}
                    ],
                    pointNum: [
                        {required: true, message: '请输入选点个数', trigger: 'blur'}

                    ],
                    AngleCons: [
                        {required: true, message: '请输入点间角约束', trigger: 'blur'}

                    ],
                    DisCons: [
                        {required: true, message: '请输入点间距约束', trigger: 'blur'}
                    ],
                    RSRPCons: [
                        {required: true, message: '请输入RSRP约束', trigger: 'blur'}
                    ]
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
                            pointSelected(para).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                //console.log(res.headers);
                                //console.log(res.data);
                                //this.$message({
                                    //message: "执行结束",
                                    //type: 'success'
                                //});
                                //this.$refs['file'].resetFields();
                                //this.$router.go(-1)
                            });
                        });
                    }
                });
            },
            cancleSubmit: function () {
                this.$refs['SDTForm'].resetFields();
                //this.$router.go(-1);
            }
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
  }</style>
