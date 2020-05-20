<template>
  <div class="staffAdd">
    <my-pageheader :titleContent="title"></my-pageheader>
    <my-collapse title="人员信息" class="leftAlign">
      <el-form
        ref="staffForm"
        :rules="rules"
        :model="staffForm"
        label-width="80px"
        :status-icon="true"
        size="small"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="职工号" label-width="90px" prop="staffNumber">
              <el-input class="length" v-model="staffForm.staffNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职工姓名" label-width="90px" prop="name">
              <el-input class="length" v-model="staffForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码" label-width="90px" prop="cardNumber">
              <el-input class="length" v-model="staffForm.cardNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="学历" label-width="90px" prop="degree">
              <el-input class="length" v-model="staffForm.degree"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码" label-width="90px" prop="mobile">
              <el-input class="length" v-model="staffForm.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮箱" label-width="90px" prop="mail">
              <el-input class="length" v-model="staffForm.mail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所属部门" label-width="90px" prop="orgId">
              <el-select class="length" clearable v-model="staffForm.orgId" placeholder="请选择所属部门">
                <el-option
                  v-for="item in orgList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属岗位" label-width="90px" prop="stationInfoId">
              <el-select class="length" clearable v-model="staffForm.stationInfoId" placeholder="请选择所属岗位">
                <el-option
                  v-for="item in station"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职称" label-width="90px" prop="postTitle">
              <el-input class="length" v-model="staffForm.postTitle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="入职日期" label-width="90px" prop="entryDate">
              <el-date-picker
                v-model="staffForm.entryDate"
                align="right"
                type="date"
                style="width:250px"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="userName" label-width="90px">
              <span slot="label">
                <el-tooltip content="不填写则系统自动分配账号，账号为职工姓名的拼音字母" placement="bottom" effect="light">
                  <i class="el-icon-warning-outline" style="color:#F00"></i>
                </el-tooltip>
                <span>系统账号</span>
              </span>
              <el-input class="length" v-model="staffForm.userName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </my-collapse>
    <my-collapse title="工资单信息" class="leftAlign">
      <el-form
        ref="payStubForm"
        :rules="payStubRules"
        :model="payStubForm"
        label-width="80px"
        :status-icon="true"
        size="small"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="工资单" label-width="90px" prop="payStubInfoId">
              <el-select
                class="length"
                clearable
                v-model="payStubForm.payStubInfoId"
                @change="checkedPayStub"
                placeholder="请选择工资单"
              >
                <el-option
                  v-for="item in payStubList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
         <el-col :span="8">
            <el-form-item label="岗位等级" label-width="90px" prop="stationLv">
              <el-select
                class="length"
                placeholder="请选择岗位等级"
                v-model="payStubForm.stationLv"
                clearable
                @change="checkedStationLv"
              >
                <el-option
                  v-for="item in stationWageOptions"
                  :label="item.name"
                  :key="item.level"
                  :value="item.level"
                >
                  <el-row>
                    <el-col :span="12">{{ item.name }}</el-col>
                    <el-col :span="12" class="rightAlign">金额：{{ item.amount+" " }}元</el-col>
                  </el-row>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="薪级等级" label-width="90px" prop="scaleLv">
              <el-select
                class="length"
                placeholder="请选择薪级等级"
                v-model="payStubForm.scaleLv"
                clearable
                @change="checkedScaleLv"
              >
                <el-option
                  v-for="item in scaleWageOptions"
                  :label="item.name"
                  :key="item.level"
                  :value="item.level"
                >
                  <el-row>
                    <el-col :span="12">{{ item.name }}</el-col>
                    <el-col :span="12" class="rightAlign">金额：{{ item.amount+" " }}元</el-col>
                  </el-row>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="基础工资速算" label-width="90px" prop="postWageAmount">
              <el-input class="length" readonly  v-model="payStubForm.postWageAmount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </my-collapse>
    <my-collapse title="银行信息" class="leftAlign">
      <el-row>
        <el-col :span="24" class="rightAlign">
          <el-button type="primary" @click="addBank" class="addButton" size="small">新增</el-button>
        </el-col>
      </el-row>
      <el-form ref="bank" :model="staffForm" label-width="80px" :status-icon="true" size="small">
        <div v-for="(bank,index) in staffForm.bankInfoList" :key="bank.id">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="账户类型"
                :prop="'bankInfoList.' + index + '.accounttype'"
                :rules="bankRules.accounttype"
              >
                <el-input class="length" v-model="bank.accounttype"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="开户银行"
                :prop="'bankInfoList.' + index + '.name'"
                :rules="bankRules.name"
              >
                <el-input class="length" v-model="bank.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="分行名"
                :prop="'bankInfoList.' + index + '.subBranch'"
                :rules="bankRules.subBranch"
              >
                <el-input class="length" v-model="bank.subBranch"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="户名"
                :prop="'bankInfoList.' + index + '.accountname'"
                :rules="bankRules.accountname"
              >
                <el-input class="length" v-model="bank.accountname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="银行账号"
                :prop="'bankInfoList.' + index + '.accountNumber'"
                :rules="bankRules.accountNumber"
              >
                <el-input class="length" v-model="bank.accountNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="rightAlign">
            <el-button type="danger" @click="deleteBank(index)" size="small">删除</el-button>
          </div>
          <el-divider></el-divider>
        </div>
      </el-form>
    </my-collapse>
    <div class="rightAlign">
      <el-button type="primary" @click="commit('staffForm')">提交</el-button>
    </div>
  </div>
