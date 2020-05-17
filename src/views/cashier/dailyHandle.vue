<template>
  <div class="dailyHandle">
    <my-pageheader titleContent="日常处理"></my-pageheader>
    <div>
      <searchForm :formOptions="formOptions" @onSearch="search" btnItems="search"></searchForm>
    </div>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" label="凭证号">
        <template slot-scope="scope">
          <router-link :to="'/finance/voucher/voucherDetail/'+scope.row.id" tag="div">
            <el-link type="primary" :underline="false">{{scope.row.code}}</el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="accountPeriod" label="会计期间"></el-table-column>
      <el-table-column align="center" prop="bizDate" label="记账日期"></el-table-column>
      <el-table-column align="center" prop="memo" label="摘要"></el-table-column>
      <el-table-column align="center" prop="bizName" label="业务类型"></el-table-column>
      <el-table-column align="center" prop="dealName" label="交易类型"></el-table-column>
      <el-table-column align="center" prop="tickState" label="勾对状态"></el-table-column>
      <el-table-column align="center" prop="originatorName" label="制单人"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-tooltip effect="light" content="勾对" placement="bottom">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleTick(scope.row.id)"
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
          :current-page.sync="pageNum"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "dailyHandle",
  components: {},
  props: {},
  data() {
    return {
      formOptions: [
        {
          label: "凭证号", // label文字
          prop: "code", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入凭证号" // elementui组件属性
        },
        {
          label: "会计期间", // label文字
          prop: "accountPeriod", // 字段名
          element: "el-date-picker", // 指定elementui组件
          placeholder: "请选择会计期间", // elementui组件属性
          type: "month"
        }
      ],
      tableData: [],
      pageSize: 10,
      total: 0,
      pageNum: 1,
      searchVal: {
        code: "",
        accountPeriod: ""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    search(val) {
      var url = "/voucher/cashierUntickVoucher";
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
    handleTick(id) {
      var url = "/voucher/tickVoucher/" + id;
      this.axios.put(url).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg,
            center: true
          });
          this.handleCurrentChange(this.pageNum);
        }
      });
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