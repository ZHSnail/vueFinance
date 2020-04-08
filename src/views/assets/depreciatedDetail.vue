<template>
  <div class="depreciatedDetail">
    <my-pageheader titleContent="计提折旧申请详情"></my-pageheader>
    <my-collapse title="申请信息" class="leftAlign">
      <el-row>
        <el-col :span="12">单号：</el-col>
        <el-col :span="12">申请人：</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">申请日期：</el-col>
        <el-col :span="12">折旧说明：</el-col>
      </el-row>
    </my-collapse>
    <my-collapse title="资产信息" class="leftAlign">
      <el-row>
        <el-col :span="12">资产名称：</el-col>
        <el-col :span="12">编号：</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">规格：</el-col>
        <el-col :span="12">原价值（元）：</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">数量：</el-col>
        <el-col :span="12">残值率（%）：</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">清理费用：</el-col>
        <el-col :span="12">预计使用年限：</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">入库地点：</el-col>
        <el-col :span="12">入库日期：</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">资产类别：</el-col>
        <el-col :span="12">折旧方法：</el-col>
      </el-row>
    </my-collapse>
  </div>
</template>

<script>
export default {
  name: "depreciatedDetail",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>