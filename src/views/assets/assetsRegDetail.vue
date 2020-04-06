<template>
  <div class="assetsRegDetail">
    <my-pageheader titleContent="固定资产登记详情"></my-pageheader>
    <my-collapse title="基本信息" class="leftAlign">
      <el-row>
        <el-col :span="12">单号：AR2002160001</el-col>
        <el-col :span="12">申请日期:20200415</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">备注：564</el-col>
      </el-row>
    </my-collapse>
    <my-collapse title="资产信息" class="leftAlign">
      <el-row>
        <el-col :span="12">资产名称:</el-col>
        <el-col :span="12">编号:20200415</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">规格：564</el-col>
        <el-col :span="12">原价值（元）:</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">数量:</el-col>
        <el-col :span="12">残值率（%）:</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">清理费用:</el-col>
        <el-col :span="12">预计使用年限:</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">入库地点:</el-col>
        <el-col :span="12">入库日期:</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">取得方式:</el-col>
        <el-col :span="12">资产类别:</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">折旧方法:</el-col>
      </el-row>
    </my-collapse>
    <my-collapse title="审批记录">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/3 20:46</p>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/2 20:46</p>
        </el-timeline-item>
      </el-timeline>
    </my-collapse>
  </div>
</template>

<script>
export default {
  name: "assetsRegDetail",
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