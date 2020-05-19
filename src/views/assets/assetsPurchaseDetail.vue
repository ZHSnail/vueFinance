<template>
  <div class="assetsPurchaseDetail">
    <my-pageheader titleContent="固定资产采购详情"></my-pageheader>
    <my-collapse title="申请信息" class="leftAlign">
      <el-row>
        <el-col :span="12">单号：{{assetsPurchaseForm.code}}</el-col>
        <el-col :span="12">申请日期:{{assetsPurchaseForm.reqTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">采购方式：{{assetsPurchaseForm.purchaseMethodName}}</el-col>
        <el-col :span="12">采购说明：{{assetsPurchaseForm.memo}}</el-col>
      </el-row>
    </my-collapse>
    <my-collapse title="资产信息" class="leftAlign">
      <div v-for="item in assetsList" v-bind:key="item.id">
      <el-row>
        <h2>{{item.name}}</h2>
        <el-col :span="12">资产类别：{{item.assetsKind.name}}</el-col>
        <el-col :span="12">资产名称：{{item.name}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">数量：{{item.num}}</el-col>
        <el-col :span="12">单价（元）：{{item.orival}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">预计金额（元）：{{item.num * item.orival}}</el-col>
      </el-row>
      <el-divider></el-divider>
      </div>
      
    </my-collapse>
    <activiti-record workKey="assetsPurchaseReq" :bizId="id"></activiti-record>
    <div class="rightAlign">
      <el-button type="danger" v-if="show" @click="revoke()">撤回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "assetsPurchaseDetail",
  components: {},
  props: {},
  data() {
    return {
      assetsPurchaseForm: {},
      assetsList:[],
      id: "",
      userInfo: {},
      show: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    initData(id) {
      var url = "/assets/assetsPurchase/" + id;
      this.axios.get(url).then(res => {
        if (res.success) {
          var temp = {};
          temp = this.Utils.copyObj(res.obj);
          this.assetsList = this.Utils.copyObj(res.obj.assetsList);
          console.log(temp);
          this.assetsPurchaseForm = this.Utils.copyObj(temp);
          this.userInfo = this.Utils.getUser();
          if (
            this.userInfo.id === this.assetsPurchaseForm.creater &&
            this.assetsPurchaseForm.status === "审核中"
          ) {
            this.show = true;
          }
        }
      });
    },
    revoke() {
      var data = {
        workKey: "assetsPurchaseReq",
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
          this.$router.push({ path: "/finance/assets/assetsPurchaseList" });
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