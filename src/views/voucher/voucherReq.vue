<template>
  <div class="voucherReq">
    <my-pageheader titleContent="凭证录入"></my-pageheader>
    <my-collapse title="凭证信息" class="leftAlign">
      <el-form
        label-width="90px"
        ref="form"
        :rules="rules"
        :model="voucherReqForm"
        :status-icon="true"
        size="small"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="制单人" prop="originator">
              <el-input class="length" readonly v-model="voucherReqForm.originator"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="记账日期" prop="bizDate">
              <el-date-picker
                v-model="voucherReqForm.bizDate"
                align="right"
                type="date"
                style="width:250px"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="摘要" prop="memo">
              <el-input class="length" v-model="voucherReqForm.memo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="会计期间" prop="accountPeriod">
              <el-input class="length" readonly v-model="voucherReqForm.accountPeriod"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="业务类型" prop="bizType">
              <el-input class="length" v-model="voucherReqForm.bizType"></el-input>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="交易类型">
              <el-radio-group v-model="voucherReqForm.dealType">
                <el-radio label="OTHER">其他业务</el-radio>
                <el-radio label="CASH">现金业务</el-radio>
                <el-radio label="BANK">银行业务</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </my-collapse>
    <my-collapse title="分录信息" class="leftAlign">
      <el-row>
        <el-col :span="24" class="rightAlign">
          <el-button type="primary" @click="addEntry" class="addButton" size="small">新增</el-button>
        </el-col>
      </el-row>
      <el-form
        ref="voucherReqForm"
        label-width="90px"
        :model="voucherReqForm"
        :status-icon="true"
        size="small"
      >
        <div v-for="(entry,index) in voucherReqForm.entryList" :key="entry.id">
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="借方科目"
                :prop="'entryList.' + index + '.debitAccount'"
                :rules="rules.debitAccount"
              >
                <select-account v-model="entry.debitAccount" height="32" width="250px"></select-account>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="借方金额"
                :prop="'entryList.' + index + '.debitAmt'"
                :rules="rules.debitAmt"
              >
                <el-input class="length" v-model.number="entry.debitAmt"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="贷方科目"
                :prop="'entryList.' + index + '.creditAccount'"
                :rules="rules.creditAccount"
              >
                <select-account v-model="entry.creditAccount" height="32" width="250px"></select-account>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="贷方金额"
                :prop="'entryList.' + index + '.creditAmt'"
                :rules="rules.creditAmt"
              >
                <el-input class="length" v-model.number="entry.creditAmt"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="rightAlign">
            <el-button type="danger" @click="deleteEntry(index)" size="small">删除</el-button>
          </div>
          <el-divider></el-divider>
        </div>
      </el-form>
    </my-collapse>
    <my-collapse title="附件信息" class="leftAlign">
      <el-form :model="voucherReqForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="附件">
              <upload module="voucher" :needUpload="true"></upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </my-collapse>
    <div class="rightAlign">
      <el-button type="primary" @click="save()">暂存</el-button>
      <el-button type="primary" @click="commit('staffForm')">提交</el-button>
    </div>
  </div>
</template>

<script>
import tools from "@/commonJs/searchTools.js";

