<template>
  <div class="salaryRunInfo">
    <my-pageheader :titleContent="tableData[0].name"></my-pageheader>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="salaryPeriod" label="薪酬期间"></el-table-column>
      <el-table-column align="center" prop="relatedNumber" label="关联人数"></el-table-column>
      <el-table-column align="center" prop="successNumber" label="发放总人数">
        <template slot-scope="scope">
          <span v-if="scope.row.successNumber">{{scope.row.successNumber}}人</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="totalAmount" label="总成本">
        <template slot-scope="scope">
          <span v-if="scope.row.totalAmount">{{scope.row.totalAmount}}元</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="exeDate" label="执行期间"></el-table-column>
      <el-table-column align="center" label="执行结果">
        <template slot-scope="scope">
          <!-- TODO需要做一个执行成功的和执行失败的展示 -->
          <span v-if="scope.row.exeDate">
            <el-tooltip effect="light" content="查看详情" placement="bottom">
              <router-link :to="'/finance/salary/salaryDetail/'+scope.row.id" tag="div">
                <el-link :underline="false" type="primary">查看详情</el-link>
              </router-link>
            </el-tooltip>
          </span>
          <span v-else>未执行结算工资操作</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span v-if="!scope.row.exeDate">
            <el-tooltip effect="light" content="结算" placement="bottom">
              <el-link
                icon="el-icon-fin-jiehui"
                :underline="false"
                type="primary"
                @click="handPay(scope.row.id)"
              >结算</el-link>
            </el-tooltip>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "salaryRunInfo",
  components: {},
  props: {},
  data() {
    return {
      tableData: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    handPay(id) {
      this.$confirm("确定进行结算工资吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var url = "/salary/execPaySalary/" + id;
          this.axios.post(url).then(res => {
            if (res.success) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.initData(this.$route.params.id);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    initData(id) {
      var url = "/salary/settleWageInfo/" + id;
      this.axios.get(url).then(res => {
        if (res.success) {
          var temp = {};
          temp = this.Utils.copyObj(res.obj);
          this.tableData = this.Utils.copyObj(temp);
          console.log(this.tableData);
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