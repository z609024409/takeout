<template>
  <div id="list">
    <div id="content">
      <h4>添加账号</h4>
      <div class="change">
        <el-form
          label-position="right"
          label-width="120px"
          :model="addform"
          :rules="rules"
          ref="addform"
        >
          <el-form-item label="账号" prop="name">
            <el-input v-model="addform.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd" show-password>
            <el-input v-model="addform.pwd"></el-input>
          </el-form-item>
          <el-form-item label="用户组">
            <el-select v-model="addform.group" placeholder="请选择用户分组">
              <el-option label="超心悦会员" value="超心悦会员"></el-option>
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="addItem">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      addform: {
        name: "",
        group: "超心悦会员",
        pwd: "",
        id: ""
      },
      rules: {
        name: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 3, message: "账号长度在两位及以上", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, message: "密码长度至少6位", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.addform.id = this.$route.params.id;
    axios
      .get(
        "http://work.08321.org/sell/users.php?a=readOne&id=" + this.addform.id
      )
      .then(res => {
        this.addform.name = res.data.data.account;
        this.addform.group = res.data.data.userGroup;
        this.addform.pwd = res.data.data.password;
      });
  },
  methods: {
    addItem() {
      console.log(111);
      var data = {
        account: this.addform.name,
        userGroup: this.addform.group,
        id:this.addform.id
      };
      axios
        .post("http://work.08321.org/sell/users.php?a=edit", this.qs.stringify(data))
        .then(res => {
          if(res.data.code==0){
            this.$message({
              message:res.data.msg,
              type:"success"
            })
            this.$router.push('/index/account_list')
          }else{
            this.$message.error(res.data.msg);
            
          }
        });

      // this.$confirm("你将添加次账号, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.$message({
      //       type: "success",
      //       message: res.data.msg
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消添加"
      //     });
      //   });
    }
  }
};
</script>
<style scoped>
.change {
  margin-top: 20px;
}
#content .el-input {
  width: 280px;
  height: 30px;
}
.el-select > .el-input {
  display: block;
  width: 280px;
}
</style>