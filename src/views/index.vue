<template>
  <div id="index">
    <el-container>
      <el-aside width="200px">
        <div class="imges-box">
          <img src="../assets/logo.jpg" alt />
        </div>
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#3D94EE"
          router
        >
          <!-- 后台首页 -->
          <el-menu-item index="/index/">
            <i class="el-icon-s-home"></i>
            <span slot="title">后台首页</span>
          </el-menu-item>
          <!-- 订单管理 -->
          <el-menu-item index="/index/control">
            <i class="el-icon-document"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <!-- 商品管理 -->
          <el-submenu index="/index/goods">
            <template slot="title">
              <i class="el-icon-shopping-bag-1"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/index/goods_list">商品列表</el-menu-item>
            <el-menu-item index="/index/goods_add">添加商品</el-menu-item>
          </el-submenu>
          <!--  店铺管理-->
          <el-menu-item index="/index/shop">
            <i class="el-icon-s-shop"></i>
            <span slot="title">店铺管理</span>
          </el-menu-item>

          <!-- 账号管理 -->
          <el-submenu index="/index/account">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>账号管理</span>
            </template>
            <el-menu-item index="/index/account_list">账号列表</el-menu-item>
            <el-menu-item index="/index/account_add">添加账号</el-menu-item>
            <el-menu-item index="/index/account_changepwd">修改密码</el-menu-item>
          </el-submenu>
          <!-- 销售统计 -->
          <el-submenu index="/index/sell">
            <template slot="title">
              <i class="el-icon-pie-chart"></i>
              <span>销售统计</span>
            </template>
            <el-menu-item index="/index/sell_dity">商品统计</el-menu-item>
            <el-menu-item index="/index/sell_order">订单统计</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!--  -->
      <!-- <el-container> -->
      <el-main>
        <el-header>
          <!--面包屑导航-->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(v,i) in this.$route.meta" :key="i">{{v}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!--登陆帐户信息-->
          <el-dropdown>
            <span class="el-dropdown-link">
              欢迎你，{{username}}
              <el-avatar :src="headimg"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/index/personal">管理员信息</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/logout">退出系统</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <router-view />
      </el-main>
    </el-container>
    <!-- </el-container> -->
  </div>
</template>
<script>
// import headimg from "../assets/headimg.jpg";
import axios from 'axios';
// import qs from 'qs';
export default {
  data() {
    return {
      headimg: '',
      username:''
    };
  },
  // 验证用户是否已经登录
  created(){
    var id=sessionStorage.getItem('id');
    var token=sessionStorage.getItem('token')
    // var data={'id':localStorage.getItem('id'),'token':localStorage.getItem('token')}
    // &id='+id+'&token='+token
    // console.log(qs.stringify(data))
    axios.get('http://work.08321.org/sell/users.php?a=chklogin&id='+id+'&token='+token)
    .then((res)=>{
      if(res.data.code==1){
        this.$message.error('请登录以后再操作');
          this.$router.push('/')
      }
    })
  },
  mounted(){
    var user=JSON.parse(sessionStorage.getItem('user'));
    this.username=user.account;
    this.headimg=user.imgUrl
  }
};
</script>
<style scoped>
.el-header {
  background-color: #fff;
  color: #333;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  /* line-height: 200px; */
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-avatar {
  vertical-align: middle;
}
#index,
#index > .el-container {
  height: 100%;
}
#index .el-aside {
  background: #304156;
  height: 100%;
}
.el-menu {
  border: none;
  width: 100%;
}
.imges-box {
  width: 100%;
  height: 84px;
  line-height: 84px;
}
.imges-box > img {
  width: 100%;
}
</style>