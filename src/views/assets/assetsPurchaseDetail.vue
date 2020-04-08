<template>
  <div class="assetsPurchaseDetail">
    <my-pageheader titleContent="固定资产采购详情"></my-pageheader>
    <my-collapse title="申请信息" class="leftAlign">
      <el-row>
        <el-col :span="12">单号：AR2002160001</el-col>
        <el-col :span="12">申请日期:20200415</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">采购方式：564</el-col>
        <el-col :span="12">采购说明：564</el-col>
      </el-row>
    </my-collapse>
    <my-collapse title="资产信息" class="leftAlign">
      <el-row>
        <h2>564</h2>
        <el-col :span="12">资产类别：564</el-col>
        <el-col :span="12">资产名称：564</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">数量：564</el-col>
        <el-col :span="12">单价（元）：564</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">预计金额（元）：564</el-col>
      </el-row>
      <el-divider></el-divider>
    </my-collapse>
  </div>
</template>

<script>
export default {
  name: "assetsPurchaseDetail",
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