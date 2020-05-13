<template>
  <div class="voucherQuery">
    <my-pageheader titleContent="凭证查询"></my-pageheader>
    <div>
      <searchForm
        :formOptions="formOptions"
        @onSearch="search"
        btnItems="search"
      ></searchForm>
    </div>
     <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" label="凭证号">
        <template slot-scope="scope">
          <router-link :to="'voucherDetail/'+scope.row.id" tag="div">
            <el-link type="primary" :underline="false">{{scope.row.code}}</el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="accountPeriod" label="会计期间"></el-table-column>
      <el-table-column align="center" prop="bizDate" label="记账日期"></el-table-column>
      <el-table-column align="center" prop="memo" label="摘要"></el-table-column>
      <el-table-column align="center" prop="bizName" label="业务类型">
        <!-- <template slot-scope="scope">
          <span v-if="scope.row.bizType == 'CHARGE_PAY'">收费付款</span>
          <span v-if="scope.row.bizType == 'SALARY_PAY'">工资付款</span>
          <span v-if="scope.row.bizType == 'ASSETS_REG'">固定资产登记</span>
          <span v-if="scope.row.bizType == 'ASSETS_DEPRECIATED'">固定资产折旧</span>
          <span v-if="scope.row.bizType == 'ASSETS_PURCHASE'">固定资产采购</span>
          <span v-if="scope.row.bizType == 'MANUAL_VOUCHE'">手工凭证</span>
        </template> -->
      </el-table-column>
      <el-table-column align="center" prop="postingStatus" label="过账状态">
        <!-- <template slot-scope="scope">
          <span v-if="scope.row.postingStatus == 'POSTED'">已过账</span>
          <span v-if="scope.row.postingStatus == 'UNPOST'">未过账</span>
        </template> -->
      </el-table-column>
      <el-table-column align="center" prop="originatorName" label="制单人"></el-table-column>
      <el-table-column align="center" prop="status" label="状态">
        <!-- <template slot-scope="scope">
          <span v-if="scope.row.status == 'CMT'">审核中</span>
          <span v-if="scope.row.status == 'EXE'">已完成</span>
        </template> -->
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
  name: "voucherQuery",
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
          type:"month"
        }
      ],
      tableData: [],
      pageSize: 10,
      total: 0,
      pageNum:1,
      searchVal:{
        code: "",
        accountPeriod: "",
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    search(val) {
      var url = "/voucher/voucherList";
      var data = val ? JSON.stringify(val) : "";
      if(val){
        this.searchVal = this.Utils.copyObj(val);
      }
      this.axios.get(url, { params: { params: data } }).then(res => {
        if (res.success) {
          console.log(res.obj)
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
  },
  created() {
    this.search();
  },
  mounted() {}
};
</script>
<style scoped>
</style>