<template>
  <div id="list">
    <div id="content">
      <h4>管理员信息</h4>
      <p>
        管理员：
        <span>{{id}}</span>
      </p>
      <p>
        账号：
        <span>{{account}}</span>
      </p>
      <p>
        用户组：
        <span>{{userGroup}}</span>
      </p>
      <p>
        创建时间：
        <span>{{ctime}}</span>
      </p>
      <div class="images">
        <p>管理员头像：</p>
        <el-upload
          class="avatar-uploader"
          action="http://work.08321.org/sell/goods.php?a=uploadImg"
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
  </div>
</template>
<style scoped>
.images{
  margin-top:15px;
  display: flex;
  justify-content: flex-start;
  vertical-align: center;
}
.images p{
  margin-top: 25px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
p {
  font: 14px/3em 微软雅黑;
  border-bottom: 1px solid #eee;
  text-indent: 1em;
  color: #666;
}
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      id: "",
      account: "",
      userGroup: "",
      ctime: "",
      imgUrl: ""
    };
  },
  mounted() {
    var user = JSON.parse(sessionStorage.getItem("user"));
    // console.log(user);
    this.id = user.id;
    this.account = user.account;
    this.userGroup = user.userGroup;
    this.ctime = user.ctime;
    this.imgUrl = user.imgUrl;
  },
  methods: {
    handleAvatarSuccess(res) {
      // console.log(res);
      this.imgUrl = "http://work.08321.org" + res.data;
      axios
        .post(
          "http://work.08321.org/sell/users.php?a=chgImg",
          this.qs.stringify({ id: this.id, imgUrl: this.imgUrl })
        )
        .then(d => {
          console.log(d);
        });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>