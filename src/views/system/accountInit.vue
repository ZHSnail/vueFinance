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
                value-format="yyyyMM"
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
          <el-table-column align="center" prop="accountCode" label="科目编码"></el-table-column>
          <el-table-column align="center" prop="accountName" label="科目名称"></el-table-column>
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
          <el-table-column align="center" prop="accountPeriod" label="会计期间">
            <template>{{sysParam.nowAccountPeriod}}</template>
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
          <el-table-column v-if="showYearAmt" align="center" label="借方年初余额">
            <template slot-scope="scope">
              <el-form-item
                :prop="'accountBalanceList.' + scope.$index + '.debitStayearAmt'"
                :rules="accountBalanceRules.debitStayearAmt"
              >
                <el-input v-model.number="scope.row.debitStayearAmt"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column v-if="showYearAmt" align="center" label="贷方年初余额">
            <template slot-scope="scope">
              <el-form-item
                :prop="'accountBalanceList.' + scope.$index + '.creditStayearAmt'"
                :rules="accountBalanceRules.creditStayearAmt"
              >
                <el-input v-model.number="scope.row.creditStayearAmt"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column v-if="showYearAmt" align="center" label="借方本年累计发生额">
            <template slot-scope="scope">
              <el-form-item
                :prop="'accountBalanceList.' + scope.$index + '.debitAccumyearAmt'"
                :rules="accountBalanceRules.debitAccumyearAmt"
              >
                <el-input v-model.number="scope.row.debitAccumyearAmt"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column v-if="showYearAmt" align="center" label="贷方本年累计发生额">
            <template slot-scope="scope">
              <el-form-item
                :prop="'accountBalanceList.' + scope.$index + '.creditAccumyearAmt'"
                :rules="accountBalanceRules.creditAccumyearAmt"
              >
                <el-input v-model.number="scope.row.creditAccumyearAmt"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
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
            :current-page.sync="pageNum"
          ></el-pagination>
        </el-col>
      </el-row>
    </my-collapse>
    <my-collapse v-if="active == 2" title="暂存的系统参数" class="leftAlign">
      <el-form ref="sysParam" :model="sysParam" label-width="80px" :status-icon="true" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="当前会计期间" prop="baseCurrency">
              <el-input class="length" readonly v-model="sysParam.nowAccountPeriod"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本位币" prop="baseCurrency">
              <el-input class="length" readonly v-model="sysParam.baseCurrency"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始使用时间" prop="startTime">
              <el-input class="length" readonly v-model="sysParam.startTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="本位币单位" prop="unit">
              <el-input class="length" readonly v-model="sysParam.unit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </my-collapse>
    <my-collapse v-if="active == 2" title="暂存的会计科目余额" class="leftAlign">
      <el-table
        cell-class-name="centerAlign"
        :data="accountBalanceTempData"
        stripe
        style="width: 100%"
      >
        <el-table-column align="center" prop="accountCode" label="科目编码"></el-table-column>
        <el-table-column align="center" prop="accountName" label="科目名称"></el-table-column>
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
        <el-table-column align="center" prop="accountPeriod" label="会计期间">
          <template>{{sysParam.nowAccountPeriod}}</template>
        </el-table-column>
        <el-table-column align="center" prop="debitStaperiodAmt" label="借方期初余额"></el-table-column>
        <el-table-column align="center" prop="creditStaperiodAmt" label="贷方期初余额"></el-table-column>
        <el-table-column v-if="showYearAmt" prop="debitStayearAmt" align="center" label="借方年初余额"></el-table-column>
        <el-table-column v-if="showYearAmt" prop="creditStayearAmt" align="center" label="贷方年初余额"></el-table-column>
        <el-table-column
          v-if="showYearAmt"
          prop="debitAccumyearAmt"
          align="center"
          label="借方本年累计发生额"
        ></el-table-column>
        <el-table-column
          v-if="showYearAmt"
          align="center"
          prop="creditAccumyearAmt"
          label="贷方本年累计发生额"
        ></el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24">
          <el-pagination
            background
            @current-change="handlePage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="accountBalanceData.length"
            class="centerAlign"
            :hide-on-single-page="true"
          ></el-pagination>
        </el-col>
      </el-row>
    </my-collapse>
    <div class="rightAlign">
      <el-button type="primary" v-if="active>=1" @click="pre()">上一步</el-button>
      <el-button type="primary" v-if="active == 0" @click="checkData('sysParam')">下一步</el-button>
      <el-button type="primary" v-if="active == 1" @click="checkData('accountBalanceForm')">下一步</el-button>
      <el-button type="primary" v-if="active == 2" @click="testData">试算会计科目</el-button>
      <el-button type="success" v-if="active == 2 && showSave" @click="saveData">保存初始化数据</el-button>
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
      accountBalanceForm: {
        accountBalanceList: []
      },
      accountBalanceRules: {
        debitStaperiodAmt: [
          { required: true, message: "请输入借方期初余额", trigger: "blur" },
          { type: "number", message: "借方期初余额必须为数字值" }
        ],
        creditStaperiodAmt: [
          { required: true, message: "请输入贷方期初余额", trigger: "blur" },
          { type: "number", message: "贷方期初余额必须为数字值" }
        ],
        debitStayearAmt: [
          { required: true, message: "请输入借方年初余额", trigger: "blur" },
          { type: "number", message: "借方年初余额必须为数字值" }
        ],
        creditStayearAmt: [
          { required: true, message: "请输入贷方年初余额", trigger: "blur" },
          { type: "number", message: "贷方年初余额必须为数字值" }
        ],
        debitAccumyearAmt: [
          {
            required: true,
            message: "请输入借方本年累计发生额",
            trigger: "blur"
          },
          { type: "number", message: "借方本年累计发生额必须为数字值" }
        ],
        creditAccumyearAmt: [
          {
            required: true,
            message: "请输入贷方本年累计发生额",
            trigger: "blur"
          },
          { type: "number", message: "贷方本年累计发生额必须为数字值" }
        ]
      },
      accountBalanceData: [],
      accountBalanceTempData: [],
      pageSize: 10,
      total: 0,
      pageNum: 1,
      pageTemp: 0,
      showSave: false,
      showYearAmt: false
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
      if (name === "sysParam") {
        var formRefs = [this.$refs[name]];
        this.Utils.checkForm(formRefs).then(res => {
          if (res) {
            this.sysParam.startTime = this.Utils.timestampToDate(
              this.sysParam.startTime
            );
            this.sysParam.startTime = this.sysParam.startTime.substring(0, 10);
            if (!this.sysParam.nowAccountPeriod.endsWith("01")) {
              this.showYearAmt = true;
            }
            this.next();
            this.search();
          }
        });
      }
      if (name === "accountBalanceForm") {
        if (
          this.accountBalanceData.length !=
          this.accountBalanceForm.accountBalanceList.length
        ) {
          this.$confirm("仍有数据未初始化，确定进行下一步的初始化吗", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.arrangeAccountBalanceData();
              this.accountBalanceTempData = this.accountBalanceData.slice(
                0,
                10
              );
              this.next();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消"
              });
            });
        } else {
          this.accountBalanceTempData = this.accountBalanceData.slice(0, 10);
          this.next();
        }
      }
    },
    search(val) {
      var url = "/lender/accBalanceInitData";
      var data = val ? JSON.stringify(val) : "";
      this.axios.get(url, { params: { params: data } }).then(res => {
        if (res.success) {
          if (this.accountBalanceData.length > 0) {
            res.obj.list.forEach(item => {
              var Obj = this.Utils.findObj(
                this.accountBalanceData,
                "id",
                item.id
              );
              if (Obj) {
                item.debitStaperiodAmt = Obj.debitStaperiodAmt;
                item.creditStaperiodAmt = Obj.creditStaperiodAmt;
                item.debitStayearAmt = Obj.debitStayearAmt;
                item.creditStayearAmt = Obj.creditStayearAmt;
              }
            });
            this.accountBalanceForm.accountBalanceList = this.Utils.copyObj(
              res.obj.list
            );
          } else {
            this.accountBalanceForm.accountBalanceList = this.Utils.copyObj(
              res.obj.list
            );
          }
          this.total = res.obj.total;
          this.pageTemp = res.obj.pageNum;
        }
      });
    },
    arrangeAccountBalanceData() {
      this.accountBalanceForm.accountBalanceList.forEach(item => {
        if (this.accountBalanceData.length != 0) {
          var flag = true;
          for (var i = 0; i < this.accountBalanceData.length; i++) {
            if (this.accountBalanceData[i].id === item.id) {
              this.accountBalanceData[i] = this.Utils.copyObj(item);
              flag = false;
            }
          }
          if (flag) {
            this.accountBalanceData.push(item);
          }
        } else {
          this.accountBalanceData.push(item);
        }
      });
    },
    handleCurrentChange(val) {
      var formRefs = [this.$refs["accountBalanceForm"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          this.pageNum = val;
          this.arrangeAccountBalanceData();
          var data = { pageNum: val };
          this.search(data);
        } else {
          this.pageNum = this.pageTemp;
        }
      });
    },
    handlePage(val) {
      var pageSize = this.pageSize;
      var start = (val - 1) * pageSize;
      var end = start + pageSize;
      this.accountBalanceTempData = this.accountBalanceData.slice(start, end);
    },
    testData() {
      var totalCreditStaperiodAmt = 0;
      var totalDebitStaperiodAmt = 0;
      if (this.showYearAmt) {
        var totalDebitStayearAmt = 0;
        var totalCreditStayearAmt = 0;
        var totalCreditAccumyearAmt = 0;
        var totalDebitAccumyearAmt = 0;
        this.accountBalanceData.forEach(item => {
          totalDebitStaperiodAmt += item.debitStaperiodAmt;
          totalCreditStaperiodAmt += item.creditStaperiodAmt;
          totalDebitStayearAmt += item.debitStayearAmt;
          totalCreditStayearAmt += item.creditStayearAmt;
          totalCreditAccumyearAmt += item.creditAccumyearAmt;
          totalDebitAccumyearAmt += item.debitAccumyearAmt;
        });
        if (totalCreditStaperiodAmt != totalDebitStaperiodAmt) {
          this.$message({
            type: "error",
            message: "借方期初余额总额与贷方期初余额总额不相等！！！",
            center: true
          });
          return;
        } else if (totalDebitStayearAmt != totalCreditStayearAmt) {
          this.$message({
            type: "error",
            message: "借方年初余额余额总额与贷方年初余额总额不相等！！！",
            center: true
          });
          return;
        } else if (totalCreditAccumyearAmt != totalDebitAccumyearAmt) {
          this.$message({
            type: "error",
            message:
              "借方本年累计发生额总额与贷方本年累计发生额总额不相等！！！",
            center: true
          });
          return;
        } else {
          this.showSave = true;
        }
      } else {
        this.accountBalanceData.forEach(item => {
          totalDebitStaperiodAmt += item.debitStaperiodAmt;
          totalCreditStaperiodAmt += item.creditStaperiodAmt;
        });
        if (totalCreditStaperiodAmt != totalDebitStaperiodAmt) {
          this.$message({
            type: "error",
            message: "贷方期初余额总额与借方期初余额总额不相等！！！",
            center: true
          });
          return;
        } else {
          this.showSave = true;
        }
      }
    },
    saveData() {
      this.sysParam.accountBalanceVoList = this.accountBalanceData;
      this.sysParam.startTime = this.Utils.timestampToDate(this.sysParam.startTime);
      this.axios.post("/system/saveSysParam", this.sysParam).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg,
            center: true
          });
          this.$router.push("/finance");
        }
      });
    }
  },
  created() {
    this.check();
  },
  mounted() {}
};
</script>
<style scoped>
</style>