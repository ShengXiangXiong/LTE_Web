<template>
  <div class="logout-container">
    <el-form :model="user" :rules="rules2"
             status-icon
             ref="user"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">系统注册</h3>
      <div style="float: left"><b>请输入用户名</b></div>

      <el-form-item prop="username">

        <el-input type="text"
                  v-model="user.userName"
                  auto-complete="off"
                  placeholder="用户名"
        ></el-input>
      </el-form-item>


      <div style="float: left"><b>请输入注册邮箱</b></div>
      <el-form-item prop="userMail">
        <el-input type="text"
                  v-model="user.userMail"
                  auto-complete="off"
                  placeholder="邮箱"
        ></el-input>
      </el-form-item>

      <div style="float: left"><b>请输入密码</b></div>


      <el-form-item prop="password">
        <el-input type="password"
                  v-model="user.userPwd"
                  auto-complete="off"
                  placeholder="密码"
        ></el-input>
      </el-form-item>

      <div style="float: left"><b>请再次输入密码</b></div>


      <el-form-item prop="password">
        <el-input type="password"
                  v-model="user.userPwd"
                  auto-complete="off"
                  placeholder="确认密码"
        ></el-input>
      </el-form-item>


      <el-form-item prop="password">
        <div style="font-size:16px; float: left"><b>是否注册为管理员</b></div>
        <el-radio v-model="radio" label="1">是</el-radio>
        <el-radio v-model="radio" label="2">否</el-radio>

      </el-form-item>



      <el-form-item style="width:100%;">
        <el-button type="primary"  style="width:100%"  @click="open" >注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  //import {userLogin} from '@/httpConfig/api'

  export default {
    data(){
      return {
        //logining: false,
        radio: '1',
        user: {
          userName: '',
          userPwd: '',
          userMail: '',
        },
        rules2: {
          userName: [{required: true, message: 'please enter your account', trigger: 'blur'}],
          userPwd: [{required: true, message: 'enter your password', trigger: 'blur'}]
        },
        checked: false
      }
    },
    mounted() {
    },
    methods: {

      handleLogout()
      {

        this.$router.push('/logout')
      },

      open() {
        this.$alert('注册成功！点击确定返回登录界面', '提示信息', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/login');
          }
        });
      },

    }

  };
</script>

<!--<script>-->
<!--  export default {-->
<!--    name: 'logout'-->
<!--  }-->
<!--</script>-->

<style scoped>
  .logout-container {
    width: 100%;
    height: 100%;
  }
  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }
</style>
