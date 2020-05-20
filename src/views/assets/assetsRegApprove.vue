<template>
  <div class="assetsRegApprove">
    <my-pageheader titleContent="固定资产登记审核"></my-pageheader>
    <my-collapse title="基本信息" class="leftAlign">
      <el-row>
        <el-col :span="12">单号：{{assetsRegForm.code}}</el-col>
        <el-col :span="12">申请日期:{{assetsRegForm.createTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">备注：{{assetsRegForm.memo}}</el-col>
      </el-row>
    </my-collapse>
    <my-collapse title="资产信息" class="leftAlign">
      <el-row>
        <el-col :span="12">资产名称:{{assetsRegForm.assets.name}}</el-col>
        <el-col :span="12">编号:{{assetsRegForm.assets.code}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">规格：{{assetsRegForm.assets.norms}}</el-col>
        <el-col :span="12">原价值（元）:{{assetsRegForm.assets.orival}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">数量:{{assetsRegForm.assets.num}}</el-col>
        <el-col :span="12">残值率（%）:{{assetsRegForm.assets.salvage}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">清理费用:{{assetsRegForm.assets.cleanCost}}</el-col>
        <el-col :span="12">预计使用年限:{{assetsRegForm.assets.usefulLife}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">入库地点:{{assetsRegForm.assets.storagePlace}}</el-col>
        <el-col :span="12">入库日期:{{assetsRegForm.assets.storageTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">取得方式:{{assetsRegForm.assets.obtainMethod}}</el-col>
        <el-col :span="12">资产类别:{{assetsRegForm.assets.assetsKind.name}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">折旧方法:{{assetsRegForm.assets.depreMethod}}</el-col>
      </el-row>
    </my-collapse>
    <activiti-record workKey="assetsRegisterReq" :bizId="id"></activiti-record>
    <activiti-handle workKey="assetsRegisterReq" url="/finance/assets/assetsRegReview" :bizId="id"></activiti-handle>
  </div>
</template>

<script>
export default {
  name: "assetsRegApprove",
  components: {},
  props: {},
  data() {
    return {
      assetsRegForm: {},
      id:""
    };
  },
  watch: {},
  computed: {},
  methods: {
    initData(id) {
      var url = "/assets/assetsRegister/" + id;
      this.axios.get(url).then(res => {
        if (res.success) {
          var temp = {};
          temp = this.Utils.copyObj(res.obj);
          temp.assets.salvage = res.obj.assets.salvage * 100;
          this.assetsRegForm = this.Utils.copyObj(temp);
        }
      });
    }
  },
  created() {
    if (typeof this.$route.params.id != undefined) {
      this.id = this.$route.params.id;
      this.initData(this.$route.params.id);
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>