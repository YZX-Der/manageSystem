<template>
  <div class="register">
    <div class="register-left">
      Welcome! <br>
      注册XXXXXXXXXXXXX系统
    </div>
    <div class="register-right">
      <div>注册</div>
      <div>
        <el-form :model="registerForm" :rules="registerRules" ref="registerForm">
          <el-form-item label="账号" prop="userName" style="margin-top: -15px;width: 250px">
            <el-input placeholder="请输入账号(6-12位字符)" v-model="registerForm.userName" @keyup.enter.native="registerClick('registerForm')" prefix-icon="el-icon-user" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="margin-top: -15px;width: 250px">
            <el-input placeholder="请输入密码" v-model="registerForm.password" @keyup.enter.native="registerClick('registerForm')" prefix-icon="el-icon-lock" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword" style="margin-top: -15px;width: 250px">
            <el-input placeholder="请再次输入密码" v-model="registerForm.checkPassword" @keyup.enter.native="registerClick('registerForm')" prefix-icon="el-icon-lock" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="registerClick('registerForm')" :disabled="isCompleted">注册</el-button>
            <a href="javascript:void(0)" @click="returnLogin">返 回 登 录</a>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="Successdialog"
      :show-close= false
      :close-on-click-modal= false
      :close-on-press-escape= false
      width="30%" center>
    <span style="font-size:18px;">注册成功，{{count}}秒后跳转到登录界面。</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelLogin" type="primary" plain :disabled="isDisabled">取消</el-button>
      <el-button @click="returnLogin" type="primary" :disabled="isDisabled">立即跳转</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data(){
      return{
        Successdialog: false,
        isDisabled: false,
        registerForm: {
          userName: '',
          password: '',
          checkPassword: ''
        },
        registerRules: {
          userName: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
          ],
          checkPassword: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { validator: (rule, value, callback)=>{
                if (value === '') {
                  callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                  callback(new Error('两次输入密码不一致!'));
                } else {
                  callback();
                }
              }, trigger: 'blur' }
          ]
        },
        checkedPassword: false,
        count: 5,
        timer: null
      }
    },
    computed: {
      isCompleted(){
        return (!this.registerForm.userName) || (!this.registerForm.password) || (!this.registerForm.checkPassword)
            || (this.registerForm.userName.length < 6 || this.registerForm.userName.length > 12)
            || (this.registerForm.password.length < 6 || this.registerForm.password.length > 8)
            || (this.registerForm.checkPassword.length < 6 || this.registerForm.checkPassword.length > 8)
      }
    },
    methods: {
      registerClick(formName){
        console.log(this.registerForm);
        console.log(formName);
        if (this.registerForm.password == this.registerForm.checkPassword){
          this.Successdialog = true
          this.timer = setInterval(()=>{
            if (this.count > 0){
              this.count--
            } else {
              window.clearInterval(this.timer)
              this.timer = null
              this.returnLogin()
            }
          },1000)
        }
      },
      cancelLogin(){
        this.Successdialog = false
        window.clearInterval(this.timer)
        this.timer = null
        this.count = 5
      },
      returnLogin(){
        this.$router.replace({path:'/login',query:{userName:this.registerForm.userName}})
      }
    }
  }
</script>

<style>

  .register {
    background: url("../../assets/images/login/login.jpg") no-repeat;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  .register-left {
    width: 650px;
    height: 200px;
    display: flex;
    color: #ececec;
    align-items: center;
    font-size: 50px;
  }

  .register-right {
    background:rgba(255,255,255,0.65);
    border-radius: 20px;
    box-shadow: 0 0 25px #cac6c6;
    width: 400px;
    height: 500px;
    margin-left: -250px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    color: gray;
    font-size: 35px;
  }

</style>