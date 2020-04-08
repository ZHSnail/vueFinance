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
            <el-form-item label="申请人" prop="reqStaff">
              <el-input class="length" readonly v-model="depreciatedReqForm.reqStaff"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请日期" prop="reqDate">
              <el-date-picker
                v-model="depreciatedReqForm.reqDate"
                align="right"
                type="date"
                style="width:250px"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="折旧说明" prop="depreciatedMemo">
              <el-input class="length" v-model="depreciatedReqForm.depreciatedMemo"></el-input>
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
          <el-col :span="8">编号：{{assetsInfo.assetsCode}}</el-col>
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
          <el-col :span="8">资产类别：{{assetsInfo.kindId}}</el-col>
          <el-col :span="8">折旧方法：{{assetsInfo.depreMeth}}</el-col>
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
        reqStaff: "",
        depreciatedMemo: "",
        reqDate: "",
        assetsId: ""
      },
      assetsInfo: {},
      rules: {},
      pickerOptions: tools.pickerOptionsDay,
      flag:false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    getVal(val) {
      this.assetsInfo = this.Utils.copyObj(val[0]);
      this.depreciatedReqForm.assetsId = this.assetsInfo.id;
      this.flag = true
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>