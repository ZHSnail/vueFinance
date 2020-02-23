<template>
  <div class="payNoticeList">
    <div>
      <my-pageheader titleContent="收费查询"></my-pageheader>
    </div>
    <div>
      <searchForm :formOptions="formOptions" btnItems="search,export"></searchForm>
    </div>
    <el-table
      cell-class-name="centerAlign"
      :data="tableData"
      stripe
      style="width: 100%"
      max-height="400"
    >
      <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
      <el-table-column align="center" prop="code" label="单号" width="120">
        <template slot-scope="scope">
          <router-link :to="'detail/'+scope.row.id" tag="div">
            <el-link type="primary" :underline="false">{{scope.row.code}}</el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createUser" label="发起人" width="120"></el-table-column>
      <el-table-column align="center" label="收费机构" prop="org" width="140"></el-table-column>
      <el-table-column align="center" prop="feeKind" label="费用类别" width="120"></el-table-column>
      <el-table-column align="center" label="收费情况" width="120">
        <template slot-scope="scope">
          <router-link :to="'payList/'+scope.row.id" tag="div">
            <el-link type="primary" :underline="false">详情</el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="应收金额" prop="total" width="120"></el-table-column>
      <el-table-column align="center" label="状态" prop="state" width="120"></el-table-column>
      <el-table-column align="center" label="摘要" prop="memo" width="150"></el-table-column>
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
  name: "payNoticeList",
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
          label: "状态", // label文字
          prop: "state", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "请选择状态", // elementui组件属性
          options: [
            { label: "审批中", value: "CMT" },
            { label: "正在进行", value: "EXE" },
            { label: "已完成", value: "EXE" }
          ]
        },
        {
          label: "费用类别", // label文字
          prop: "feeKind", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "请选择费用类别", // elementui组件属性
          options: [
            { label: "理科类学费", value: "1" },
            { label: "文科类学费", value: "2" },
            { label: "电费", value: "3" },
            { label: "宿舍费", value: "4" },
            { label: "水费", value: "5" },
          ]
        }
      ],
      tableData: [
        {
          id: "1",
          code: "SF2002160001",
          createUser: "张三",
          org: "仲恺农业工程学院",
          feeKind: "宿舍费",
          total: "450000.00",
          state: "正在进行",
          memo: "2018-2019应收学费"
        },
        {
          id: "2",
          code: "SF2002160001",
          createUser: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          total: "450000.00",
          state: "正在进行",
          memo: "2018-2019应收学费"
        },
        {
          id: "3",
          code: "SF2002160001",
          createUser: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          total: "450000.00",
          state: "正在进行",
          memo: "2018-2019应收学费"
        },
        {
          id: "4",
          code: "SF2002160001",
          createUser: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          total: "450000.00",
          state: "正在进行",
          memo: "2018-2019应收学费"
        },
        {
          id: "5",
          code: "SF2002160001",
          createUser: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          total: "450000.00",
          state: "正在进行",
          memo: "2018-2019应收学费"
        },
        {
          id: "6",
          code: "SF2002160001",
          createUser: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          total: "450000.00",
          state: "正在进行",
          memo: "2018-2019应收学费"
        },
        {
          id: "6",
          code: "SF2002160001",
          createUser: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          total: "450000.00",
          state: "正在进行",
          memo: "2018-2019应收学费"
        },
        {
          id: "6",
          code: "SF2002160001",
          createUser: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          total: "450000.00",
          state: "正在进行",
          memo: "2018-2019应收学费"
        },
        {
          id: "6",
          code: "SF2002160001",
          createUser: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          total: "450000.00",
          state: "正在进行",
          memo: "2018-2019应收学费"
        },
        {
          id: "6",
          code: "SF2002160001",
          createUser: "张三",
          org: "仲恺农业工程学院",
          feeKind: "学费",
          total: "450000.00",
          state: "正在进行",
          memo: "2018-2019应收学费"
        }
      ],
      total:200,
      pageSize:10
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>