</template>

<script>
import tools from "@/commonJs/searchTools.js";

export default {
  name: "staffAdd",
  components: {},
  props: {},
  data() {
    return {
      title: "",
      staffForm: {
        staffNumber: "",
        name: "", //姓名
        degree: "", //学历
        cardNumber: "", //证件号码
        entryDate: "", //入职日期
        bankInfoList: [
          {
            name: "",
            accountNumber: "",
            subBranch: "",
            accountname: "",
            accounttype: ""
          }
        ], //银行信息维护
        orgId: "", //部门信息
        stationInfoId: "", //岗位
        postTitle: "", //职称
        mobile: "",
        mail: "",
        userName: "" //用户名
      },
      orgList: [],
      station: [],
      pickerOptions: tools.pickerOptionsDay,
      rules: {
        name: [
          { required: true, message: "请输入职工姓名", trigger: "change" }
        ],
        staffNumber: [
          { required: true, message: "请输入职工号", trigger: "change" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "change" }
        ],
        mail: [
          { required: true, message: "请输入电子邮箱", trigger: "change" }
        ],
        orgId: [
          { required: true, message: "请选择所属部门", trigger: "change" }
        ],
        stationInfoId: [
          { required: true, message: "请选择所属岗位", trigger: "change" }
        ],
        entryDate: [
          { required: true, message: "请选择入职日期", trigger: "change" }
        ]
      },
      bankRules: {
        accounttype: [
          { required: true, message: "请选择账户类型", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入开户银行", trigger: "change" }
        ],
        subBranch: [
          { required: true, message: "请输入分行名", trigger: "change" }
        ],
        accountname: [
          { required: true, message: "请输入户名", trigger: "change" }
        ],
        accountNumber: [
          { required: true, message: "请输入银行账号", trigger: "change" }
        ]
      },
      payStubForm: {
        payStubInfoId: "",
        stationLv: "",
        scaleLv: "",
        postWageAmount: ""
      },
      payStubList: [],
      postWageList: [],
      stationWageOptions: [],
      scaleWageOptions: [],
      scaleAmount: 0,
      stationAmount: 0,
      payStubRules:{
        payStubInfoId: [
          { required: true, message: "请选择工资单", trigger: "change" }
        ],
        stationLv: [
          { required: true, message: "请选择岗位等级", trigger: "change" }
        ],
        scaleLv: [
          { required: true, message: "请选择薪级等级", trigger: "change" }
        ]     
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    arrangeData(){
      var data = {};
      data = this.Utils.copyObj(this.staffForm);
      data.entryDate = this.Utils.timestampToDate(data.entryDate);
      data.stationLv = this.payStubForm.stationLv;
      data.scaleLv = this.payStubForm.scaleLv;
      data.payStubInfoId = this.payStubForm.payStubInfoId;
      data.postWageAmount = this.payStubForm.postWageAmount;
      return data;
    },
    commit(formName) {
      var formRefs = [this.$refs["staffForm"], this.$refs["bank"], this.$refs["payStubForm"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          var data = this.arrangeData();
          if(this.$route.params.id != undefined){
              this.axios.put("/salary/staffInfo", data).then(res => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: res.msg,
                  center: true
                });
                this.$router.push({
                  path: "/finance/salary/staffInfo"
                });
              }
            });
          }else{
            this.axios.post("/salary/staffInfo", data).then(res => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: res.msg,
                  center: true
                });
                this.$router.push({
                  path: "/finance/salary/staffInfo"
                });
              }
            });
          }          
        }
      });
    },
    addBank() {
      var bank = {
        name: "",
        accountNumber: "",
        subBranch: "",
        accountname: "",
        accounttype: ""
      };
      this.staffForm.bankInfoList.push(bank);
    },
    deleteBank(index) {
      this.staffForm.bankInfoList.splice(index, 1);
    },
    arrangeVal(stage, grad, amount) {
      var options = [];
      for (var i = 0; i < stage; i++) {
        var obj = {};
        obj.level = i + 1;
        obj.amount = amount + i * grad;
        obj.name = i + 1 + "级";
        options.push(obj);
      }
      return options;
    },
    checkedPayStub(val) {
      if (!val) {
        this.Utils.clearObj(this.payStubForm);
        this.stationWageOptions = [];
        this.scaleWageOptions = [];
      } else {
        var payStub = this.Utils.findObj(this.payStubList, "id", val);
        var postWage = this.Utils.findObj(
          this.postWageList,
          "type",
          payStub.scopeName
        );
        this.stationWageOptions = this.arrangeVal(
          postWage.stationStage,
          postWage.stationGrad,
          postWage.stationAmount
        );
        this.scaleWageOptions = this.arrangeVal(
          postWage.scaleStage,
          postWage.scaleGrad,
          postWage.scaleAmount
        );
      }
    },
    checkedScaleLv(val) {
      if (this.payStubForm.postWageAmount != 0 || !val) {
        this.payStubForm.postWageAmount -= this.scaleAmount;
        if (!val) {
          this.scaleAmount = 0;
        }
      }
      if (val) {
        var scaleWage = this.Utils.findObj(this.scaleWageOptions, "level", val);
        this.scaleAmount = scaleWage.amount;
        this.payStubForm.postWageAmount += scaleWage.amount;
      }
    },
    checkedStationLv(val) {
      if (this.payStubForm.postWageAmount != 0 || !val) {
        this.payStubForm.postWageAmount -= this.stationAmount;
        if (!val) {
          this.stationAmount = 0;
        }
      }
      if (val) {
        var stationWage = this.Utils.findObj(
          this.stationWageOptions,
          "level",
          val
        );
        this.stationAmount = stationWage.amount;
        this.payStubForm.postWageAmount += stationWage.amount;
      }
    },
    findOrgList() {
      var url = "/salary/orgInfos";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.orgList = res.obj;
        }
      });
    },
    findStation() {
      var url = "/salary/stationInfos";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.station = res.obj;
        }
      });
    },
    findPostWageList() {
      var url = "/salary/scaleAndStationList";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.postWageList = res.obj;
        }
      });
    },
    findPayStubList() {
      var url = "/salary/payStubInfos";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.payStubList = res.obj;
        }
      });
    }
  },
  created() {
    this.findOrgList();
    this.findStation();
    this.findPostWageList();
    this.findPayStubList();
    if (this.$route.params.id != undefined) {
      this.title = "编辑职工";
      var url = "/salary/staffInfo/"+this.$route.params.id;
      this.axios.get(url).then(res => {
        if (res.success) {
          var temp = {};
          temp = this.Utils.copyObj(res.obj)
          this.staffForm = temp;
          this.payStubForm.payStubInfoId = temp.payStubInfoId;
          this.payStubForm.scaleLv = temp.scaleLv;
          this.payStubForm.stationLv = temp.stationLv;
          this.payStubForm.postWageAmount = temp.postWageAmount;
        }
      });
    } else {
      this.title = "添加职工";
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