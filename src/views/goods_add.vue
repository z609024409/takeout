<template>
  <div id="list">
    <div id="content">
      <h4>添加商品</h4>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择商品分类">
            <el-option label="值钱商品" value="1"></el-option>
            <el-option label="不值钱的" value="2"></el-option>
            <el-option label="爆炒瓜子" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品特色" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="新品上市" name="type"></el-checkbox>
            <el-checkbox label="第二单半价" name="type"></el-checkbox>
            <el-checkbox label="主打产品" name="type"></el-checkbox>
            <el-checkbox label="火爆产品" name="type"></el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="祖产手艺" name="type"></el-checkbox>
            <el-checkbox label="源自四川" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 上传图片部分 -->
        <el-form-item label="上传图片" prop="resource">
          <el-upload
            class="avatar-uploader"
            action="http://work.08321.org/sell/goods.php?a=uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="是否促销" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="促销"></el-radio>
            <el-radio label="不促销"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="食品规格" prop="resource1">
          <el-radio-group v-model="ruleForm.resource1">
            <el-radio label="单规格"></el-radio>
            <el-radio label="多规格"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="包装费">
          <el-input-number v-model="ruleForm.num1" @change="handleChange" label="描述文字" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="ruleForm.num2" @change="handleChange" label="描述文字" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      // 费用
      // num1: 1,
      // num2: 1,
      // 图片框
      ruleForm: {
        name: "",
        region: "爆炒瓜子",
        date1: "",
        date2: "",
        delivery: false,
        type: ["第二单半价", "源自四川"],
        resource: "促销",
        resource1: "单规格",
        desc: "",
        num1: 2,
        num2: 10,
        imageUrl: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var status = {
            goodsname: this.ruleForm.name,
            goodscategory: this.ruleForm.region,
            goodsfeature: this.ruleForm.type.join(""),
            imgUrl: this.ruleForm.imageUrl,
            isPromotion: this.ruleForm.resource,
            standard: this.ruleForm.resource1,
            packprice: this.ruleForm.num1,
            price: this.ruleForm.num2,
            goodsdesc: this.ruleForm.desc
          };
          axios
            .post(
              "http://work.08321.org/sell/goods.php?a=add",
              this.qs.stringify(status)
            )
            .then(res => {
              // console.log(res);

              if (res.data.code == 0) {
                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
                this.$router.push("/index/goods_list");
              } else {
                this.$message.error(res.data.msg);
                return false;
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 上传图片方法
    handleAvatarSuccess(res) {
      console.log(res);
      this.ruleForm.imageUrl = "http://work.08321.org" + res.data;
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
    },
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon[data-v-48375f8e] {
  border: 1px dashed #d9d9d9;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>