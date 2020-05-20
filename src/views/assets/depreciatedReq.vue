<template>
  <div class="depreciatedReq">
    <my-pageheader titleContent="计提折旧申请"></my-pageheader>
    <my-collapse title="申请信息" class="leftAlign">
      <el-form
        ref="form"
        :rules="rules"
        :model="depreciatedReqForm"
        :status-icon="true"
        size="small"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请人" prop="createrName">
              <el-input class="length" readonly v-model="depreciatedReqForm.createrName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="折旧说明" prop="memo">
              <el-input class="length" v-model="depreciatedReqForm.memo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </my-collapse>
    <my-collapse title="资产信息" class="leftAlign">
      <el-row>
        <select-assets-reg isSimple @getVal="getVal"></select-assets-reg>
      </el-row>
      <div v-if="flag">
        <el-row>
          <el-col :span="8">资产名称：{{assetsInfo.name}}</el-col>
          <el-col :span="8">编号：{{assetsInfo.code}}</el-col>
          <el-col :span="8">规格：{{assetsInfo.norms}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">原价值（元）：{{assetsInfo.orival}}</el-col>
          <el-col :span="8">数量：{{assetsInfo.num}}</el-col>
          <el-col :span="8">残值率（%）：{{assetsInfo.salvage}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">清理费用：{{assetsInfo.cleanCost}}</el-col>
          <el-col :span="8">预计使用年限：{{assetsInfo.usefulLife}}</el-col>
          <el-col :span="8">入库地点：{{assetsInfo.storagePlace}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">入库日期：{{assetsInfo.storageTime}}</el-col>
          <el-col :span="8">资产类别：{{assetsInfo.assetsKind.name}}</el-col>
          <el-col :span="8">折旧方法：{{assetsInfo.depreMethod}}</el-col>
        </el-row>
      </div>
    </my-collapse>
    <div class="rightAlign">
      <el-button type="primary" @click="save()">暂存</el-button>
      <el-button type="primary" @click="commit('staffForm')">提交</el-button>
    </div>
  </div>
</template>

<script>
import tools from "@/commonJs/searchTools.js";
import selectAssetsReg from "@/views/assets/selectAssetsReg.vue";

export default {
  name: "depreciatedReq",
  components: {
    selectAssetsReg
  },
  props: {},
  data() {
    return {
      depreciatedReqForm: {
        createrName: "",
        memo: "",
        assetsId: ""
      },
      assetsInfo: {},
      rules: {},
      pickerOptions: tools.pickerOptionsDay,
      flag: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    getVal(val) {
      this.assetsInfo = this.Utils.copyObj(val[0]);
      this.depreciatedReqForm.assetsId = this.assetsInfo.id;
      this.flag = true;
    },
    arrangeData() {
      var data = {};
      data = this.Utils.copyObj(this.depreciatedReqForm);
      return data;
    },
    save() {
      var data = this.arrangeData();
      this.axios.post("/assets/saveAssetsDepreciation", data).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg,
            center: true
          });
          this.$router.push({ path: "/finance/assets/depreciatedList" });
        }
      });
    },
    commit(formName) {
      var formRefs = [this.$refs["form"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          var data = this.arrangeData();
          this.axios.post("/assets/commitAssetsDepreciation", data).then(res => {
            if (res.success) {
              this.$message({
                type: "success",
                message: res.msg,
                center: true
              });
              this.$router.push({
                path: "/finance/assets/depreciatedList"
              });
            }
          });
        }
      });
    },
     initData(id) {
      var url = "/assets/assetsDepreciation/" + id;
      this.axios.get(url).then(res => {
        if (res.success) {
          var temp = {};
          temp = this.Utils.copyObj(res.obj);
          this.depreciatedReqForm = this.Utils.copyObj(temp);
          this.assetsInfo = this.Utils.copyObj(temp.assets);
          this.flag = true;
        }
      });
    }
  },
  created() {
    if (typeof this.$route.params.id != "undefined") {
      this.showDeleteButton = true;
      this.initData(this.$route.params.id);
    } else {
      this.userInfo = this.Utils.getUser();
      this.depreciatedReqForm.createrName = this.userInfo.name;
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>