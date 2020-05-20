<template>
  <div class="assetsPurchaseApprove">
      <my-pageheader titleContent="固定资产采购审核"></my-pageheader>
      <my-collapse title="申请信息" class="leftAlign">
      <el-row>
        <el-col :span="12">单号：{{assetsPurchaseForm.code}}</el-col>
        <el-col :span="12">申请日期:{{assetsPurchaseForm.reqTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">采购方式：{{assetsPurchaseForm.purchaseMethodName}}</el-col>
        <el-col :span="12">采购说明：{{assetsPurchaseForm.memo}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">借方会计科目：{{assetsPurchaseForm.debitAccountName}}</el-col>
        <el-col :span="12">贷方会计科目：{{assetsPurchaseForm.creditAccountName}}</el-col>
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
    <activiti-handle workKey="assetsPurchaseReq" url="/finance/assets/assetsPurchaseReview" :bizId="id"></activiti-handle>
  </div>
</template>

<script>
export default {
  name:'assetsPurchaseApprove',
  components:{},
  props:{},
  data(){
    return {
        assetsPurchaseForm:{},
        assetsList:[],
        id:""
    }
  },
  watch:{},
  computed:{},
  methods:{
      initData(id) {
      var url = "/assets/assetsPurchase/" + id;
      this.axios.get(url).then(res => {
        if (res.success) {
          var temp = {};
          temp = this.Utils.copyObj(res.obj);
          this.assetsList = this.Utils.copyObj(res.obj.assetsList);
          this.assetsPurchaseForm = this.Utils.copyObj(temp);          
        }
      });
    }
  },
  created(){
      if (typeof this.$route.params.id != undefined) {
      this.id = this.$route.params.id;
      this.initData(this.$route.params.id);
    }
  },
  mounted(){}
}
</script>
<style scoped>
</style>