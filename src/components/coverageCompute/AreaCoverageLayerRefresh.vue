<template>
  <div>
    <div class="floatPage">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px">
        <div class="sub_title_css">
          区域范围
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

        <div class="sub_css">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">区域图层刷新</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {PostRefreshArea3DCover, PostRefreshAreaGroundCover} from '@/httpConfig/api'

  export default {
    name: 'AreaCoverageLayerRefresh',
    data () {
      return {
        ruleForm: {
          maxLatitude: 32.258000,
          minLatitude: 32.257300,
          maxLongitude: 118.749300,
          minLongitude: 118.749250,
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
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            PostRefreshAreaGroundCover(this.ruleForm).catch(err => {
              errInfo = err
            })
              .then(response => {
                if (response && response.data.ok) {
                  // this.jumpProgress();
                }
              })
            PostRefreshArea3DCover(this.ruleForm).catch(err => {
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

