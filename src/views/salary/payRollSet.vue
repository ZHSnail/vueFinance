<template>
  <div class="payRollSet">
    <my-pageheader titleContent="职工工资配置"></my-pageheader>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="name" label="姓名"></el-table-column>
      <el-table-column align="center" prop="staffType" label="员工类别"></el-table-column>
      <el-table-column align="center" label="工资单名称">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" @click="openPayStub(scope.row.staffType)">{{scope.row.payStub}}</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="岗位工资等级">
        <template slot-scope="scope">{{scope.row.stationLv}}级</template>
      </el-table-column>
      <el-table-column align="center" label="薪级工资等级">
        <template slot-scope="scope">{{scope.row.scaleLv}}级</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip effect="light" content="编辑" placement="bottom">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
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
        ></el-pagination>
      </el-col>
    </el-row>
    <select-pay-stub :is-show.sync="payStubShow" :scope="scope"></select-pay-stub>
  </div>
</template>

<script>
export default {
  name: "payRollSet",
  components: {},
  props: {},
  data() {
    return {
      scope: "",
      payStubShow: false,
      tableData: [
        {
          id: "1",
          name: "张三",
          staffType: "教师类",
          payStub: "教师类工资单",
          stationLv: "6",
          scaleLv: "7"
        },
        {
          id: "2",
          name: "张三",
          staffType: "教师类",
          payStub: "教师类工资单",
          stationLv: "6",
          scaleLv: "7"
        },
        {
          id: "3",
          name: "张三",
          staffType: "教师类",
          payStub: "教师类工资单",
          stationLv: "6",
          scaleLv: "7"
        },
        {
          id: "4",
          name: "张三",
          staffType: "教师类",
          payStub: "教师类工资单",
          stationLv: "6",
          scaleLv: "7"
        },
        {
          id: "5",
          name: "张三",
          staffType: "教师类",
          payStub: "教师类工资单",
          stationLv: "6",
          scaleLv: "7"
        },
        {
          id: "6",
          name: "张三",
          staffType: "教师类",
          payStub: "教师类工资单",
          stationLv: "6",
          scaleLv: "7"
        },
        {
          id: "7",
          name: "张三",
          staffType: "教师类",
          payStub: "教师类工资单",
          stationLv: "6",
          scaleLv: "7"
        },
        {
          id: "8",
          name: "张三",
          staffType: "教师类",
          payStub: "教师类工资单",
          stationLv: "6",
          scaleLv: "7"
        },
        {
          id: "9",
          name: "张三",
          staffType: "教师类",
          payStub: "教师类工资单",
          stationLv: "6",
          scaleLv: "7"
        }
      ],
      total: 200,
      pageSize: 10
    };
  },
  watch: {},
  computed: {},
  methods: {
    openPayStub(scope) {
      this.scope = scope;
      this.payStubShow = !this.payStubShow;
    },
    handleCurrentChange(page) {}
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>