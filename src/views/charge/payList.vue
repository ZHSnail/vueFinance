<template>
  <div class="payList">
    <div>
      <my-pageheader titleContent="收费情况"></my-pageheader>
    </div>
    <div>
      <searchForm :formOptions="formOptions" btnItems="search,export"></searchForm>
    </div>
    <el-table
      cell-class-name="centerAlign"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
      <el-table-column align="center" prop="code" label="单号">
        <template slot-scope="scope">
          <router-link :to="'/finance/charge/detail/'+scope.row.id" tag="div">
            <el-link type="primary" :underline="false">{{scope.row.code}}</el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="userName" label="缴费用户"></el-table-column>
      <el-table-column align="center" prop="feeKind" label="费用类别"></el-table-column>
      <el-table-column align="center" label="付款状态" prop="state"></el-table-column>
      <el-table-column align="center" label="付款金额" prop="payMoney"></el-table-column>
      <el-table-column align="center" label="付款日期" prop="payTime"></el-table-column>
      <el-table-column align="center" prop="memo" label="摘要"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-tooltip effect="light" content="通知该用户缴费" placement="bottom">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-bell"
              circle
              @click="notice(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
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
  name: "payList",
  components: {},
  props: {},
  data() {
    return {
      formOptions: [
        {
          label: "单号", // label文字
          prop: "code", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入单号" // elementui组件属性
        },
        {
          label: "用户名", // label文字
          prop: "userName", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入用户名" // elementui组件属性
        },
        {
          label: "付款状态", // label文字
          prop: "state", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "请选择付款状态", // elementui组件属性
          options: [
            { label: "已付款", value: "CMT" },
            { label: "未付款", value: "EXE" }
          ]
        }
      ],
      tableData: [
        {
          id: "1",
          code: "XF2002160001",
          userName: "张三",
          org: "仲恺农业工程学院",
          feeKind: "宿舍费",
          payMoney: "450000.00",
          state: "已付款",
          payTime: "2020-02-02",
          memo: "2018-2019应收学费"
        },
        {
          id: "2",
          code: "XF2002160001",
          userName: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          payMoney: "450000.00",
          state: "已付款",
          payTime: "2020-02-02",
          memo: "2018-2019应收学费"
        },
        {
          id: "3",
          code: "XF2002160001",
          userName: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          payMoney: "450000.00",
          state: "已付款",
          payTime: "2020-02-02",
          memo: "2018-2019应收学费"
        },
        {
          id: "4",
          code: "XF2002160001",
          userName: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          payMoney: "450000.00",
          state: "已付款",
          payTime: "2020-02-02",
          memo: "2018-2019应收学费"
        },
        {
          id: "5",
          code: "XF2002160001",
          userName: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          payMoney: "450000.00",
          state: "已付款",
          payTime: "2020-02-02",
          memo: "2018-2019应收学费"
        },
        {
          id: "6",
          code: "XF2002160001",
          userName: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          payMoney: "450000.00",
          state: "已付款",
          payTime: "2020-02-02",
          memo: "2018-2019应收学费"
        },
        {
          id: "6",
          code: "XF2002160001",
          userName: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          payMoney: "450000.00",
          state: "已付款",
          payTime: "2020-02-02",
          memo: "2018-2019应收学费"
        },
        {
          id: "6",
          code: "XF2002160001",
          userName: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          payMoney: "450000.00",
          state: "已付款",
          payTime: "2020-02-02",
          memo: "2018-2019应收学费"
        },
        {
          id: "6",
          code: "XF2002160001",
          userName: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          payMoney: "450000.00",
          state: "已付款",
          payTime: "2020-02-02",
          memo: "2018-2019应收学费"
        },
        {
          id: "6",
          code: "XF2002160001",
          userName: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          payMoney: "450000.00",
          state: "未付款",
          payTime: "2020-02-02",
          memo: "2018-2019应收学费"
        }
      ],
      total: 200,
      pageSize: 10
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleCurrentChange(){

    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>