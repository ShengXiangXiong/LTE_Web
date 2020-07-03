<template>
  <div class="login-container">
    <el-form :model="user" :rules="rules2"
             status-icon
             ref="user"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">系统登录</h3>
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
      <el-checkbox
        v-model="checked"
        class="rememberme"
      >记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:40%; float: left"  @click="handleSubmit" :loading="logining">登录</el-button>
        <el-button type="primary" style="width:40%; float: right" @click="logout" :loading="logining">注册</el-button>

      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import {userLogin} from '@/httpConfig/api'

  export default {
    data(){
      return {
        logining: false,
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
      handleSubmit (event) {
        this.$refs.user.validate((valid) => {
          if(valid){
            this.login()
          }else{
            this.logining = false;
            console.log('error submit!');
            return false;
          }
        })
      },

      logout () {
        this.$router.push({ path: '/logout' })
      },

      async login () {
        this.logining = true;
        let resp = null;
        let errInfo = null;
        resp = await userLogin(this.user).catch(err => {errInfo = err;});
        if(resp && resp.data.ok===true){
          let data = resp.data;
          this.$store.commit('login', data.obj);
          window.localStorage.setItem('token', data.token)
          let path = this.$route.query.redirect;
          //replace也是用于页面跳转，只是不将当前路径记录到history中（登录页面），当点击后退时，返回上上一个页面，所以这在登录页面时常用
          this.$router
            .replace({path: path === '/' || path === undefined ? '/index' : path});
        }
/*        if (!res) {
          Message.error("请求失败"+errInfo)
        }else {
          console.log(res.data);
          if(res.data.ok===true){
            Message.success("登陆成功"+res);
          }else{
            Message.error("用户名或密码错误，请重试")
          }
        }*/
        this.logining = false;
      }
    }
  };
</script>

<style scoped>
  .login-container {
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
