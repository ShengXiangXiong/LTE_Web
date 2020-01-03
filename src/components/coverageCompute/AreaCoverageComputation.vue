<template>
  <div>
    <div class="floatPage">
      <div class="title_css">
        射线跟踪参数设定
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px">
        <div class="sub_title_css">
          基本参数
        </div>
        <el-form-item label="最大纬度" prop="maxLatitude">
          <el-input v-model="ruleForm.maxLatitude"></el-input>
        </el-form-item>
        <el-form-item label="最大经度" prop="maxLongitude">
          <el-input v-model="ruleForm.maxLongitude"></el-input>
        </el-form-item>
        <el-form-item label="最小纬度" prop="minLatitude">
          <el-input v-model="ruleForm.minLatitude"></el-input>
        </el-form-item>
        <el-form-item label="最小经度" prop="minLongitude">
          <el-input v-model="ruleForm.minLongitude"></el-input>
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
        <el-form-item label="建筑物棱边绕射点间隔" prop="diffPointsMargin">
          <el-input v-model="ruleForm.diffPointsMargin"></el-input>
        </el-form-item>
        <el-checkbox v-model="ruleForm.computeIndoor">计算立体覆盖</el-checkbox>
        <el-checkbox v-model="ruleForm.computeDiffrac">计算绕射</el-checkbox>

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
            <el-button type="primary" @click="refreshShp">区域图层刷新</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {AreaCoverAnalysis, PostRefreshArea3DCover, PostRefreshAreaGroundCover} from '@/httpConfig/api'

  export default {
    name: 'AreaCoverageComputation',
    data () {
      return {
        ruleForm: {
          maxLatitude: 32.258000,
          minLatitude: 32.257300,
          maxLongitude: 118.749300,
          minLongitude: 118.749250,
          incrementAngle: '70',
          threadNum: '6',
          reflectionNum: '3',
          diffractionNum: '2',
          diffPointsMargin: '3',
          computeIndoor: true,
          computeDiffrac: true,
          directCoeff: '0.3',
          reflectCoeff: '1.0',
          diffractCoeff: '1.0',
          diffractCoeff2: '1.0',
        },
        rules: {
          maxLatitude: [
            {required: true, message: '请输入最大纬度', trigger: 'blur'}
          ],
          minLatitude: [
            {required: true, message: '请输入最小纬度', trigger: 'blur'}
          ],
          maxLongitude: [
            {required: true, message: '请输入最大经度', trigger: 'blur'}
          ],
          minLongitude: [
            {required: true, message: '请输入最小经度', trigger: 'blur'}
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
          diffPointsMargin: [
            {required: true, message: '请填写建筑物棱边绕射点间隔', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            AreaCoverAnalysis(this.ruleForm).catch(err => {
              errInfo = err
            })
              .then(response => {
                if (response && response.data.ok) {
                  this.jumpProgress()
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
      jumpProgress () {
        let routeUrl = this.$router.resolve({
          path: '/index/taskProgress',
        })
        window.open(routeUrl.href, '_blank')
      },
      refreshShp () {
        PostRefreshAreaGroundCover(this.refreshName).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
        PostRefreshArea3DCover(this.refreshName).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
      },
      resetForm (formName) {
        // this.$refs[formName].resetFields()
        this.jumpProgress()
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
  }
</style>
