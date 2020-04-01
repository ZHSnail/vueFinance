<template>
  <div class="payRollSetInfo">
    <my-pageheader titleContent="职工工资配置"></my-pageheader>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="name" label="姓名"></el-table-column>
      <el-table-column align="center" prop="staffType" label="员工类别"></el-table-column>
      <el-table-column align="center" label="工资单名称">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="openPayStub(scope.row.id)"
            v-if="scope.row.payStub"
          >{{scope.row.payStub}}</el-link>
          <el-link
            type="danger"
            :underline="false"
            @click="openPayStub(scope.row.id)"
            v-else
          >选择工资单</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="岗位工资等级">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            v-if="scope.row.stationLv"
            @click="openStation(scope.row.id)"
          >{{scope.row.stationLv}}级</el-link>
          <el-link
            type="danger"
            :underline="false"
            @click="openStation(scope.row.id)"
            v-else
          >选择岗位工资等级</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="薪级工资等级">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="openScale(scope.row.id)"
            v-if="scope.row.scaleLv"
          >{{scope.row.scaleLv}}级</el-link>
          <el-link
            type="danger"
            :underline="false"
            @click="openScale(scope.row.id)"
            v-else
          >选择薪级工资等级</el-link>
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
    <select-pay-stub :is-show.sync="payStubShow" :staffId="staffId"></select-pay-stub>
    <select-post-wage :is-show.sync="stationShow" :staffId="staffId" title="选择岗位工资" type="station"></select-post-wage>
    <select-post-wage :is-show.sync="scaleShow" :staffId="staffId" title="选择薪级工资" type="station"></select-post-wage>
  </div>
</template>

<script>
export default {
  name: "payRollSetInfo",
  components: {},
  props: {},
  data() {
    return {
      staffId: "",
      payStubShow: false,
      stationShow: false,
      scaleShow: false,
      tableData: [
        {
          id: "1", //员工id
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
    openPayStub(staffId) {
      this.staffId = staffId;
      this.payStubShow = !this.payStubShow;
    },
    handleCurrentChange(page) {},
    openStation(staffId) {
      this.staffId = staffId;
      this.stationShow = !this.stationShow;
    },
    openScale(staffId) {
      this.staffId = staffId;
      this.scaleShow = !this.scaleShow;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>