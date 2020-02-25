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
              <el-form-item label="缴费角色" prop="feeScope" v-if="feeForm.feeKind.feeMethod == 'ROLE'">
                <el-select
                  class="length"
                  multiple
                  placeholder="请选择需要缴费的角色"
                  v-model="feeForm.feeScope"
                  value-key="id"
                >
                  <el-option
                    v-for="item in roleList"
                    :key="item.id"
                    :label="item.name"
                    :value="item"
                  >
                    <el-row>
                      <el-col :span="12">{{ item.name }}</el-col>
                      <el-col :span="12" class="rightAlign">共{{ " "+item.total+" " }}人</el-col>
                    </el-row>
                  </el-option>
                </el-select>
              </el-form-item>
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
              <el-form-item label="会计科目" v-if="feeForm.feeKind.accountList" prop="account">
                <el-select class="length" clearable placeholder="请选择会计科目" v-model="feeForm.account">
                  <el-option
                    v-for="item in feeForm.feeKind.accountList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                    <el-row>
                      <el-col :span="12">{{ item.code }}</el-col>
                      <el-col :span="12">{{ item.name }}</el-col>
                    </el-row>
                  </el-option>
                </el-select>
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
                <el-select class="length" clearable v-model="feeForm.org" placeholder="请选择收费机构">
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
      <el-button type="primary" @click="save('feeForm')">暂存</el-button>
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
      feeKindList: [
        {
          id: "1",
          timeMold: "学年",
          name: "学费",
          amount: "7562.00",
          roleList: [{ id: "1", name: "理科类学生" }],
          feeMethod: "MAJOR", // 专业。DORM 宿舍。ROLE 角色。
          accountList: [
            { id: "1", name: "行政收入", code: "4001" },
            { id: "2", name: "现金", code: "1001" }
          ]
        },
        {
          id: "2",
          timeMold: "学年",
          name: "宿舍费",
          amount: "8000.00",
          accountList: [
            { id: "1", name: "行政收入", code: "4001" },
            { id: "2", name: "现金", code: "1001" }
          ],
          feeMethod: "DORM", //MAJOR 专业。DORM 宿舍。ROLE 角色。
          roleList: [{ id: "2", name: "文科类学生" }]
        },
        {
          id: "3",
          timeMold: "月份",
          name: "电费",
          amount: "5000.00",
          roleList: [
            { id: "1", name: "理科类学生" },
            { id: "2", name: "文科类学生" },
            { id: "3", name: "艺术类学生" },
            { id: "4", name: "老师" },
            { id: "5", name: "职工" }
          ],
          accountList: [
            { id: "1", name: "行政收入", code: "4001" },
            { id: "2", name: "现金", code: "1001" }
          ],
          feeMethod: "DORM" //MAJOR 专业。DORM 宿舍。ROLE 角色。
        }
      ],
      orgList: [
        { id: "1", name: "仲恺农业工程学院" },
        { id: "2", name: "物业管理处" }
      ],
      feeForm: {
        role: [], //缴费角色
        memo: "", //摘要
        deadline: [], //缴费期限
        org: "", //收费机构
        feeKind: {}, //费用类别
        period: "", //期间
        amount: "", //收费金额
        total: "", //总金额
        account: "", //会计科目
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
        account: [
          { required: true, message: "请选择会计科目", trigger: "change" }
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
      roleList: [
        { id: "1", name: "学生", total: "34" },
        { id: "4", name: "老师", total: "60" },
        { id: "5", name: "职工", total: "70" }
      ],
      dormList: [
        { id: "1", buildingNo: "1栋", total: "34" },
        { id: "2", buildingNo: "2栋", total: "1000" },
        { id: "3", buildingNo: "3栋", total: "200" },
        { id: "4", buildingNo: "4栋", total: "6000" },
        { id: "5", buildingNo: "5栋", total: "7000" },
        { id: "6", buildingNo: "6栋", total: "34" },
        { id: "7", buildingNo: "7栋", total: "34" }
      ],
      majorList: [
        {
          label: "经济学",
          value: "经济学",
          children: [
            { value: { id: "1", total: "34" }, label: "投资学" },
            { value: { id: "2", total: "34" }, label: "国际经济与贸易" }
          ]
        },
        {
          label: "法学",
          value: "法学",
          children: [{ value: { id: "3", total: "34" }, label: "社会工作" }]
        },
        {
          label: "文学",
          value: "文学",

          children: [
            { value: { id: "4", total: "34" }, label: "英语" },
            { value: { id: "5", total: "34" }, label: "日语" },
            { value: { id: "6", total: "34" }, label: "商务英语" }
          ]
        },
        {
          label: "理学",
          value: "理学",

          children: [
            { value: { id: "7", total: "34" }, label: "信息与计算科学" },
            { value: { id: "8", total: "34" }, label: "应用化学" },
            { value: { id: "9", total: "34" }, label: "统计学" }
          ]
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.feeForm);
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    commit(formName) {},
    //解析级联选择器中的选中值。提交时也需要整理级联选择器的值
    parseMajor(feeScope) {
      var trueValue = [];
      feeScope.forEach(array => {
        trueValue.push(array[1]);
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

  },
  created() {},
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