<template>
  <div>
    <div class="floatPage">
      <div class="title_css">
        网格划分
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px">

        <div class="sub_title_css">
          名称
        </div>
        <el-form-item label="网格名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <div class="sub_title_css">
          范围
        </div>
        <el-form-item label="最小经度" prop="minLongitude">
          <el-input v-model="ruleForm.minLongitude"></el-input>
        </el-form-item>
        <el-form-item label="最小纬度" prop="minLatitude">
          <el-input v-model="ruleForm.minLatitude"></el-input>
        </el-form-item>
        <el-form-item label="最大经度" prop="maxLongitude">
          <el-input v-model="ruleForm.maxLongitude"></el-input>
        </el-form-item>
        <el-form-item label="最大纬度" prop="maxLatitude">
          <el-input v-model="ruleForm.maxLatitude"></el-input>
        </el-form-item>

        <div class="sub_title_css">
          大小
        </div>
        <el-form-item label="网格边长" prop="sideLength">
          <el-input v-model="ruleForm.sideLength"></el-input>
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
    name: 'GridDivision',
    data () {
      return {
        ruleForm: {
          name: 'zsgrid30',
          minLongitude: '118.724060',
          minLatitude: '32.006110',
          maxLongitude: '118.806605',
          maxLatitude: '32.089630',
          sideLength: '5'
        },
        rules: {
          name: [
            {required: true, message: '请输入网格名称', trigger: 'blur'}
          ],
          minLongitude: [
            {required: true, message: '请输入最小经度', trigger: 'blur'}
          ],
          minLatitude: [
            {required: true, message: '请输入最小纬度', trigger: 'blur'}
          ],
          maxLongitude: [
            {required: true, message: '请输入最大经度', trigger: 'blur'}
          ],
          maxLatitude: [
            {required: true, message: '请输入最大纬度', trigger: 'blur'}
          ],
          sideLength: [
            {required: true, message: '请输入网格边长', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/api/Grid/PostGrid', this.ruleForm)
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
