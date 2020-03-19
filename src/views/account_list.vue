<template>
  <div id="list">
    <div id="content">
      <h4>账号列表</h4>
      <el-table :data="tableData" style="width: 100%" ref="multipleTable">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="ID" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" width="180">
          <template slot-scope="scope">
            <!-- <el-popover trigger="hover" placement="top"> -->
            <!-- <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>-->
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.account }}</el-tag>
            </div>
            <!-- </el-popover> -->
          </template>
        </el-table-column>
        <el-table-column label="用户组" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.userGroup }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.ctime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="open">删除</el-button>
            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="sizeChange"
          @current-change="pageChange"
          :current-page="page"
          :page-sizes="[10,15,20,25]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <el-button size="small" @click="del" type="danger">批量删除</el-button>
      <el-button size="small" type="primary" @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import qs from 'qs'
export default {
  created() {
    this.getpage();
  },
  data() {
    return {
      total: 20,
      page: 1,
      size: 10,
      tableData: [
        // {
        //   id: "",
        //   ctime: "",
        //   account: "",
        //   userGroup: ""
        // }
      ]
    };
  },
  methods: {
    getpage() {
      axios
        .get(
          "http://work.08321.org/sell/users.php?a=list&currentPage=" +
            this.page +
            "s&pageSize=" +
            this.size
        )
        .then(res => {
          // console.log(res);
          this.tableData = res.data.data;
          this.total = parseInt(res.data.total);
          // console.log(this.total);
        });
    },
    // 编辑
    handleEdit(id) {
      // console.log(id);
      this.$router.push("/index/account_edit/" + id);
      // axios.post('http://work.08321.org/sell/goods.php?a=edit&id='+id)
    },
    del() {
      this.$refs.multipleTable.selection.forEach(v => {
        console.log(v.id);
      });
    },
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 分页   每页显示数据改变时触发
    sizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.getpage();
    },
    // 分页   页码改变时触发
    pageChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.getpage();
    },
    // 切换选项
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        // 取消所有选择项
        this.$refs.multipleTable.clearSelection();
      }
    }
  }
};
</script>
<style scoped>
.el-pagination {
  margin-bottom: 10px;
  margin-top: 15px;
}
</style>