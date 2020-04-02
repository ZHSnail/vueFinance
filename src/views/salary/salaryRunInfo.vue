<template>
  <div class="salaryRunInfo">
    <my-pageheader titleContent="教师工资单结算"></my-pageheader>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="salaryPeriod" label="薪酬期间"></el-table-column>
      <el-table-column align="center" prop="salaryPeriod" label="关联人数"></el-table-column>
      <el-table-column align="center" prop="totalPeople" label="发放总人数">
        <template slot-scope="scope">
          <span v-if="scope.row.totalPeople">{{scope.row.totalPeople}}人</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="totalAmount" label="总成本">
        <template slot-scope="scope">
          <span v-if="scope.row.totalAmount">{{scope.row.totalAmount}}元</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="exePeriod" label="执行期间"></el-table-column>
      <el-table-column align="center" label="执行结果">
        <template slot-scope="scope">
          <!-- TODO需要做一个执行成功的和执行失败的展示 -->
          <span v-if="scope.row.exeResult">
            <el-tooltip effect="light" content="查看详情" placement="bottom">
              <router-link :to="'/finance/salary/salaryDetail/'+scope.row.id" tag="div">
                <el-link :underline="false" type="primary">{{scope.row.exeResult}}</el-link>
              </router-link>
            </el-tooltip>
          </span>
          <span v-else>未执行结算工资操作</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip effect="light" content="结算" placement="bottom">
            <el-link
              icon="el-icon-fin-jiehui"
              :underline="false"
              type="primary"
              @click="handPay(scope.row.id)"
            >结算</el-link>
          </el-tooltip>
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
      tableData: [
        {
          id: 1,
          salaryPeriod: "202001", //适用范围
          totalPeople: "",
          totalAmount: "",
          shouldPaid: ["住房补贴"],
          exePeriod: ["交通补贴", "交通补贴"],
          exeResult: 220
        },
        {
          id: 2,
          scope: "高级管理类",
          deduct: ["餐费补贴"],
          shouldPaid: ["住房补贴"],
          unitPay: ["交通补贴", "交通补贴"],
          name: "高级管理类工资单",
          amount: 220
        },
        {
          id: 3,
          scope: "职能管理类",
          deduct: ["餐费补贴"],
          shouldPaid: ["住房补贴"],
          unitPay: ["交通补贴", "交通补贴"],
          name: "职能管理类工资单",
          amount: 220
        },
        {
          id: 4,
          scope: "其他类",
          deduct: ["餐费补贴"],
          shouldPaid: ["住房补贴"],
          unitPay: ["交通补贴", "交通补贴"],
          name: "其他类工资单",
          amount: 220
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    handPay(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>