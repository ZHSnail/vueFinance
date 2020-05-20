<template>
  <div class="depreciatedApprove">
    <my-pageheader titleContent="固定资产折旧审核"></my-pageheader>
    <my-collapse title="申请信息" class="leftAlign">
      <el-row>
        <el-col :span="12">单号：{{depreciatedReqForm.code}}</el-col>
        <el-col :span="12">申请人：{{depreciatedReqForm.createrName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">申请日期：{{depreciatedReqForm.createTime}}</el-col>
        <el-col :span="12">折旧说明：{{depreciatedReqForm.memo}}</el-col>
      </el-row>
    </my-collapse>
    <my-collapse title="资产信息" class="leftAlign">
      <el-row>
        <el-col :span="12">资产名称：{{depreciatedReqForm.assets.name}}</el-col>
        <el-col :span="12">编号：{{depreciatedReqForm.assets.code}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">规格：{{depreciatedReqForm.assets.norms}}</el-col>
        <el-col :span="12">原价值（元）：{{depreciatedReqForm.assets.orival}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">数量：{{depreciatedReqForm.assets.num}}</el-col>
        <el-col :span="12">残值率（%）：{{depreciatedReqForm.assets.salvage * 100}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">清理费用：{{depreciatedReqForm.assets.cleanCost}}</el-col>
        <el-col :span="12">预计使用年限：{{depreciatedReqForm.assets.usefulLife}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">入库地点：{{depreciatedReqForm.assets.storagePlace}}</el-col>
        <el-col :span="12">入库日期：{{depreciatedReqForm.assets.storageTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">资产类别：{{depreciatedReqForm.assets.assetsKind.name}}</el-col>
        <el-col :span="12">折旧方法：{{depreciatedReqForm.assets.depreMethod}}</el-col>
      </el-row>
    </my-collapse>
    <activiti-record workKey="assetsDepreciationReq" :bizId="id"></activiti-record>
    <activiti-handle workKey="assetsDepreciationReq" url="/finance/assets/depreciatedReview" :bizId="id"></activiti-handle>

  </div>
</template>

<script>
export default {
  name: "depreciatedApprove",
  components: {},
  props: {},
  data() {
    return {
        depreciatedReqForm: {},
      id: "",
      userInfo: {},
    };
  },
  watch: {},
  computed: {},
  methods: {
      initData(id) {
      var url = "/assets/assetsDepreciation/" + id;
      this.axios.get(url).then(res => {
        if (res.success) {
          var temp = {};
          temp = this.Utils.copyObj(res.obj);
          this.depreciatedReqForm = this.Utils.copyObj(temp);
          this.userInfo = this.Utils.getUser();
          if (
            this.userInfo.id === this.assetsRegForm.creater &&
            this.assetsRegForm.status === "审核中"
          ) {
            this.show = true;
          }
        }
      });
    },
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