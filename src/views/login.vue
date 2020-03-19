<template>
  <div id="login">
    <div class="login_from">
      <h3>系统登录</h3>
      <el-form ref="loginForm" :model="loginForm" :rules="rules">
        <el-form-item prop="name">
          <el-input v-model="loginForm.name" clearable prefix-icon="el-icon-s-custom"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="loginForm.pwd" show-password prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      loginForm: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入正确的用户名", trigger: "blur" },
          { min: 2, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, message: "密码长度必须6位以上", trigger: "blur" }
        ]
      }
    };
  },
  created(){
    // this.keydownSubmit()
    let that=this;
    document.onkeydown=function(e){
      var keycode=document.all?event.keyCode:e.which;
      // var key=window.event.keyCode;
      if(keycode==13){
      // if(key==13){
        that.onSubmit();
        return false
      }
    }
  },
  methods: {
  //  keydownSubmit(){
  //  document.onkeydown=(()=>{
  //    var key=window.event.keyCode;
  //    if(key==13){
  //      this.onSubmit();
  //    }
  //  })
  //  },
    onSubmit() {
      // var that = this;
      this.$refs.loginForm.validate(result => {
        if (result) {
          var status={account:this.loginForm.name,password:this.loginForm.pwd};
          // var account = this.loginForm.name;
          // var password = this.loginForm.pwd;
          axios.post(
              "http://work.08321.org/sell/users.php?a=login",
              qs.stringify(status),
            )
            // 'account='+account+'&password='+password
            .then(res => {
              if (res.data.code == 0) {
                // location.href="#/index"
                sessionStorage.setItem("token",res.data.token);
                sessionStorage.setItem("id",res.data.data.id);
                sessionStorage.setItem('user',JSON.stringify(res.data.data))
                // localStorage.setItem('res',res);
                // console.log(localStorage.setItem('data',res));
                this.$router.push("/index");
                this.$message({
                  message: '恭喜你，登录成功',
                  type:'success',
                });
              } else {
                this.$message.error(res.data.msg);
                return false
              }
            });
        }
      });
    }
  }
};
</script>
<style scoped>
/*  */
#login {
  text-align: center;
  background: #2d3a4d;
  display: flex;
  justify-content: center;
  align-items: center;
}
h3 {
  color: #fff;
  text-align: center;
  font: 20px/2em 微软雅黑;
  padding-bottom: 20px;
}
.login_from {
  width: 400px;
}
.el-button--primary {
  width: 100%;
}
</style>