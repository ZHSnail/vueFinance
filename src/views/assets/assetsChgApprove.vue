<template>
  <div class="assetsChgApprove">
    <my-pageheader titleContent="固定资产变动审核"></my-pageheader>
    <my-collapse title="申请信息" class="leftAlign">
      <el-row>
        <el-col :span="12">单号：{{assetsChgForm.code}}</el-col>
        <el-col :span="12">申请日期:{{assetsChgForm.createTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">申请人：{{assetsChgForm.createrName}}</el-col>
        <el-col :span="12">变动说明：{{assetsChgForm.memo}}</el-col>
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
          <el-col :span="12">编号:{{item.code}}</el-col>
          <el-col :span="12">规格：{{item.norms}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">原价值（元）：{{item.orival}}</el-col>
          <el-col :span="12">数量：{{item.num}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">残值率（%）：{{item.salvage * 100}}</el-col>
          <el-col :span="12">清理费用：{{item.cleanCost}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">预计使用年限：{{item.usefulLife}}</el-col>
          <el-col :span="12">入库地点：{{item.storagePlace}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">入库日期：{{item.storageTime}}</el-col>
          <el-col :span="12">取得方式：{{item.obtainMethod}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">折旧方法：{{item.depreMethod}}</el-col>
        </el-row>
        <el-divider></el-divider>
      </div>
    </my-collapse>
    <activiti-record workKey="assetsChangeReq" :bizId="id"></activiti-record>
    <activiti-handle workKey="assetsChangeReq" url="/finance/assets/assetsChgReview" :bizId="id"></activiti-handle>
  </div>
</template>

<script>
export default {
  name: "assetsChgApprove",
  components: {},
  props: {},
  data() {
    return {
      assetsChgForm: {},
      assetsList: [],
      id: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    initData(id) {
      var url = "/assets/assetsChange/" + id;
      this.axios.get(url).then(res => {
        if (res.success) {
          var temp = {};
          temp = this.Utils.copyObj(res.obj);
          this.assetsList = this.Utils.copyObj(res.obj.assetsList);
          this.assetsChgForm = this.Utils.copyObj(temp);
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