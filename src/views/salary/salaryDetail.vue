<template>
  <div class="salaryDetail">
    <my-pageheader titleContent="结算详情"></my-pageheader>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" fixed prop="staffInfo.name" label="名称"></el-table-column>
      <el-table-column align="center" fixed prop="staffInfo.orgInfo.name" label="部门"></el-table-column>
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
      <el-table-column align="center" label="应发金额" prop="payableAmount"></el-table-column>
      <el-table-column align="center" label="实发金额" prop="paidAmount"></el-table-column>
      <el-table-column align="center" label="应纳税额" prop="taxableAmount"></el-table-column>
      <el-table-column align="center" label="扣费金额" prop="deductionAmount"></el-table-column>
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
  name: "salaryDetail",
  components: {},
  props: {},
  data() {
    return {
    tableData: [],
       pageSize: 10,
      total: 0,
      pageNum: 1,
    };
  },
  watch: {},
  computed: {},
  methods: {
    search(val) {
      var url = "/salary/settleWageDetailList";
      var data = val ? JSON.stringify(val) : "";
      this.axios.get(url, { params: { params: data } }).then(res => {
        if (res.success) {
          this.tableData = res.obj.list;
          console.log(this.tableData)
          this.total = res.obj.total;
          this.pageNum = res.obj.pageNum;
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = {};
      data.pageNum = val;
      this.search(data);
    },
  },
  created() {
    this.search({settleWageId:this.$route.params.id});
  },
  mounted() {}
};
</script>
<style scoped>
</style>