export default {
  name: "voucherReq",
  components: {},
  props: {},
  data() {
    return {
      voucherReqForm: {
        originator: "",
        memo: "",
        entryList: [],
        accountPeriod: "",
        bizType: "",
        dealType: "OTHER",
        bizDate: ""
      },
      rules: {
        bizDate: [
          { required: true, message: "请选择记账日期", trigger: "change" }
        ],
        memo: [{ required: true, message: "请输入摘要", trigger: "blur" }],
        debitAccount: [
          { required: true, message: "请选择借方科目", trigger: "change" }
        ],
        creditAccount: [
          { required: true, message: "请选择贷方科目", trigger: "change" }
        ],
        debitAmt: [
          { required: true, message: "请输入借方金额", trigger: "blur" },
          { type: "number", message: "借方金额必须为数字值" }
        ],
        creditAmt: [
          { required: true, message: "请输入贷方金额", trigger: "blur" },
          { type: "number", message: "贷方金额必须为数字值" }
        ]
      },
      pickerOptions: tools.pickerOptionsDay,
      fileList: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    addEntry() {
      var entry = {
        debitAccount: "",
        creditAccount: "",
        debitAmt: "",
        creditAmt: ""
      };
      this.voucherReqForm.entryList.push(entry);
    },
    deleteEntry(index) {
      this.voucherReqForm.entryList.splice(index, 1);
    },
    initData(id) {
      var url = "/voucher/voucher/" + id;
      this.axios.get(url).then(res => {
        if (res.success) {
          var voucherReqForm = {};
          voucherReqForm = this.Utils.copyObj(res.obj);
          voucherReqForm.originator = res.obj.originatorName;
          var debitAccountList = res.obj.accountTempList.filter(
            item => item.direction === "DEBIT"
          );
          var creditAccountList = res.obj.accountTempList.filter(
            item => item.direction === "CREDIT"
          );
          voucherReqForm.entryList = [];
          for (var i = 0; i < debitAccountList.length; i++) {
            var entry = {
              debitAccount: "",
              creditAccount: "",
              debitAmt: "",
              creditAmt: ""
            };
            entry.debitAccount = debitAccountList[i].accountId;
            entry.debitAmt = debitAccountList[i].debitAmt;
            entry.creditAccount = creditAccountList[i].accountId;
            entry.creditAmt = creditAccountList[i].creditAmt;
            voucherReqForm.entryList.push(entry);
          }
          this.voucherReqForm = voucherReqForm;
        }
      });
    },
    arrangeData() {
      var data = this.Utils.copyObj(this.voucherReqForm);
      var accountTempList = [];
      var debitTotal = 0;
      var creditTotal = 0;
      this.userInfo = this.Utils.getUser();
      data.originator = this.userInfo.id;
      data.entryList.forEach(item => {
        var debitTemp = {};
        debitTemp.accountId = item.debitAccount;
        debitTemp.debitAmt = item.debitAmt;
        debitTemp.direction = "DEBIT";
        debitTotal += item.debitAmt;
        var creditTemp = {};
        creditTemp.accountId = item.creditAccount;
        creditTemp.creditAmt = item.creditAmt;
        creditTemp.direction = "CREDIT";
        creditTotal += item.creditAmt;
        accountTempList.push(debitTemp);
        accountTempList.push(creditTemp);
      });
      data.debitTotal = debitTotal;
      data.creditTotal = creditTotal;
      data.accountTempList = accountTempList;
      data.bizDate = this.Utils.timestampToDate(this.voucherReqForm.bizDate);
      return data;
    },
    save() {
      var data = this.arrangeData();
      this.axios.post("/voucher/saveVoucher", data).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg,
            center: true
          });
          this.$router.push({ path: "/finance/voucher/voucherList" });
        }
      });
    },
    commit(formName) {
      var formRefs = [this.$refs["voucherReqForm"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          var data = this.arrangeData();
          if (data.debitTotal != data.creditTotal) {
            this.$message({
              type: "error",
              message: "会计科目借贷不平！！",
              center: true
            });
          } else {
            this.axios.post("/voucher/commitVoucher", data).then(res => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: res.msg,
                  center: true
                });
                this.$router.push({ path: "/finance/voucher/voucherList" });
              }
            });
          }
        }
      });
    }
  },
  created() {
    if (typeof this.$route.params.id != "undefined") {
      this.showDeleteButton = true;
      this.initData(this.$route.params.id);
    } else {
      var sysParam = this.Utils.getSysParam();
      this.voucherReqForm.accountPeriod = sysParam.nowAccountPeriod;
      this.userInfo = this.Utils.getUser();
      this.voucherReqForm.originator = this.userInfo.name;
    }
  },
  mounted() {}
};
</script>
<style scoped>
.addButton {
  margin-bottom: 10px;
}
</style>