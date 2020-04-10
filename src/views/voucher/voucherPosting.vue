<template>
  <div class="voucherPosting">
    <my-pageheader titleContent="凭证过账"></my-pageheader>
    <div>
      <searchForm style="width:500px" :formOptions="formOptions" btnItems="search"></searchForm>
    </div>
    <el-button type="danger" @click="posting()" size="medium">过账</el-button>
    <el-table
      cell-class-name="centerAlign"
      @selection-change="handleSelectionChange"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column align="center" prop="code" label="凭证号"></el-table-column>
      <el-table-column align="center" prop="name" label="会计期间"></el-table-column>
      <el-table-column align="center" prop="name" label="摘要"></el-table-column>
      <el-table-column align="center" prop="preMeth" label="业务类型">
        <template slot-scope="scope">
          <span>{{scope.row.state == "TRUE" ? "启用":"停用"}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="fixAccount" label="过账状态">
        <template slot-scope="scope">
          <span v-for="(item) in scope.row.account" :key="item.id">{{item.code+" " + item.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="制单人"></el-table-column>
      <el-table-column align="center" prop="name" label="审核人"></el-table-column>
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
  name: "voucherPosting",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      total: 200,
      pageSize: 10,
      formOptions: [
        {
          label: "名称或编码", // label文字
          prop: "name", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入会计科目名称或者会计科目编码" // elementui组件属性
        }
      ],
      multipleSelection: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleCurrentChange(val) {},
    posting() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>