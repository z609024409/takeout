<template>
  <div id="list">
    <div id="content">
      <h4>订单管理</h4>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="订单号">
          <el-input v-model="formInline.user" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="formInline.user" placeholder="收货人"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formInline.user" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="formInline.region" placeholder="订单状态">
            <el-option label="未受理" value="1"></el-option>
            <el-option label="已受理" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择时间">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="orderform" label="订单号" width="150"></el-table-column>
        <el-table-column prop="date" label="下单时间" width="150"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="配送地址" width="240"></el-table-column>
        <el-table-column prop="arrive" label="到达时间" width="120"></el-table-column>
        <el-table-column prop="remark" label="备注" width="120"></el-table-column>
        <el-table-column prop="money" label="订单金额" width="120"></el-table-column>
        <el-table-column prop="status" label="订单状态" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >查看</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[5,10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="35"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        reg表单ion: ""
      },
      // 分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      //表格
      tableData: [
        {
          orderform: 14214314,
          date: "19：00:00",
          phone: "133333333333",
          name: "大貂蝉",
          address: "上海市普陀区金沙江路 1518 弄",
          arrive: "19:05:00",
          remark: "变态辣",
          money: "110",
          status: "已受理"
        },
        {
          orderform: 14214314,
          date: "19：00:00",
          phone: "133333333333",
          name: "大貂蝉",
          address: "上海市普陀区金沙江路 1518 弄",
          arrive: "19:05:00",
          remark: "变态辣",
          money: "110",
          status: "已受理"
        },
        {
          orderform: 14214314,
          date: "19：00:00",
          phone: "133333333333",
          name: "大貂蝉",
          address: "上海市普陀区金沙江路 1518 弄",
          arrive: "19:05:00",
          remark: "变态辣",
          money: "110",
          status: "已受理"
        },
        {
          orderform: 14214314,
          date: "19：00:00",
          phone: "133333333333",
          name: "大貂蝉",
          address: "上海市普陀区金沙江路 1518 弄",
          arrive: "19:05:00",
          remark: "变态辣",
          money: "110",
          status: "已受理"
        },
        {
          orderform: 14214314,
          date: "19：00:00",
          phone: "133333333333",
          name: "大貂蝉",
          address: "上海市普陀区金沙江路 1518 弄",
          arrive: "19:05:00",
          remark: "变态辣",
          money: "110",
          status: "已受理"
        },
        {
          orderform: 14214314,
          date: "19：00:00",
          phone: "133333333333",
          name: "大貂蝉",
          address: "上海市普陀区金沙江路 1518 弄",
          arrive: "19:05:00",
          remark: "变态辣",
          money: "110",
          status: "已受理"
        },
        {
          orderform: 14214314,
          date: "19：00:00",
          phone: "133333333333",
          name: "大貂蝉",
          address: "上海市普陀区金沙江路 1518 弄",
          arrive: "19:05:00",
          remark: "变态辣",
          money: "110",
          status: "已受理"
        }
      ],
      //   时间
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
    };
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    onSubmit() {
      console.log(1111);
    },
    //   分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style scoped>
.el-input {
  width: 150px;
}

.el-table {
  margin-bottom: 15px;
}
</style>