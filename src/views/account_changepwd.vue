<template>
  <div id="list">
    <div id="content">
      <h4>修改密码</h4>
      <div class="change">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="oldpwd">
            <el-input v-model="ruleForm.oldpwd"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="newpwd">
            <el-input type="password" v-model="ruleForm.newpwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repwd">
            <el-input type="password" v-model="ruleForm.repwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    var checkOldpwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("原密码不能为空"));
      }
      setTimeout(() => {
        if (value.length < 6) {
          callback(new Error("密码至少6位数"));
        } else {
          callback();
        }
      }, 1000);
    };
    var checkNewpwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.repwd !== "") {
          this.$refs.ruleForm.validateField("repwd");
        }
        callback();
      }
    };
    var checkRepwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newpwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldpwd: "",
        newpwd: "",
        repwd: ""
      },
      rules: {
        oldpwd: [{ validator: checkOldpwd, trigger: "blur" }],
        newpwd: [{ validator: checkNewpwd, trigger: "blur" }],
        repwd: [{ validator: checkRepwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
       this.$refs.ruleForm.validate(result => {
        if (result) {
          var oldPassword = this.ruleForm.oldpwd;
          var newPassword = this.ruleForm.newpwd;
          var id = sessionStorage.getItem("id");
          var token = sessionStorage.getItem("token");
          axios.post(
            "http://work.08321.org/sell/users.php?a=chgpwd",
            this.qs.stringify({ oldPassword, newPassword, id, token })
          ).then((res)=>{
            if(res.data.code==0){
              this.$message({
                message:"修改成功",
                type:'success'
              })
              // type:"success"
              this.$router.push('/logout')
            }else{
              this.$message.error(res.data.msg)
            }
          });
        }else{
          return false
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>
<style scoped>
.change {
  margin-top: 20px;
}
.el-input {
  width: 280px;
}
</style>