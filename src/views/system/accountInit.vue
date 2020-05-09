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
        label-width="120px"
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
    <div class="rightAlign">
      <el-button type="primary" @click="next()">下一步</el-button>
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
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
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