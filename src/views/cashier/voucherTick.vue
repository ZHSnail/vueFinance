<template>
  <div class="voucherTick">
    <my-pageheader titleContent="凭证勾对"></my-pageheader>
    <my-collapse title="基本信息" class="leftAlign">
      <el-row>
        <el-col :span="12">凭证号：</el-col>
        <el-col :span="12">会计期间：</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">记账日期：</el-col>
        <el-col :span="12">摘要：</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">关联业务单号：</el-col>
        <el-col :span="12">业务类型：</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">过账状态：</el-col>
        <el-col :span="12">过账日期：</el-col>
      </el-row>
    </my-collapse>
    <my-collapse title="分录信息" class="leftAlign">
      <el-row>
        <el-col :span="12">借方科目：</el-col>
        <el-col :span="12">借方金额：</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">贷方科目：</el-col>
        <el-col :span="12">贷方金额：</el-col>
      </el-row>
    </my-collapse>
    <my-collapse title="附件信息" class="leftAlign">
      <el-row>
        <el-col :span="12">借方科目：</el-col>
        <el-col :span="12">借方金额：</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">贷方科目：</el-col>
        <el-col :span="12">贷方金额：</el-col>
      </el-row>
    </my-collapse>
    <my-collapse title="财务信息" class="leftAlign">
      <el-row>
        <el-col :span="8">制单人：</el-col>
        <el-col :span="8">审核人：</el-col>
        <el-col :span="8">记账人：</el-col>
      </el-row>
    </my-collapse>
    <div class="rightAlign">
      <el-button type="danger" @click="save()">勾对</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "voucherTick",
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