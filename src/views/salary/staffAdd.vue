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
            <el-form-item label="所属部门" label-width="90px" prop="org">
              <el-select class="length" clearable v-model="staffForm.org" placeholder="请选择所属部门">
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
            <!-- <el-form-item label="职工分类" prop="staffType">
              <el-select
                class="length"
                clearable
                placeholder="请选择职工分类"
                v-model="staffForm.staffType"
              >
                <el-option
                  v-for="item in staffkind"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>-->
            <el-form-item label="所属岗位" label-width="90px" prop="station">
              <el-cascader
                placeholder="请选择所属岗位"
                :options="station"
                filterable
                clearable
                class="length"
                v-model="staffForm.station"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职称" label-width="90px" prop="postTitle">
              <el-cascader
                placeholder="请选择职称"
                :options="station"
                filterable
                clearable
                class="length"
                v-model="staffForm.postTitle"
              ></el-cascader>
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
    <my-collapse title="工资单信息" class="leftAlign" v-if="staffForm.station">
      <el-form
        ref="payStubForm"
        :rules="rules"
        :model="payStubForm"
        label-width="80px"
        :status-icon="true"
        size="small"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="工资单" label-width="90px" prop="payStubId">
              <el-select
                class="length"
                clearable
                v-model="payStubForm.payStubId"
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
            <el-form-item label="基础工资计算公式" label-width="90px" prop="postWageFormula">
              <el-input class="length" readonly v-model="payStubForm.postWageFormula"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="浮动工资计算公式" label-width="90px" prop="postWageFormula">
              <el-input class="length" readonly v-model="payStubForm.postWageFormula"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
          <el-col :span="8">
            <el-form-item label="基础工资速算" label-width="90px" prop="postWageAmount">
              <el-input class="length" readonly v-model="payStubForm.postWageAmount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            
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
        <div v-for="(bank,index) in staffForm.bankList" :key="bank.id">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="账户类型"
                :prop="'bankList.' + index + '.accountType'"
                :rules="bankRules.accountType"
              >
                <el-select
                  class="length"
                  clearable
                  placeholder="请选择账户类型"
                  v-model="bank.accountType"
                >
                  <el-option
                    v-for="item in staffkind"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="开户银行"
                :prop="'bankList.' + index + '.bankName'"
                :rules="bankRules.bankName"
              >
                <el-input class="length" v-model="bank.bankName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="分行名"
                :prop="'bankList.' + index + '.subbranch'"
                :rules="bankRules.subbranch"
              >
                <el-input class="length" v-model="bank.subbranch"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="户名"
                :prop="'bankList.' + index + '.accountName'"
                :rules="bankRules.accountName"
              >
                <el-input class="length" v-model="bank.accountName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="银行账号"
                :prop="'bankList.' + index + '.accountNumber'"
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
      <el-button type="primary" @click="save()">暂存</el-button>
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
        sex: "", //性别
        degree: "", //学历
        cardNumber: "", //证件号码
        entryDate: "", //入职日期
        bankList: [
          {
            bankName: "",
            accountNumber: "",
            subbranch: "",
            accountName: "",
            accountType: ""
          }
        ], //银行信息维护
        org: "", //部门信息
        staffType: "", //职工分类
        station: "", //岗位
        postTitle: "", //职称
        mobile: "",
        mail: "",
        userName: "" //用户名
      },
      //职工分类
      staffkind: [
        {
          id: "1",
          name: "高级管理类"
        },
        {
          id: "2",
          name: "教师类"
        },
        {
          id: "3",
          name: "职能管理类"
        },
        {
          id: "4",
          name: "其它类"
        }
      ],
      orgList: [
        { id: "1", name: "仲恺农业工程学院" },
        { id: "3", name: "物业管理处" },
        { id: "4", name: "人事处" },
        { id: "5", name: "财务管理处" },
        { id: "6", name: "校长办公室" }
      ],
      station: [
        {
          label: "高级管理类",
          value: "1",
          children: [
            { value: "1", label: "校长" },
            { value: "2", label: "副校长" },
            {
              value: "3",
              label: "名誉校长"
            }
          ]
        },
        {
          label: "教师类",
          value: "2",
          children: [
            { value: "4", label: "教授" },
            { value: "5", label: "信息与计算科学老师" }
          ]
        },
        {
          label: "职能管理类",
          value: "3",
          children: [
            { value: "6", label: "教务员" },
            { value: "7", label: "财务管理员" }
          ]
        },
        {
          label: "其它类",
          value: "4",
          children: [
            { value: "8", label: "校车司机" },
            { value: "9", label: "食堂大妈" },
            { value: "10", label: "保安" }
          ]
        }
      ],
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
        org: [{ required: true, message: "请选择所属部门", trigger: "change" }],
        staffType: [
          { required: true, message: "请选择职工分类", trigger: "change" }
        ],
        station: [
          { required: true, message: "请选择所属岗位", trigger: "change" }
        ],
        entryDate: [
          { required: true, message: "请选择入职日期", trigger: "change" }
        ]
      },
      bankRules: {
        accountType: [
          { required: true, message: "请选择账户类型", trigger: "change" }
        ],
        bankName: [
          { required: true, message: "请输入开户银行", trigger: "change" }
        ],
        subbranch: [
          { required: true, message: "请输入分行名", trigger: "change" }
        ],
        accountName: [
          { required: true, message: "请输入户名", trigger: "change" }
        ],
        accountNumber: [
          { required: true, message: "请输入银行账号", trigger: "change" }
        ]
      },
      payStubForm: {
        payStubId: "",
        postWageFormula: "",
        floatWageFormula: "",
        stationLv: "",
        scaleLv: "",
        postWageAmount: ""
      },
      payStubList: [
        {
          id: 1,
          scope: "教师类", //适用范围
          name: "教师类工资单",
          postWageFormula: "住房补贴+餐费补贴",
          floatWageFormula: "住房补贴+餐费补贴",
          amount: 220
        },
        {
          id: 2,
          scope: "高级管理类",
          postWageFormula: "住房补贴+餐费补贴+交通补贴",
          floatWageFormula: "住房补贴+餐费补贴+交通补贴",
          name: "高级管理类工资单",
          amount: 220
        },
        {
          id: 3,
          scope: "职能管理类",
          postWageFormula: "住房补贴+餐费补贴+交通补贴",
          floatWageFormula: "住房补贴+餐费补贴+交通补贴",
          name: "职能管理类工资单",
          amount: 220
        },
        {
          id: 4,
          scope: "其他类",
          postWageFormula: "住房补贴+餐费补贴+交通补贴",
          floatWageFormula: "住房补贴+餐费补贴+交通补贴",
          name: "其他类工资单",
          amount: 220
        }
      ],
      postWageList: [
        {
          id: "1",
          type: "教师类",
          stationAmount: 1000, //岗位工资标准
          stationStage: 10, //岗位工资级数
          stationGrad: 200, //岗位工资级差
          scaleAmount: 220, //薪级工资标准
          scaleStage: 10, //薪级工资级数
          scaleGrad: 200 //薪级工资级差
        },
        {
          id: "2",
          type: "高级管理类",
          stationAmount: 1000, //岗位工资标准
          stationStage: 10, //岗位工资级数
          stationGrad: 200, //岗位工资级差
          scaleAmount: 220, //薪级工资标准
          scaleStage: 10, //薪级工资级数
          scaleGrad: 200 //薪级工资级差
        },
        {
          id: "3",
          type: "职能管理类",
          stationAmount: 1000, //岗位工资标准
          stationStage: 10, //岗位工资级数
          stationGrad: 200, //岗位工资级差
          scaleAmount: 220, //薪级工资标准
          scaleStage: 10, //薪级工资级数
          scaleGrad: 200 //薪级工资级差
        },
        {
          id: "4",
          type: "其他类",
          stationAmount: 1000, //岗位工资标准
          stationStage: 10, //岗位工资级数
          stationGrad: 200, //岗位工资级差
          scaleAmount: 220, //薪级工资标准
          scaleStage: 10, //薪级工资级数
          scaleGrad: 200 //薪级工资级差
        }
      ],
      stationWageOptions: [],
      scaleWageOptions: [],
      scaleAmount: 0,
      stationAmount: 0
    };
  },
  watch: {},
  computed: {},
  methods: {
    save(formName) {
      var formRefs = [this.$refs["staffForm"], this.$refs["bank"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          alert("submit");
        } else {
          alert("error");
        }
      });
    },
    commit(formName) {},
    addBank() {
      var bank = {
        bankName: "",
        accountNumber: "",
        subbranch: "",
        accountName: "",
        accountType: ""
      };
      this.staffForm.bankList.push(bank);
    },
    deleteBank(index) {
      this.staffForm.bankList.splice(index, 1);
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
        this.payStubForm.postWageFormula = payStub.postWageFormula;
        this.payStubForm.floatWageFormula = payStub.floatWageFormula;
        var postWage = this.Utils.findObj(
          this.postWageList,
          "type",
          payStub.scope
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
    checkedScaleLv(val){
      if(this.payStubForm.postWageAmount != 0 || !val){
        this.payStubForm.postWageAmount -= this.scaleAmount;
        if(!val){
          this.scaleAmount = 0;
        }
      }
      if(val){
      var scaleWage = this.Utils.findObj(this.scaleWageOptions,'level',val);
      this.scaleAmount = scaleWage.amount;
      this.payStubForm.postWageAmount += scaleWage.amount;
      }
    },
    checkedStationLv(val){
      if(this.payStubForm.postWageAmount != 0 || !val){
        this.payStubForm.postWageAmount -= this.stationAmount;
        if(!val){
          this.stationAmount = 0;
        }
      }
      if(val){
      var stationWage = this.Utils.findObj(this.stationWageOptions,'level',val);
      this.stationAmount = stationWage.amount;
      this.payStubForm.postWageAmount += stationWage.amount;
      }
     
    }
  },
  created() {
    if (this.$route.params.id != undefined) {
      this.title = "编辑职工";
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