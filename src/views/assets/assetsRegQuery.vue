<template>
  <div class="assetsRegQuery">
    <my-pageheader titleContent="固定资产登记综合查询"></my-pageheader>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="code" label="单号"></el-table-column>
      <el-table-column align="center" prop="name" label="资产名称"></el-table-column>
      <el-table-column align="center" prop="name" label="资产类别"></el-table-column>
      <el-table-column align="center" prop="name" label="折旧方法"></el-table-column>
      <el-table-column align="center" prop="preMeth" label="数量">
        <template slot-scope="scope">
          <span>{{scope.row.state == "TRUE" ? "启用":"停用"}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="fixAccount" label="原价值">
        <template slot-scope="scope">
          <span v-for="(item) in scope.row.account" :key="item.id">{{item.code+" " + item.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="depreAccount" label="残值率">
        <template slot-scope="scope">
          <span>{{scope.row.state == "TRUE" ? "启用":"停用"}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="预计使用年限"></el-table-column>
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
  name: "assetsRegQuery",
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