<template>
  <div>
    <div class="floatPage">
      <div class="title_css">
        系数校正
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px">

        <div class="sub_title_css">
          路测
        </div>
        <el-form-item label="开始时间" prop="startTime">
          <el-input v-model="ruleForm.startTime"></el-input>
        </el-form-item>
        <el-form-item label="结束时间" prop="finishTime">
          <el-input v-model="ruleForm.finishTime"></el-input>
        </el-form-item>
        <el-form-item label="场景个数" prop="scenesCnt">
          <el-input v-model="ruleForm.scenesCnt"></el-input>
        </el-form-item>

        <div class="sub_title_css">
          遗传算法
        </div>
        <el-form-item label="种群大小" prop="populationSize">
          <el-input v-model="ruleForm.populationSize"></el-input>
        </el-form-item>
        <el-form-item label="遗传代数" prop="generation">
          <el-input v-model="ruleForm.generation"></el-input>
        </el-form-item>
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
    name: 'CoefficientCorrection',
    data () {
      return {
        ruleForm: {
          startTime: '2019-03-27 00:00:00',
          finishTime: '2019-03-29 00:00:00',
          scenesCnt: '3',
          populationSize: '50',
          generation: '500'
        },
        rules: {
          startTime: [
            {required: true, message: '请输入开始时间', trigger: 'blur'}
          ],
          finishTime: [
            {required: true, message: '请输入结束时间', trigger: 'blur'}
          ],
          scenesCnt: [
            {required: true, message: '请输入场景个数', trigger: 'blur'}
          ],
          populationSize: [
            {required: true, message: '请输入种群大小', trigger: 'blur'}
          ],
          generation: [
            {required: true, message: '请输入遗传代数', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/Calibration/PostCalibrate', this.ruleForm)
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
