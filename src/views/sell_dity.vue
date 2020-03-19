<template>
  <div id="list">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="时间范围">
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
    <div id="content">
      <!-- <h4>商品统计</h4> -->
      <!-- <div id="myChart" :style="{width: '80%', height: '400px'}"></div> -->
      <div ref="myChart" :style="{width: '80%', height: '400px'}"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import echarts from "echarts";
export default {
  mounted() {
    axios
      .get("http://work.08321.org/sell/counter.php?a=goods&field=date")
      .then(res => {
        res.data.data.forEach(v => {
          this.xdata.push(v.ctime);
          this.ydata.push(parseInt(v.num));
        });
        this.drawLine();
      });
  },
  data() {
    return {
      xdata: [],
      ydata: [],
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
    onSubmit() {
      console.log(111);
    },
    //
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.myChart);
      // let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        title: { text: "堆叠区域图" },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["商品统计", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.xdata
            // ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "商品统计",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: this.ydata
            // [120, 132, 101, 134, 90, 230, 210]
          }
          // {
          //   name: "联盟广告",
          //   type: "line",
          //   stack: "总量",
          //   areaStyle: {},
          //   data: [220, 182, 191, 234, 290, 330, 310]
          // },
          // {
          //   name: "视频广告",
          //   type: "line",
          //   stack: "总量",
          //   areaStyle: {},
          //   data: [150, 232, 201, 154, 190, 330, 410]
          // },
          // {
          //   name: "直接访问",
          //   type: "line",
          //   stack: "总量",
          //   areaStyle: {},
          //   data: [320, 332, 301, 334, 390, 330, 320]
          // },
          // {
          //   name: "搜索引擎",
          //   type: "line",
          //   stack: "总量",
          //   label: {
          //     normal: {
          //       show: true,
          //       position: "top"
          //     }
          //   },
          //   areaStyle: {},
          //   data: [820, 932, 901, 934, 1290, 1330, 1320]
          // }
        ]
      });
    }
  }
};
</script>