<template>
  <div class="voucherDetail">
    <my-pageheader titleContent="凭证详情"></my-pageheader>
    <my-collapse title="基本信息" class="leftAlign">
      <el-row>
        <el-col :span="12">凭证号：{{voucherForm.code}}</el-col>
        <el-col :span="12">会计期间：{{voucherForm.accountPeriod}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">记账日期：{{voucherForm.bizDate}}</el-col>
        <el-col :span="12">摘要：{{voucherForm.memo}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12" v-if="voucherForm.bizCode">关联业务单号：{{voucherForm.bizCode}}</el-col>
        <el-col :span="12">业务类型：{{voucherForm.bizName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12" v-if="voucherForm.tickState">勾对状态：{{voucherForm.tickState}}</el-col>
        <el-col :span="12" v-if="voucherForm.tickDate">勾对日期：{{voucherForm.tickDate}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">过账状态：{{voucherForm.postingStatus}}</el-col>
        <el-col :span="12" v-if="voucherForm.postingDate">过账日期：{{voucherForm.postingDate}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">交易类型：{{voucherForm.dealName}}</el-col>
      </el-row>
    </my-collapse>
    <my-collapse title="分录信息" class="leftAlign">
      <el-row v-for="item in voucherForm.accountTempVoList" v-bind:key="item.id">
        <el-col :span="12">
          <div v-if="item.debitAmt">借方科目：{{item.account.code }} {{item.acconutName}}</div>
          <div v-if="item.creditAmt">贷方科目：{{item.account.code }} {{item.acconutName}}</div>
        </el-col>
        <el-col :span="12">
          <div v-if="item.debitAmt">借方金额：{{item.debitAmt}}</div>
          <div v-if="item.creditAmt">贷方金额：{{item.creditAmt}}</div>
        </el-col>
      </el-row>
    </my-collapse>
    <my-collapse title="附件信息" class="leftAlign">
      <upload module="voucher" :file-ids.sync="fileIds" :needDownload="true"></upload>
    </my-collapse>
    <my-collapse title="财务信息" class="leftAlign">
      <el-row>
        <el-col :span="8">制单人：{{voucherForm.originatorName}}</el-col>
        <el-col :span="8">审核人：{{voucherForm.auditerName}}</el-col>
        <el-col :span="8">记账人：{{voucherForm.keeperName}}</el-col>
      </el-row>
    </my-collapse>
    <activiti-record v-if="showRecord" workKey="voucherReq" :bizId="id"></activiti-record>
    <div class="rightAlign">
      <el-button type="danger" v-if="showRevoke" @click="revoke()">撤回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "voucherDetail",
  components: {},
  props: {},
  data() {
    return {
      id: "",
      userInfo: {},
      showRevoke: false,
      voucherForm: {},
      fileIds: [],
      showRecord: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    initData(id) {
      var url = "/voucher/voucher/" + id;
      this.axios.get(url).then(res => {
        if (res.success) {
          this.voucherForm = this.Utils.copyObj(res.obj);
          console.log(this.voucherForm)
          this.userInfo = this.Utils.getUser();
          if (this.voucherForm.bizType == "MANUAL_VOUCHER") {
            this.showRecord = true;
          }
          if (
            this.userInfo.id === this.voucherForm.originator &&
            this.voucherForm.status === "审核中" &&
            this.voucherForm.bizType === "MANUAL_VOUCHER"
          ) {
            this.showRevoke = true;
          }
          if (res.obj.fileIds && res.obj.fileIds.length > 0) {
            this.fileIds = res.obj.fileIds;
          }
          this.$forceUpdate();
        }
      });
    },
    revoke() {
      var data = {
        workKey: "voucherReq",
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
          this.$router.push({ path: "/finance/charge/payOnline" });
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