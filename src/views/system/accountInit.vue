<template>
  <div class="accountInit">
    <my-pageheader titleContent="初始化系统信息"></my-pageheader>
    <my-collapse title="当前步骤" class="leftAlign">
      <el-steps :active="active" finish-status="success">
        <el-step title="初始化系统参数"></el-step>
        <el-step title="初始化会计科目余额"></el-step>
        <el-step title="试算会计科目"></el-step>
      </el-steps>
    </my-collapse>
    <my-collapse v-if="active == 0" title="系统参数" class="leftAlign">
      <el-form
        ref="sysParam"
        :rules="rules"
        :model="sysParam"
        label-width="80px"
        :status-icon="true"
        size="small"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="当前会计期间" prop="nowAccountPeriod">
              <el-date-picker
                style="width:250px"
                v-model="sysParam.nowAccountPeriod"
                type="month"
                placeholder="选择当前会计期间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本位币" prop="baseCurrency">
              <el-input class="length" v-model="sysParam.baseCurrency"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始使用时间" prop="startTime">
              <el-date-picker
                style="width:250px"
                v-model="sysParam.startTime"
                align="right"
                type="date"
                placeholder="选择开始使用时间"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="本位币单位" prop="unit">
              <el-input class="length" v-model="sysParam.unit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </my-collapse>
    <my-collapse v-if="active == 1" title="会计科目余额初始化" class="leftAlign">
      <el-form ref="accountBalanceForm" :model="accountBalanceForm" :status-icon="true" size="mini">
        <el-table
          cell-class-name="centerAlign"
          :data="accountBalanceForm.accountBalanceList"
          stripe
          style="width: 100%"
        >
          <el-table-column align="center" prop="accountName" label="科目名称"></el-table-column>
          <el-table-column align="center" prop="accountCode" label="科目编码"></el-table-column>
          <el-table-column align="center" prop="accountType" label="科目类型">
            <template slot-scope="scope">
              <span v-if="scope.row.accountType == 'ASSETS'">资产类</span>
              <span v-if="scope.row.accountType == 'COST'">成本类</span>
              <span v-if="scope.row.accountType == 'EXPENSES'">费用类</span>
              <span v-if="scope.row.accountType == 'LIABILITIES'">负债类</span>
              <span v-if="scope.row.accountType == 'OWNER'">所有者权益类</span>
              <span v-if="scope.row.accountType == 'INCOME'">收入类</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="借方期初余额">
            <template slot-scope="scope">
              <el-form-item
                :prop="'accountBalanceList.' + scope.$index + '.debitStaperiodAmt'"
                :rules="accountBalanceRules.debitStaperiodAmt"
              >
                <el-input v-model.number="scope.row.debitStaperiodAmt"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" label="贷方期初余额">
            <template slot-scope="scope">
              <el-form-item
                :prop="'accountBalanceList.' + scope.$index + '.creditStaperiodAmt'"
                :rules="accountBalanceRules.creditStaperiodAmt"
              >
                <el-input v-model.number="scope.row.creditStaperiodAmt"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="借方年初余额">
            <template slot-scope="scope">
              <el-form-item
                :prop="'accountBalanceList.' + scope.$index + '.debitStayearAmt'"
                :rules="accountBalanceRules.debitStayearAmt"
              >
                <el-input v-model.number="scope.row.debitStayearAmt"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" label="贷方年初余额">
            <template slot-scope="scope">
              <el-form-item
                :prop="'accountBalanceList.' + scope.$index + '.creditStayearAmt'"
                :rules="accountBalanceRules.creditStayearAmt"
              >
                <el-input v-model.number="scope.row.creditStayearAmt"></el-input>
              </el-form-item>
            </template>
          </el-table-column> -->
        </el-table>
      </el-form>
      <el-row>
        <el-col :span="24">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total"
            class="centerAlign"
            :hide-on-single-page="true"
            :current-page="pageNum"
          ></el-pagination>
        </el-col>
      </el-row>
    </my-collapse>
    <div class="rightAlign">
      <el-button type="primary" v-if="active>=1" @click="pre()">上一步</el-button>
      <el-button type="primary" v-if="active == 0" @click="checkData('sysParam')">下一步</el-button>
      <el-button type="primary" v-if="active == 1" @click="checkData('sysParam')">下一步</el-button>
      <el-button type="success" v-if="active == 2">试算会计科目</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "accountInit",
  components: {},
  props: {},
  data() {
    return {
      active: 0,
      accountData: [],
      sysParam: {
        nowAccountPeriod: "",
        baseCurrency: "",
        startTime: "",
        state: "FALSE",
        unit: ""
      },
      rules: {
        nowAccountPeriod: [
          { required: true, message: "请输入当前会计期间", trigger: "blur" }
        ],
        baseCurrency: [
          { required: true, message: "请输入本位币", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "请选择开始使用时间", trigger: "change" }
        ],
        unit: [{ required: true, message: "请输入本位币单位", trigger: "blur" }]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      accountList: [],
      accountBalanceForm: {
        accountBalanceList: []
      },
      accountBalanceRules: {
        debitStaperiodAmt: [
          { required: true, message: "请输入借方期初余额", trigger: "blur" }
        ],
        creditStaperiodAmt: [
          { required: true, message: "请输入贷方期初余额", trigger: "blur" }
        ],
        debitStayearAmt: [
          { required: true, message: "请输入借方年初余额", trigger: "blur" }
        ],
        creditStayearAmt: [
          { required: true, message: "请输入贷方年初余额", trigger: "blur" }
        ]
      },
      accountBalanceData: [],
      pageSize: 10,
      total: 0,
      pageNum: 1,
      pageTemp:1,
    };
  },
  watch: {},
  computed: {},
  methods: {
    pre() {
      this.active = this.active - 1;
    },
    next() {
      this.active = this.active + 1;
      console.log(this.sysParam);
      //  this.sysParam.nowAccountPeriod =  this.Utils.timestampToDate(this.sysParam.nowAccountPeriod)
    },
    check() {
      var url = "/system/checkSysParam";
      this.axios.get(url).then(res => {
        if (!res.success) {
          this.$message({
            type: "error",
            message: res.msg,
            center: true
          });
          this.$router.push("/finance");
        }
      });
    },
    checkData(name) {
      // var formRefs = [this.$refs[name]];
      // this.Utils.checkForm(formRefs).then(res => {
      //   if (res) {
      //     this.next();
      //   }
      // });
      this.next();
    },
    findAccountList() {
      var url = "/lender/allAccount";
      this.axios.get(url).then(res => {
        if (res.success) {
          res.obj.forEach(item => {
            (item.debitStaperiodAmt = ""), //借方
              (item.creditStaperiodAmt = ""), //贷方期初余额
              (item.debitStayearAmt = ""), //借方年初余额
              (item.creditStayearAmt = ""), //贷方年初余额
              (item.accountPeriod = this.sysParam.nowAccountPeriod);
          });
          this.accountBalanceForm.accountBalanceList = this.Utils.copyObj(
            res.obj
          );
        }
      });
    },
    search(val) {
      var url = "/lender/accBalanceInitData";
      var data = val ? JSON.stringify(val) : "";
      this.axios.get(url, { params: { params: data } }).then(res => {
        if (res.success) {
          console.log(res.obj)
          this.accountBalanceForm.accountBalanceList = this.Utils.copyObj(
            res.obj.list
          );
          this.total = res.obj.total;
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = { pageNum: val };
      this.search(data);
    }
  },
  created() {
    this.check();
    this.search();
  },
  mounted() {}
};
</script>
<style scoped>
</style>