<template>
  <div id="list">
    <div class="smalltitle">
      <el-row :gutter="12">
        <el-col :span="6">
          <div shadow="hover" class="counter">
            <i class="el-icon-document col1"></i>
            <div>
              <p>总订单</p>
              <p>102,400</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div shadow="hover" class="counter">
            <i class="el-icon-coin col2"></i>
            <div>
              <p>总销售额</p>
              <p>102,400</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div shadow="hover" class="counter">
            <i class="el-icon-s-order col3"></i>
            <div>
              <p>今日订单数</p>
              <p>102,400</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div shadow="hover" class="counter">
            <i class="el-icon-star-off col4"></i>
            <div>
              <p>今日销售额</p>
              <p>102,400</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="content">
      <!-- <div id="myChart" :style="{width:'100%',height:'350px'}"></div> -->
      <div ref="myChart" :style="{width:'100%',height:'350px'}"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import axois from "axios";
export default {
  data() {
    return {
      xdata: [],
      ydata: [],
      ydata2:[]
    };
  },
  created() {
    axois
      .get("http://work.08321.org/sell/counter.php?a=users&field=date")
      .then(res => {
        res.data.data.forEach(v => {
          this.xdata.push(v.ctime);
          this.ydata.push(parseInt(v.num));
        });
        this.drawLine();
      });
    axois
      .get("http://work.08321.org/sell/counter.php?a=goods&field=date")
      .then(res => {
        res.data.data.forEach(v => {
          // this.xdata.push(v.ctime);
          this.ydata2.push(parseInt(v.num));
        });
        this.drawLine();
      });
  },
  // 页面渲染的时候加载
  // mounted() {
  // this.drawLine();
  // },
  methods: {
    drawLine() {
      var myChart = echarts.init(this.$refs.myChart);
      // let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["管理员人数","商品总量", "销售额", "注册人数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xdata
        },
        yAxis: {
          type: "value"
        },
        series: [
          // {
          //   name: "订单",
          //   type: "line",
          //   stack: "总量",
          //   data: [120, 132, 101, 200, 90, 230, 210]
          // },
          // {
          //   name: "销售额",
          //   type: "line",
          //   stack: "总量",
          //   data: [220, 182, 191, 1000, 290, 330, 310]
          // },
          {
            name: "商品总量",
            type: "line",
            stack: "总量",
            data: this.ydata2
          },
          {
            name: "管理员人数",
            type: "line",
            stack: "总量1",
            data: this.ydata
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
.smalltitle {
  margin-bottom: 10px;
  clear: both;
}
.counter {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  padding: 20px 10px;
  margin-bottom: 20px;
}
.counter > i {
  font-size: 60px;
}
.counter p {
  font-weight: bolder;
}
.counter p:first-child {
  color: #cfcfcf;
  margin-bottom: 5px;
}
.counter > .col1 {
  color: #1296db;
}
.counter > .col2 {
  color: #dc4c93;
}
.counter > .col3 {
  color: #1296db;
}
.counter > .col4 {
  color: #1afa29;
}
</style>