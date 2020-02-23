<template>
  <div class="payNoticeReq">
    <div>
      <my-pageheader titleContent="发起缴费"></my-pageheader>
    </div>
    <div>
      <my-collapse title="费用清单" :total="feeForm.amount+''" totalTitle="费用合计" class="leftAlign">
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
            <el-col :span="8" >
              <el-form-item label="收费金额" prop="amount">
                <el-input class="length" v-model.number="feeForm.amount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" >
              <el-form-item prop="period" :label="feeForm.feeKind.timeMold" v-if="feeForm.feeKind.timeMold">
                <el-input class="length" v-model="feeForm.period"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="缴费角色" prop="role">
                <el-select class="length" multiple v-model="feeForm.role" placeholder="请选择缴费的角色">
                  <el-option
                    v-for="item in feeForm.feeKind.roleList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  <el-row>
                    <el-col :span="12">{{ item.name }}</el-col>
                    <el-col :span="12" class="rightAlign">共34人</el-col>
                  </el-row>
                  </el-option>
                </el-select>
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
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="摘要">
                <el-input class="length" v-model="feeForm.memo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
        if (Object.keys(value).length  == 0) {
          callback(new Error('请选择费用类别'));
        } else {
             callback();
        }
    };
    var validatePeriod = (rule, value, callback) => {
        if (value.length!=0) {
          callback();
        } else {
          callback(new Error('请填写'+this.feeForm.feeKind.timeMold));
        }
    };
    return {
      feeKindList: [
        {
          id: "1",
          timeMold: "学年",
          name: "理科类学费",
          amount: "7562.00",
          roleList: [{ id: "1", name: "理科类学生" }]
        },
        {
          id: "2",
          timeMold: "学年",
          name: "文科类学费",
          amount: "8000.00",
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
          ]
        },
        {
          id: "4",
          timeMold: "年份",
          name: "宿舍费",
          amount: "100.00",
          roleList: [
            { id: "1", name: "理科类学生" },
            { id: "2", name: "文科类学生" },
            { id: "3", name: "艺术类学生" }
          ]
        },
        {
          id: "5",
          timeMold: "季度",
          name: "水费",
          amount: "10.00",
          roleList: [
            { id: "1", name: "理科类学生" },
            { id: "2", name: "文科类学生" },
            { id: "3", name: "艺术类学生" }
          ]
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
        period: "" ,//期间
        amount:""
      },
      rules: {
        name: [{ required: true, message: "请输入费用名称", trigger: "blur" }],
        timeMold: [
          { required: true, message: "请输入费用时间单位", trigger: "blur" }
        ],
        role: [
          { required: true, message: "请选择缴费的角色", trigger: "change" }
        ],
        deadline: [
          { required: true, message: "请选择缴费期限", trigger: "change" }
        ],
        org: [{ required: true, message: "请选择收费机构", trigger: "change" }],
        feeKind: [
          {required:true,validator:validateFeeKind,trigger: "change" }
        ],
        period:[
          {required:true,validator:validatePeriod,trigger: "blur" }
        ],
        amount: [
          { required: true, message: "请输入应收金额", trigger: "blur" },
          { type: "number", message: "应收金额必须为数字值" }
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
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.feeForm)
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    commit(formName) {}
  },
  created() {},
  mounted() {
    this.$watch("feeForm.feeKind", function(newVal, oldVal) {
      if (!newVal) {
        this.feeForm.role = [];
      }
      this.feeForm.amount = parseFloat(newVal.amount);
    });
  }
};
</script>
<style scoped>
</style>