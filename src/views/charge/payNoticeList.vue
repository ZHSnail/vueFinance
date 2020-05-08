<template>
  <div class="payNoticeList">
    <div>
      <my-pageheader titleContent="收费查询"></my-pageheader>
    </div>
    <div>
      <searchForm :formOptions="formOptions" btnItems="search,export" @onExport="exportData" @onSearch="search"></searchForm>
    </div>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
      <el-table-column align="center" prop="code" label="单号" width="150">
        <template slot-scope="scope">
          <router-link :to="'payNoticeDetail/'+scope.row.id" tag="div">
            <el-link type="primary" :underline="false">{{scope.row.code}}</el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="creater" label="发起人"></el-table-column>
      <el-table-column align="center" label="收费机构" prop="org"></el-table-column>
      <el-table-column align="center" prop="feeKind.name" label="费用类别"></el-table-column>
      <el-table-column align="center" label="收费情况">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 'EXE'">
            <router-link :to="'payList/'+scope.row.id" tag="div">
              <el-link type="primary" :underline="false">详情</el-link>
            </router-link>
          </div>
          <div v-if="scope.row.status == 'FINSH'">
            <router-link :to="'payList/'+scope.row.id" tag="div">
              <el-link type="primary" :underline="false">已完成收费</el-link>
            </router-link>
          </div>
          <div v-if="scope.row.status == 'CMT'">待审核通过</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="应收金额" prop="totalAmount">
        <template slot-scope="scope">{{scope.row.totalAmount + " 元"}}</template>
      </el-table-column>
      <el-table-column align="center" label="状态" prop="status">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 'CMT'">审核中</span>
          <span v-if="scope.row.status == 'EXE'">正在进行</span>
          <span v-if="scope.row.status == 'FINSH'">已完成</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="摘要" prop="memo"></el-table-column>
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
          :current-page="pageNum"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "payNoticeList",
  components: {},
  props: {},
  data() {
    return {
      formOptions: [
        {
          label: "单号", // label文字
          prop: "code", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入单号" // elementui组件属性
        },
        {
          label: "状态", // label文字
          prop: "status", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "请选择状态", // elementui组件属性
          options: [
            { label: "审批中", value: "CMT" },
            { label: "正在进行", value: "EXE" },
            { label: "已完成", value: "FINSH" }
          ]
        },
        {
          label: "费用类别", // label文字
          prop: "feeKindId", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "请选择费用类别", // elementui组件属性
          options: []
        }
      ],
      tableData: [],
      pageSize: 10,
      total: 0,
      pageNum: 1,
      searchVal: {
        code: "",
        status: "",
        feeKindId: ""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    search(val) {
      var url = "/charge/payNoticeList";
      var data = val ? JSON.stringify(val) : "";
      if (val) {
        this.searchVal = this.Utils.copyObj(val);
      }
      this.axios.get(url, { params: { params: data } }).then(res => {
        if (res.success) {
          this.tableData = res.obj.list;
          this.total = res.obj.total;
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = this.Utils.copyObj(this.searchVal);
      data.pageNum = val;
      this.search(data);
    },
    getFeeKindList() {
      var url = "/charge/allFeeKind";
      this.axios.get(url).then(res => {
        if (res.success) {
          res.obj.forEach(item => {
            var temp = {};
            temp.label = item.name;
            temp.value = item.id;
            this.formOptions[2].options.push(temp);
          });
        }
      });
    },
    exportData(val) {
      var url = "/charge/payNoticeExport";
      var data = JSON.stringify(val) ? JSON.stringify(val) : "";
      this.Utils.downloadFile(url, { data: data });
    },
  },
  created() {
    this.getFeeKindList();
    this.search();
  },
  mounted() {}
};
</script>
<style scoped>
</style>