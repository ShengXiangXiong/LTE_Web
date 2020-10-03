<template>
  <div class="logout-container">
    <el-form :model="user" :rules="rules2"
             status-icon
             ref="user"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">系统注册</h3>
      <el-form-item prop="username">
        <el-input type="text"
                  v-model="user.userName"
                  auto-complete="off"
                  placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="user.userPwd"
                  auto-complete="off"
                  placeholder="密码"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password"
                  v-model="user.userPwd"
                  auto-complete="off"
                  placeholder="确认密码"
        ></el-input>
      </el-form-item>

      <el-form-item style="width:100%;">
        <el-button type="primary"  style="width:100%"  @click="handleLogout" >注册</el-button>
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
        user: {
          userName: '',
          userPwd: '',
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
