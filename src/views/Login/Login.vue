<template>
  <div class="login">
    <div class="login-left">
      Welcome! <br>
      登录XXXXXXXXXXXXX系统
    </div>
    <div class="login-right">
      <div>账号登陆</div>
      <div>
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
          <el-form-item prop="userName">
            <el-input placeholder="请输入账号" v-model="loginForm.userName" @keyup.enter.native="loginClick('loginForm')" prefix-icon="el-icon-user" clearable></el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input placeholder="请输入密码" v-model="loginForm.password" @keyup.enter.native="loginClick('loginForm')" prefix-icon="el-icon-lock" show-password></el-input>
          </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checkedPassword" style="margin-right: 100px">记住密码</el-checkbox>
              <a href="javascript:void(0)">忘记密码?</a>
            </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="loginClick('loginForm')" :disabled="isCompleted">登录</el-button>
            <a href="javascript:void(0)" @click="registerClick">注 册</a>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data(){
      return{
        loginForm: {
          userName: '',
          password: '',
        },
        loginRules: {
          userName: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
          ]
        },
        checkedPassword: false
      }
    },
    computed:{
      isCompleted(){
        return (!this.loginForm.userName) || (!this.loginForm.password)
        || (this.loginForm.userName.length < 6 || this.loginForm.userName.length > 12)
        || (this.loginForm.password.length < 6 || this.loginForm.password.length > 8)
      }
    },
    //页面加载调用获取cookie值
    created() {
      this.getCookie()
    },
    methods: {
      loginClick(formName){
        let date = new Date()
        let dateString = date.toLocaleDateString().split('/')
        let dateTime = dateString[0]+'-'+(dateString[1]>=10?dateString[1]:'0'+dateString[1])+'-'+
            (dateString[2]>=10?dateString[2]:'0'+dateString[2])+' '+(date.getHours()>=10?date.getHours():'0'+date.getHours())+':'+
            (date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes())+':'+
            (date.getSeconds()>=10?date.getSeconds():'0'+date.getSeconds())
        const info = {dateTime:dateTime,userName:this.loginForm.userName}
        if (this.isCompleted){
          this.$message({
            showClose: true,
            message: '账号或密码不能为空',
            type: 'error'
          });
        } else if (this.checkedPassword == true){
          console.log(this.loginForm)
          console.log("checked == true"+formName)
          //传入账号名，密码，和保存天数3个参数
          this.setCookie(this.loginForm.userName, this.loginForm.password, 7)
          this.$store.commit('getInfo',info)
          this.$router.replace({path:'/main'})
        } else {
          console.log("清空Cookie");
          //清空Cookie
          this.clearCookie();
          this.$store.commit('getInfo',info)
          this.$router.replace({path:'/main'})
        }
      },
      registerClick(){
        this.$router.push({path:'/register'})
      },
      //读取cookie
      getCookie() {
        if (this.$route.query.userName != ''){
          this.loginForm.userName = this.$route.query.userName
        }else {
          this.$router.push({path:'/login'})
        }
        if (document.cookie.length > 0) {
          this.checkedPassword = true
          //这里显示的格式需要切割一下自己可输出看下
          let arr = document.cookie.split('; ');
          for (let i = 0; i < arr.length; i++) {
            //再次切割
            let arr2 = arr[i].split('=');
            //判断查找相对应的值
            if (arr2[0] == 'userName') {
              //保存到保存数据的地方
              this.loginForm.userName = arr2[1];
            } else if (arr2[0] == 'password') {
              this.loginForm.password = arr2[1];
            }
          }
        }
      },
      //设置cookie
      setCookie(c_name, c_pwd, exdays) {
        //获取时间
        let exdate = new Date();
        //保存的天数
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      },
      //清除cookie
      clearCookie() {
        //修改2值都为空，天数为负1天就好了
        this.setCookie("", "", -1);
      }
    }
  }
</script>

<style>

  .login {
    background: url("../../assets/images/login/login.jpg") no-repeat;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  .login-left {
    width: 650px;
    height: 200px;
    display: flex;
    color: #ececec;
    align-items: center;
    font-size: 50px;
  }

  .login-right {
    background:rgba(255,255,255,0.08);
    border-radius: 20px;
    box-shadow: 0 0 25px #cac6c6;
    width: 400px;
    height: 500px;
    margin-left: -250px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: #ececec;
    font-size: 35px;
  }

</style>