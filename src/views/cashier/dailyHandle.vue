<template>
  <div class="dailyHandle">
    <my-pageheader titleContent="日常处理"></my-pageheader>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="code" label="凭证号"></el-table-column>
      <el-table-column align="center" prop="name" label="摘要"></el-table-column>
      <el-table-column align="center" prop="name" label="金额"></el-table-column>
      <el-table-column align="center" prop="name" label="勾对状态"></el-table-column>
      <el-table-column align="center" prop="name" label="勾对期间"></el-table-column>
      <el-table-column align="center" prop="name" label="制单人"></el-table-column>
      <el-table-column align="center" prop="name" label="审核人"></el-table-column>
      <el-table-column align="center" prop="name" label="操作"></el-table-column>
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
  name: "dailyHandle",
  components: {},
  props: {},
  data() {
    return {
      total: 200,
      pageSize: 10,
      formOptions: [
        {
          label: "名称或编码", // label文字
          prop: "name", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入会计科目名称或者会计科目编码" // elementui组件属性
        }
      ]
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