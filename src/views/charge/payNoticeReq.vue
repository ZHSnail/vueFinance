<template>
  <div class="payNoticeReq">
    <div>
      <my-pageheader titleContent="发起缴费"></my-pageheader>
    </div>
    <div>
      <my-collapse title="费用清单" :total="feeForm.totalAmount+''" totalTitle="费用合计" class="leftAlign">
        <el-form
          ref="feeForm"
          :rules="rules"
          :model="feeForm"
          label-width="80px"
          :status-icon="true"
          size="small"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="费用类别" prop="feeKind">
                <el-select
                  class="length"
                  clearable
                  value-key="id"
                  v-model="feeForm.feeKind"
                  placeholder="请选择费用类别"
                >
                  <el-option
                    v-for="item in feeKindList"
                    :key="item.id"
                    :label="item.name"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收费金额" prop="amount">
                <el-input class="length" v-model.number="feeForm.amount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="缴费期限" prop="deadline">
                <el-date-picker
                  style="width:250px"
                  v-model="feeForm.deadline"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  :default-time="['00:00:00', '23:59:59']"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="缴费专业"
                prop="feeScope"
                v-if="feeForm.feeKind.feeMethod == 'MAJOR'"
              >
                <el-cascader
                  placeholder="请选择需要缴费的专业"
                  :options="majorList"
                  :props="{ multiple: true }"
                  filterable
                  clearable
                  class="length"
                  v-model="feeForm.feeScope"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="缴费宿舍" prop="feeScope" v-if="feeForm.feeKind.feeMethod == 'DORM'">
                <el-select
                  class="length"
                  multiple
                  placeholder="请选择需要缴费的宿舍"
                  v-model="feeForm.feeScope"
                  value-key="id"
                >
                  <el-option
                    v-for="item in dormList"
                    :key="item.id"
                    :label="item.buildingNo"
                    :value="item"
                  >
                    <el-row>
                      <el-col :span="12">{{ item.buildingNo }}</el-col>
                      <el-col :span="12" class="rightAlign">共{{ " "+item.total+" " }}人</el-col>
                    </el-row>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="会计科目" v-if="feeForm.feeKind.account" prop="account">
                <el-input
                  class="length"
                  v-model="feeForm.feeKind.account.accountName"
                  :readonly="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                prop="period"
                :label="feeForm.feeKind.timeMold"
                v-if="feeForm.feeKind.timeMold"
              >
                <el-input class="length" v-model="feeForm.period"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="收费机构" prop="org">
                <el-input class="length" v-model="feeForm.org"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="摘要">
                <el-input class="length" v-model="feeForm.memo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="totalUser rightAlign">
          <div class="inline">当前选择缴费人数：{{feeForm.totalUser}} &nbsp;人</div>
        </div>
      </my-collapse>
    </div>
    <div class="rightAlign">
      <el-button type="primary" @click="save()">暂存</el-button>
      <el-button type="primary" @click="commit('feeForm')">提交</el-button>
    </div>
  </div>
</template>

<script>
import "@/assets/css/charge/payNoticeReq.css";

