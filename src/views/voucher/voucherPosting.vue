<template>
  <div class="voucherPosting">
    <my-pageheader titleContent="凭证过账"></my-pageheader>
    <div>
      <searchForm
        :formOptions="formOptions"
        @onSearch="search"
        btnItems="search"
      ></searchForm>
    </div>
    <el-button type="danger" @click="posting()" style="margin-bottom:25px" size="medium">过账</el-button>
    <el-table
      cell-class-name="centerAlign"
      @selection-change="handleSelectionChange"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column align="center" label="凭证号">
        <template slot-scope="scope">
          <router-link :to="'voucherDetail/'+scope.row.id" tag="div">
            <el-link type="primary" :underline="false">{{scope.row.code}}</el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="accountPeriod" label="会计期间"></el-table-column>
      <el-table-column align="center" prop="memo" label="摘要"></el-table-column>
      <el-table-column align="center" label="金额">
        <el-table-column align="center" prop="debitTotal" label="借方"></el-table-column>
        <el-table-column align="center" prop="creditTotal" label="贷方"></el-table-column>
      </el-table-column>
      <el-table-column align="center" prop="bizName" label="业务类型">
        <!-- <template slot-scope="scope">
          <span>{{scope.row.state == "TRUE" ? "启用":"停用"}}</span>
        </template> -->
      </el-table-column>
      <el-table-column align="center" prop="postingStatus" label="过账状态">
        <!-- <template slot-scope="scope">
          <span v-for="(item) in scope.row.account" :key="item.id">{{item.code+" " + item.name}}</span>
        </template> -->
      </el-table-column>
      <el-table-column align="center" prop="dealName" label="交易类型"></el-table-column>
      <el-table-column align="center" prop="originatorName" label="制单人"></el-table-column>
      <el-table-column align="center" prop="auditerName" label="审核人"></el-table-column>
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
  name: "voucherPosting",
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
      multipleSelection: []
    };
  },
  watch: {},
  computed: {},
  methods: {
   search(val) {
      var url = "/voucher/unpostVoucherList";
      var data = val ? JSON.stringify(val) : "";
      if(val){
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
    posting() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
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