<template>
  <div class="assetsPurchaseQuery">
    <my-pageheader titleContent="固定资产采购综合查询"></my-pageheader>
    <div>
      <searchForm
        :formOptions="formOptions"
        @onSearch="search"
        btnItems="search"
      ></searchForm>
    </div>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" label="单号">
         <template slot-scope="scope">
          <router-link :to="'assetsPurchaseDetail/'+scope.row.id" tag="div">
            <el-link type="primary" :underline="false">{{scope.row.code}}</el-link>
          </router-link>
         </template>
      </el-table-column>
      <el-table-column align="center" prop="createrName" label="申请人"></el-table-column>
      <el-table-column align="center" prop="reqTime" label="申请时间"></el-table-column>
      <el-table-column align="center" prop="purchaseMethodName" label="采购方式"></el-table-column>
      <el-table-column align="center" prop="totalAmt" label="单据金额"></el-table-column>
      <el-table-column align="center" prop="memo" label="采购说明"></el-table-column>
      <el-table-column align="center" prop="status" label="状态"></el-table-column>
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
  name: "assetsPurchaseQuery",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      pageSize: 10,
      total: 0,
      pageNum:1,
      formOptions: [
        {
          label: "单号", // label文字
          prop: "code", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入单号" // elementui组件属性
        }
      ],
      searchVal:{
        code: "",
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    search(val) {
      var url = "/assets/assetsPurchaseList";
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
  },
  created() {
    this.search();
  },
  mounted() {}
};
</script>
<style scoped>
</style>