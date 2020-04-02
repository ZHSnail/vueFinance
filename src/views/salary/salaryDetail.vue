<template>
  <div class="salaryDetail">
    <my-pageheader titleContent="教师工资单结算详情"></my-pageheader>
    <div>
      <searchForm :formOptions="formOptions" btnItems="search,export"></searchForm>
    </div>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" fixed prop="name" label="名称"></el-table-column>
      <el-table-column align="center" fixed prop="org" label="部门"></el-table-column>
      <el-table-column align="center" label="应发项">
        <el-table-column v-for="(item, index) in tableData[0].shouldPaidList" v-bind:key="item.id">
          <template slot="header">{{item.name}}</template>
          <template slot-scope="scope">{{scope.row.shouldPaidList[index].amount}}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="扣减项">
        <el-table-column v-for="(item, index) in tableData[0].deductList" v-bind:key="item.id">
          <template slot="header">{{item.name}}</template>
          <template slot-scope="scope">{{scope.row.deductList[index].amount}}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="单位缴纳">
        <el-table-column v-for="(item, index) in tableData[0].untiPayList" v-bind:key="item.id">
          <template slot="header">{{item.name}}</template>
          <template slot-scope="scope">{{scope.row.untiPayList[index].amount}}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="应发金额"></el-table-column>
      <el-table-column align="center" label="实发金额"></el-table-column>
      <el-table-column align="center" label="应纳税额"></el-table-column>
      <el-table-column align="center" label="扣费金额"></el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total"
          class="centerAlign"
          :hide-on-single-page="true"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "salaryDetail",
  components: {},
  props: {},
  data() {
    return {
      tableCols: [
        {
          label: "name",
          prop: "amount"
        }
      ],
      tableData: [
        {
          shouldPaidList: [
            {
              id: "1",
              name: "测试",
              amount: 15
            },
            {
              id: "2",
              name: "45",
              amount: 220
            },
            {
              id: "3",
              name: "十大",
              amount: 45646
            },
            {
              id: "4",
              name: "哈哈",
              amount: 124
            },
            {
              id: "5",
              name: "嘻嘻",
              amount: 524
            },
            {
              id: "6",
              name: "哈哈",
              amount: 25
            },
            {
              id: "7",
              name: "多对多",
              amount: 524
            }
          ],
          deductList: [
            {
              name: "12",
              amount: ""
            },
            {
              name: "",
              amount: ""
            },
            {
              name: "52",
              amount: ""
            },
            {
              name: "",
              amount: ""
            },
            {
              name: "",
              amount: ""
            },
            {
              name: "",
              amount: ""
            },
            {
              name: "",
              amount: ""
            }
          ],
          untiPayList: [
            {
              name: "",
              amount: ""
            },
            {
              name: "",
              amount: ""
            },
            {
              name: "",
              amount: ""
            },
            {
              name: "",
              amount: ""
            },
            {
              name: "",
              amount: ""
            },
            {
              name: "",
              amount: ""
            },
            {
              name: "",
              amount: ""
            }
          ]
        }
      ],
      total: 200,
      pageSize: 10,
      formOptions: [
        {
          label: "名称", // label文字
          prop: "name", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入名称" // elementui组件属性
        },
        {
          label: "部门", // label文字
          prop: "org", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "请选择部门", // elementui组件属性
          options: [
            { label: "人事部", value: "1" },
            { label: "校长办公室", value: "2" }
          ]
        },
        {
          label: "职工分类", // label文字
          prop: "staffType", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "请选择职工分类", // elementui组件属性
          options: [
            { label: "教师类", value: "1" },
            { label: "高级管理类", value: "2" }
          ]
        },
        {
          element: "el-date-picker",
          label: "入职日期",
          type: "daterange",
          prop: "entryDate" // 字段名
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleCurrentChange(val) {}
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>