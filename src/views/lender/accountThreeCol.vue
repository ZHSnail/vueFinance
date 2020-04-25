<template>
  <div class="accountThreeCol">
    <my-pageheader titleContent="会计科目明细账"></my-pageheader>
    <div>
      <searchForm
        :formOptions="formOptions"
        @onSearch="search"
        @onExport="exportData"
        btnItems="search,export"
      ></searchForm>
    </div>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="accountPeriod" label="会计期间"></el-table-column>
      <el-table-column align="center" prop="accountName" label="科目名称"></el-table-column>
      <el-table-column align="center" prop="accountCode" label="科目编码"></el-table-column>
      <el-table-column align="center" prop="postingDate" label="过账日期"></el-table-column>
      <el-table-column align="center" prop="voucherCode" label="凭证号"></el-table-column>
      <el-table-column align="center" prop="originator" label="制单人"></el-table-column>
      <el-table-column align="center" prop="memo" label="摘要"></el-table-column>
      <el-table-column align="center" prop="debitAmount" label="借方金额"></el-table-column>
      <el-table-column align="center" prop="creditAmount" label="贷方金额"></el-table-column>
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
  name: "accountThreeCol",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      formOptions: [
        {
          label: "会计期间", // label文字
          prop: "accountPeriod", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入会计期间" // elementui组件属性
        },
        {
          label: "科目编码", // label文字
          prop: "accountCode", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入科目编码" // elementui组件属性
        }
      ],
      pageSize: 10,
      total: 200
    };
  },
  watch: {},
  computed: {},
  methods: {
    search(val) {
      var url = "/lender/accDetailCondition";
      var data = val ? JSON.stringify(val) : "";
      //   this.axios.get(url, { params: { params: data } }).then(res => {
      //     if (res.success) {
      //       this.tableData = res.obj.list;
      //       this.total = res.obj.total;
      //     }
      //   });
    },
    exportData(val) {
      var url = "/lender/accBalanceExport";
      var data = JSON.stringify(val) ? JSON.stringify(val) : "";
      //   this.Utils.downloadFile(url, { data: data });
    },
    handleCurrentChange(val) {
      var data = { pageNum: val };
      //   this.search(data);
    }
  },
  created() {
    this.search();
  },
  mounted() {}
};
</script>
<style scoped>
</style>