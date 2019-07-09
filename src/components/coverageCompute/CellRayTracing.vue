<template>
  <div>
    <div class="floatPage">
      <div class="title_css">
        射线跟踪参数设定
      </div>
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px" >

         <div class="sub_title_css">
           小区参数
         </div>
         <el-form-item label="小区名称" prop="cellName">
           <el-input v-model="ruleForm.cellName"></el-input>
         </el-form-item>
         <el-form-item label="覆盖半径" prop="distance">
           <el-input v-model="ruleForm.distance"></el-input>
         </el-form-item>
         <el-form-item label="覆盖角度" prop="incrementAngle">
           <el-input v-model="ruleForm.incrementAngle"></el-input>
         </el-form-item>

         <div class="sub_title_css">
           多线程参数
         </div>
         <el-form-item label="线程个数" prop="threadNum">
           <el-input v-model="ruleForm.threadNum"></el-input>
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
         <el-form-item label="建筑物棱边绕射点间隔" prop="diffPointsMargin">
           <el-input v-model="ruleForm.diffPointsMargin"></el-input>
         </el-form-item>
         <el-checkbox v-model="ruleForm.computeIndoor">计算立体覆盖</el-checkbox>
         <el-checkbox v-model="ruleForm.computeDiffrac">计算绕射</el-checkbox>

         <div class="sub_title_css">
           校正系数
         </div>
         <el-form-item label="直射校正系数" prop="directCoeff">
           <el-input v-model="ruleForm.directCoeff"></el-input>
         </el-form-item>
         <el-form-item label="反射校正系数" prop="reflectCoeff">
           <el-input v-model="ruleForm.reflectCoeff"></el-input>
         </el-form-item>
         <el-form-item label="绕射校正系数" prop="diffractCoeff">
           <el-input v-model="ruleForm.diffractCoeff"></el-input>
         </el-form-item>
         <el-form-item label="菲涅尔绕射校正系数" prop="diffractCoeff2">
           <el-input v-model="ruleForm.diffractCoeff2"></el-input>
         </el-form-item>

         <!--<div class="sub_title_css">
           手动指定范围(可选)
         </div>
           <el-form-item label="from">
             <el-input v-model="ruleForm.fromAngle"></el-input>
           </el-form-item>
           <el-form-item label="to">
             <el-input v-model="ruleForm.toAngle"></el-input>
           </el-form-item>

         <div class="sub_title_css">
           大区域分批计算(可选)
         </div>
         <el-form-item label="总批数" prop="batchNum">
           <el-input v-model="ruleForm.batchNum"></el-input>
         </el-form-item>
         <el-form-item label="当前是第" prop="currBatch">
           <el-input v-model="ruleForm.currBatch"></el-input>
         </el-form-item>
         <el-checkbox v-model="ruleForm.reRay">分批计算后，二次投射</el-checkbox>
         <el-checkbox v-model="ruleForm.mergePwr">分批计算后，栅格场强合并</el-checkbox>-->

         <div class="sub_css">
           <el-form-item>
             <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
             <el-button @click="resetForm('ruleForm')">重置</el-button>
           </el-form-item>
         </div>

       </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'CellRayTracing',
    data () {
      return {
        ruleForm: {
          cellName: 'DQVJTX2',
          distance: '1000',
          incrementAngle: '65',
          threadNum: '3',
          reflectionNum: '3',
          diffractionNum: '2',
          diffPointsMargin: '3',
          directCoeff: '0.3',
          reflectCoeff: '1.0',
          diffractCoeff: '1.0',
          diffractCoeff2: '1.0',
          // checked: true,
          // computeIndoor: true,
          // computeDiffrac: true,
          // fromAngle: '0',
          // toAngle: '130',
          // batchNum: '2',
          // currBatch: '1',
          // reRay: false,
          // mergePwr: false
        },
        rules: {
          cellName: [
            {required: true, message: '请输入小区名称', trigger: 'blur'}
          ],
          distance: [
            {required: true, message: '请填写覆盖半径', trigger: 'blur'}
          ],
          incrementAngle: [
            {
              required: true,
              message: '说明：1.假设天线方位角θ=300°，覆盖角度δ=70°，则计算的覆盖范围为230°至10°（正北方向为0°）。\n' +
                '           2.对于扇区，建议δ≤70°。',
              trigger: 'blur'
            }
          ],
          threadNum: [
            {required: true, message: '请填写线程个数', trigger: 'blur'}
          ],
          reflectionNum: [
            {required: true, message: '请填写反射次数', trigger: 'blur'}
          ],
          diffractionNum: [
            {required: true, message: '请填写绕射次数', trigger: 'blur'}
          ],
          diffPointsMargin: [
            {required: true, message: '请填写建筑物棱边绕射点间隔', trigger: 'blur'}
          ],
          directCoeff: [
            {required: true, message: '请填写直射校正系数', trigger: 'blur'}
          ],
          reflectCoeff: [
            {required: true, message: '请填写反射校正系数', trigger: 'blur'}
          ],
          diffractCoeff: [
            {required: true, message: '请填写绕射校正系数', trigger: 'blur'}
          ],
          diffractCoeff2: [
            {required: true, message: '请填写菲涅尔绕射校正系数', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/CellRayTracing/PostRayTracing', this.ruleForm)
              .then(response => {
                if (response && response.data.ok) {
                  this.$router.push({
                    path: '/index'
                  })
                }
              })
            this.$message.success({message: '任务提交成功!'})
          } else {
            this.$message.error({
              message: 'submit fail'
            })
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>
  .sub_css{
    padding-top: 60px;
  }
  .sub_title_css{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
    font-size: 16px;
    padding-right: 87%;
    padding-bottom: 10px;
    padding-top: 10px;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, .12), 0 -1px 0 0 rgba(0, 0, 0, .12);
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .floatPage{
    /*border: 0px ;*/
    /*display: inline-block;*/
    padding: 10px 10px 10px 10px;
    margin: 10px 10% 10px 10%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background: #ffffff;
  }
  .title_css{
    font-size: 20px;
    padding-bottom: 20px;
  }</style>
