<template>
  <div class="assetsRegDetail">
    <my-pageheader titleContent="固定资产登记详情"></my-pageheader>
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
      <div class="rightAlign">
      <el-button type="danger" v-if="show" @click="revoke()">撤回</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: "assetsRegDetail",
  components: {},
  props: {},
  data() {
    return {
      assetsRegForm: {},
      id: "",
      userInfo: {},
      show: false
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
    revoke() {
      var data = {
        workKey: "assetsRegisterReq",
        businessKey: this.id,
        comment: ""
      };
      var url = "/activiti/revoke";
      this.axios.post(url, data).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg,
            center: true
          });
          this.$router.push({ path: "/finance/assets/assetsRegList" });
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