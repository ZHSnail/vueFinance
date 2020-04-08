<template>
  <div class="assetsPurchaseQuery">
    <my-pageheader titleContent="固定资产采购综合查询"></my-pageheader>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="code" label="单号"></el-table-column>
      <el-table-column align="center" prop="reqStaff" label="申请人"></el-table-column>
      <el-table-column align="center" prop="reqTime" label="申请时间"></el-table-column>
      <el-table-column align="center" prop="purchaseMeth" label="采购方式"></el-table-column>
      <el-table-column align="center" prop="total" label="单据金额">
        <template slot-scope="scope">
          <span>{{scope.row.state == "TRUE" ? "启用":"停用"}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="purchaseMeth" label="采购说明"></el-table-column>
      <el-table-column align="center" prop="name" label="状态"></el-table-column>
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
  name: "assetsPurchaseQuery",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      total: 200,
      pageSize: 10
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