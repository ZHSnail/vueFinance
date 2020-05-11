<template>
  <div class="payList">
    <div>
      <my-pageheader titleContent="收费情况"></my-pageheader>
    </div>
    <div>
      <searchForm :formOptions="formOptions" btnItems="search,export" @onExport="exportData" @onSearch="search"></searchForm>
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
      <el-table-column align="center" prop="payNotice.feeKind.name" label="费用类别"></el-table-column>
      <el-table-column align="center" label="付款状态" prop="status">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 'PAID'">已付款</span>
          <span v-if="scope.row.status == 'UNPAID'">未付款</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="付款金额" prop="amount">
        <template slot-scope="scope">
          {{scope.row.amount + " 元"}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="付款日期" prop="payDate"></el-table-column>
      <el-table-column align="center" prop="memo" label="摘要"></el-table-column>
      <!-- <el-table-column align="center" label="操作">
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
      </el-table-column> -->
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
          :current-page.sync="pageNum"
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
          prop: "status", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "请选择付款状态", // elementui组件属性
          options: [
            { label: "已付款", value: "PAID" },
            { label: "未付款", value: "UNPAID" }
          ]
        }
      ],
      tableData: [],
      pageSize: 10,
      total: 0,
      pageNum: 1,
      searchVal: {
        code: "",
        status: "",
        userName: ""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    search(val) {
      var url = "/charge/payDetailList/"+this.$route.params.id;
      var data = val ? JSON.stringify(val) : "";
      if (val) {
        this.searchVal = this.Utils.copyObj(val);
      }
      this.axios.get(url, { params: { params: data } }).then(res => {
        if (res.success) {
          this.tableData = res.obj.list;
          this.total = res.obj.total;
          this.pageNum = res.obj.pageNum;
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = this.Utils.copyObj(this.searchVal);
      data.pageNum = val;
      this.search(data);
    },
    exportData(val) {
      var url = "/charge/payNoticeExport";
      var data = JSON.stringify(val) ? JSON.stringify(val) : "";
      this.Utils.downloadFile(url, { data: data });
    },
  },
  created() {
     this.search();
  },
  mounted() {}
};
</script>
<style scoped>
</style>