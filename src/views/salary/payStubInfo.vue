<template>
  <div class="payStubInfo">
    <my-pageheader titleContent="工资单管理" :needButton="true" buttonContent="添加" @handleClick="add"></my-pageheader>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="name" label="名称"></el-table-column>
      <el-table-column align="center" prop="scope" label="适用范围"></el-table-column>
      <el-table-column align="center" prop="formula" label="基础工资计算公式"></el-table-column>
      <el-table-column align="center" prop="formula" label="浮动工资计算公式"></el-table-column>
      <el-table-column align="center" label="浮动工资总额">
        <template slot-scope="scope">
          <span>{{scope.row.amount+"元"}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip effect="light" content="编辑" placement="bottom">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "payStubInfo",
  components: {},
  props: {},
  data() {
    return {
      tableData: [
        {
          id: 1,
          scope: "教师类", //适用范围
          name: "教师类工资单",
          formula: "住房补贴+餐费补贴",
          amount: 220
        },
        {
          id: 2,
          scope: "高级管理类",
          formula: "住房补贴+餐费补贴+交通补贴",
          name: "高级管理类工资单",
          amount: 220
        },
        {
          id: 3,
          scope: "职能管理类",
          formula: "住房补贴+餐费补贴+交通补贴",
          name: "职能管理类工资单",
          amount: 220
        },
        {
          id: 4,
          scope: "其他类",
          formula: "住房补贴+餐费补贴+交通补贴",
          name: "其他类工资单",
          amount: 220
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    add() {
      this.$router.push({ path: "payStubAdd" });
    },
    handleEdit(id) {
      this.$router.push({ path: "payStubAdd/" + id });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>