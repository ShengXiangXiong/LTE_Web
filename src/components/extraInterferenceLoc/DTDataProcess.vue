<template>
  <div class="floatPage">
    <div class="title_css">
      路测数据预处理
    </div>
    <el-button
      type="primary"
      @click="preProcessSubmit()"
    >提交</el-button>

    <br><br>
    <br><br>
    <div class="title_css">
      RSRP计算
    </div>
    <el-form
      ref="RSRPForm"
      :model="RSRPForm"
      :rules="rules"
      label-width="150px"
      type="flex"
      justify="center"
      border
      style="margin:10px 10% 10px 10%;;min-width:600px;"
    >
      <el-form-item label="命名干扰源名称" prop="sourceName">
        <el-input  v-model="RSRPForm.sourceName"></el-input>
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
  import {AnalysisLoc} from "@/httpConfig/api";


  export default {
    name: "DTDataProcess",
    data () {
      return {
        addLoading: false,
        RSRPForm: {
          sourceName:"2",
        },
        rules: {
          sourceName: [
            {required: true, message: '请输入干扰源名称', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      preProcessSubmit(){

      },

      addSubmit: function () {
        this.$refs.RSRPForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = this.RSRPForm;
              console.log(this.RSRPForm);


              AnalysisLoc(para).then((res) => {                     // ！这里要改api
                this.addLoading = false;

              });


            });
          }
        });
      },
      cancleSubmit: function () {
        this.$refs['RSRPForm'].resetFields();
        //this.$router.go(-1);
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
  }</style>