export default {
  name: "payNoticeReq",
  components: {},
  props: {},
  data() {
    var validateFeeKind = (rule, value, callback) => {
      if (this.Utils.isEmptyObj(value)) {
        callback(new Error("请选择费用类别"));
      } else {
        callback();
      }
    };
    var validatePeriod = (rule, value, callback) => {
      if (value.length != 0) {
        callback();
      } else {
        callback(new Error("请填写" + this.feeForm.feeKind.timeMold));
      }
    };
    var validateFeeScope = (rule, value, callback) => {
      if (value.length != 0) {
        callback();
      } else {
        var msg = {
          MAJOR: "请选择需要缴费的专业",
          DORM: "请选择需要缴费的宿舍",
          ROLE: "请选择需要缴费的角色"
        };
        var field = this.feeForm.feeKind.feeMethod;
        callback(new Error(msg[field]));
      }
    };
    return {
      feeKindList: [],
      orgList: [
        { id: "1", name: "仲恺农业工程学院" },
        { id: "2", name: "物业管理处" }
      ],
      feeForm: {
        memo: "", //摘要
        deadline: [], //缴费期限
        org: "", //收费机构
        feeKind: {}, //费用类别
        period: "", //期间
        amount: "", //收费金额
        total: "", //总金额
        feeScope: [], //收费的范围，
        totalAmount: 0,
        totalUser: 0
      },
      rules: {
        name: [{ required: true, message: "请输入费用名称", trigger: "blur" }],
        timeMold: [
          { required: true, message: "请输入费用时间单位", trigger: "blur" }
        ],
        deadline: [
          { required: true, message: "请选择缴费期限", trigger: "change" }
        ],
        org: [{ required: true, message: "请选择收费机构", trigger: "change" }],
        feeKind: [
          { required: true, validator: validateFeeKind, trigger: "change" }
        ],
        period: [
          { required: true, validator: validatePeriod, trigger: "blur" }
        ],
        amount: [
          { required: true, message: "请输入收费金额", trigger: "blur" },
          { type: "number", message: "收费金额必须为数字值" }
        ],
        feeScope: [
          { required: true, validator: validateFeeScope, trigger: "change" }
        ]
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      dormList: [],
      majorList: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    save() {
      var data = this.Utils.copyObj(this.feeForm);
      //按专业选
      if (this.feeForm.feeKind.feeMethod == "MAJOR") {
        var tempFeeScope = [];
        for (var i = 0; i < this.feeForm.feeScope.length; i++) {
          var temp = this.feeForm.feeScope[i][2];
          tempFeeScope.push(temp);
        }
        data.feeScope = tempFeeScope;
      }
      data.feeKindList = this.feeForm.feeKind;
      data.deadLineMin = this.Utils.timestampToDate(this.feeForm.deadline[0]);
      data.deadLineMax = this.Utils.timestampToDate(this.feeForm.deadline[0]);
      this.axios.post("/charge/savePayNotice", data).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg,
            center: true
          });
        }
      });
    },
    commit(formName) {},
    //解析级联选择器中的选中值。提交时也需要整理级联选择器的值
    parseMajor(feeScope) {
      var trueValue = [];
      feeScope.forEach(array => {
        trueValue.push(array[2]);
      });
      return trueValue;
    },
    getTotalUser(feeScope) {
      var temp = 0;
      var tempList = feeScope;
      //按专业选
      if (this.feeForm.feeKind.feeMethod == "MAJOR") {
        tempList = this.parseMajor(feeScope);
      }
      tempList.forEach(obj => {
        temp += parseInt(obj.total);
      });
      this.feeForm.totalUser = temp;
      this.feeForm.totalAmount = this.feeForm.totalUser * this.feeForm.amount;
    },
    getFeeKindList() {
      var url = "/charge/allFeeKind";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.feeKindList = res.obj;
        }
      });
    },
    findProfessionList() {
      var url = "/charge/proObjSelect";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.majorList = res.obj;
        }
      });
    },
    findDormList() {
      var url = "/charge/dormInfos";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.dormList = res.obj;
          this.dormList.forEach(item => {
            item.buildingNo = item.buildNumber + "栋" + item.dormNumber;
          });
        }
      });
    }
  },
  created() {
    this.getFeeKindList();
    this.findProfessionList();
    this.findDormList();
  },
  mounted() {
    //去除选择框的值
    this.$watch("feeForm.feeKind", function(newVal, oldVal) {
      if (!newVal || newVal != oldVal) {
        this.feeForm.feeScope = [];
        this.$refs["feeForm"].clearValidate();
        this.feeForm.totalUser = 0;
        this.feeForm.totalAmount = 0;
      }
    });
    //动态算总人数
    this.$watch("feeForm.feeScope", function(newVal, oldVal) {
      if (!this.Utils.isEmptyObj(newVal)) {
        this.getTotalUser(newVal);
      } else {
        this.feeForm.totalUser = 0;
        this.feeForm.totalAmount = 0;
      }
    });
    //动态算总人数
    this.$watch("feeForm.amount", function(newVal, oldVal) {
      this.feeForm.totalAmount = newVal * this.feeForm.totalUser;
    });
  }
};
</script>
<style scoped>
</style>