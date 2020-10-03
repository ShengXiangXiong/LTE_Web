<template>
  <div>
    <div class="floatPage">
      <div class="title_css">
        信号传播路径生成
      </div>
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="200px"
               type="flex"
               justify="center"
               border
               style="margin:10px 20% 10px 20%;;min-width:600px;">

        <div class="sub_title_css">
          反向跟踪参数
        </div>
        <el-form-item label="扫频路测版本号" prop="virsource">
          <el-input v-model="ruleForm.virsource"></el-input>
        </el-form-item>
        <el-form-item label="覆盖角度" prop="incrementAngle">
          <el-input v-model="ruleForm.incrementAngle"></el-input>
        </el-form-item>

        <div class="sub_title_css">
          射线跟踪控制参数
        </div>
        <el-form-item label="反射次数" prop="reflectionNum">
          <el-input v-model="ruleForm.reflectionNum"></el-input>
        </el-form-item>
        <el-form-item label="绕射次数" prop="diffractionNum">
          <el-input v-model="ruleForm.diffractionNum"></el-input>
        </el-form-item>
        <el-form-item label="建筑物棱边绕射点间隔" prop="sideSplitUnit">
          <el-input v-model="ruleForm.sideSplitUnit"></el-input>
        </el-form-item>

        <div type="flex" justify="center">
          <el-form-item>
            <el-button type="primary" @click="submitForm()" :loading="addLoading">确定</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
    import {generateRayLoc} from "@/httpConfig/api";

    export default {
        name: "GeneratedRays",
        data()
        {
            return {
                addLoading: false,
                ruleForm:{
                    virsource:"Test_v5",
                    incrementAngle:'50',
                    reflectionNum:'3',
                    diffractionNum:'2',
                    sideSplitUnit:'3',
                },
                rules: {
                    virsource: [
                        {required: true, message: '请输入小区名称', trigger: 'blur'}
                    ],
                    incrementAngle: [
                        {
                            required: true,
                            message: '说明：1.假设天线方位角θ=300°，覆盖角度δ=70°，则计算的覆盖范围为230°至10°（正北方向为0°）。\n' +
                                '           2.对于扇区，建议δ≤70°。',
                            trigger: 'blur'
                        }
                    ],
                    reflectionNum: [
                        {required: true, message: '请填写反射次数', trigger: 'blur'}
                    ],
                    diffractionNum: [
                        {required: true, message: '请填写绕射次数', trigger: 'blur'}
                    ],
                    sideSplitUnit: [
                        {required: true, message: '请填写建筑物棱边绕射点间隔', trigger: 'blur'}
                    ],
                }
            }
        },
        methods:{
            submitForm: function () {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认开始计算吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let para = this.ruleForm;
                            //console.log(this.SDTForm);
                            generateRayLoc(para).catch((err) => {
                                console.log(err);
                                this.addLoading = false;
                            }).then((res) => {
                                //console.log(res.data);
                                this.addLoading = false;
                            });
                            this.jumpProgress();
                        });
                    }
                });
            },
            resetForm: function () {
                this.$refs['ruleForm'].resetFields();
                //this.$router.go(-1);
            },
            jumpProgress(){
                let routeUrl = this.$router.resolve({
                    path: "/index/taskProgress",
                });
                window.open(routeUrl.href, '_blank');
            },
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
    padding-right: 80%;
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
