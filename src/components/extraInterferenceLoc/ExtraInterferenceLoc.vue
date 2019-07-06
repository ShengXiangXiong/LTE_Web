<template>
  <div>
    <div class="floatPage">
      <div class="title_css">
        网外干扰定位
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px">

        <div class="sub_title_css">
          干扰范围
        </div>
        <el-form-item label="最小经度" prop="minLongtitude">
          <el-input v-model="ruleForm.minLongitude"></el-input>
        </el-form-item>
        <el-form-item label="最小维度" prop="minLatitude">
          <el-input v-model="ruleForm.minLatitude"></el-input>
        </el-form-item>
        <el-form-item label="最大经度" prop="maxLongtitude">
          <el-input v-model="ruleForm.maxLongtitude"></el-input>
        </el-form-item>
        <el-form-item label="最大纬度" prop="maxLatitude">
          <el-input v-model="ruleForm.maxLatitude"></el-input>
        </el-form-item>

        <div class="sub_title_css">
          干扰源推断
        </div>

        <div class="sub_css">
          <el-form-item>
            <el-button type="primary" @click="submitFormToCompress('ruleForm')">启发式规则压缩干扰源区域</el-button>
            <el-button type="primary" @click="submitFormToEstimate('ruleForm')">评估干扰源候选位置</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>

      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ExtraInterferenceLoc',
    data () {
      return {
        ruleForm: {
          minLongitude: '118.767240',
          minLatitude: '32.010461',
          maxLongtitude: '118.801740',
          maxLatitude: '32.062886'
        },
        rules: {
          minLongtitude: [
            {required: true, message: '请输入最小经度', trigger: 'blur'}
          ],
          minLatitude: [
            {required: true, message: '请输入最小纬度', trigger: 'blur'}
          ],
          maxLongtitude: [
            {required: true, message: '请输入最大经度', trigger: 'blur'}
          ],
          maxLatitude: [
            {required: true, message: '请输入最大纬度', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitFormToCompress (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/ExtraInterferenceLoc/PostCompress', this.ruleForm)
              .then(response => {
                if (response.ok) {
                  this.$message({
                    message: '启发式规则压缩干扰源区域完成！',
                    type: 'success' + response.msg
                  })
                  this.$router.push({
                    path: '/index'
                  })
                } else {
                  this.$message({
                    message: '启发式规则压缩干扰源区域失败！',
                    type: 'fail' + response.msg
                  })
                }
              })
              .catch(error => {
                this.$message({
                  message: '请求失败！',
                  type: 'error' + response.msg
                })
              })
          } else {
            this.$message({
              message: 'submit fail'
            })
            return false
          }
        })
      },
      submitFormToEstimate (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/ExtraInterferenceLoc/PostEstimate', this.ruleForm)
              .then(response => {
                if (response.ok) {
                  this.$message({
                    message: '评估干扰源候选位置完成！',
                    type: 'success' + response.msg
                  })
                  this.$router.push({
                    path: '/index'
                  })
                } else {
                  this.$message({
                    message: '评估干扰源候选位置失败！',
                    type: 'fail' + response.msg
                  })
                }
              })
              .catch(error => {
                this.$message({
                  message: '请求失败！',
                  type: 'error' + response.msg
                })
              })
          } else {
            this.$message({
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
