<template>
  <div id="list">
    <div id="content">
      <h4>商品列表</h4>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.goodsname }}</span>
              </el-form-item>
              <el-form-item label="商品规格">
                <span>{{ props.row.standard }}</span>
              </el-form-item>
              <el-form-item label="上架时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.goodscategory }}</span>
              </el-form-item>
              <el-form-item label="包装费用">
                <span>{{ props.row.packprice }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsdesc }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <img :src="props.row.imgUrl" alt="" width="100px" height="100px">
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品 ID" prop="id">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name">
          <template slot-scope="scope">
            <span>{{ scope.row.goodsname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="desc">
          <template slot-scope="scope">
            <span>{{ scope.row.goodsdesc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品图片" prop="images">
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" alt="" width="100px" height="100px">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10,15,20]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      page: 1,
      total: 1,
      size:10,
      tableData: [
       
      ]
    };
  },
  mounted() {
    this.getgoods();
  },
  methods: {
    // 编辑id
    handleEdit(id) {
      // console.log(id);
      this.$router.push('/index/goods_edit/'+id)
      // axios.post('http://work.08321.org/sell/goods.php?a=edit'+id).then(res=>{
      //   console.log(res);
        
      // })

    },
    // 删除功能
    handleDelete(id) {
      // console.log(index, row);
      axios.get('http://work.08321.org/sell/goods.php?a=delete&id='+id).then((res)=>{
        // console.log(res);
        if(res.data.code==0){
          this.$message({
            message:res.data.msg,
            type:'success'
          })
        }else{
          this.$message.error(res.data.msg)
        }
        
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size=val;
      this.getgoods();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // console.log(val);
      
      this.page=val;
      this.getgoods();
    },
    getgoods() {
      axios
        .get(
          "http://work.08321.org/sell/goods.php?a=list&currentPage=" +
            this.page +
            "&pageSize="+this.size
        )
        .then(res => {
          // console.log(res);
          this.tableData = res.data.data;
          this.total = parseInt(res.data.total);
        });
    }
  }
};
</script>
<style scoped>
.block {
  margin-top: 15px;
}
</style>