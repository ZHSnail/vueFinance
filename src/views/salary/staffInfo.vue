<template>
  <div class="staffInfo">
    <div>
      <my-pageheader titleContent="职工详情" :needButton="true">
        <el-dropdown trigger="click" @command="handleCommand">
          <el-button type="primary">
            更多
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="addStaff">新增员工</el-dropdown-item>
            <el-dropdown-item command="importStaff">导入员工</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </my-pageheader>
    </div>
    <div>
      <searchForm :formOptions="formOptions" @onSearch="search" btnItems="search,export"></searchForm>
    </div>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" fixed label="名称">
        <template slot-scope="scope">
          <router-link :to="'staffDetail/'+scope.row.id" tag="div">
            <el-link type="primary" :underline="false">{{scope.row.name}}</el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="学历" prop="degree" width="50"></el-table-column>
      <el-table-column align="center" prop="cardNumber" label="证件号码"></el-table-column>
      <el-table-column align="center" prop="entryDate" label="入职日期"></el-table-column>
      <el-table-column align="center" label="银行账户">
        <template slot-scope="scope">
          <el-popover placement="top" trigger="click">
            <el-table :data="scope.row.bankInfoList">
              <el-table-column property="accounttype" label="账户类型"></el-table-column>
              <el-table-column property="name" label="户名"></el-table-column>
              <el-table-column property="accountNumber" label="账号"></el-table-column>
              <el-table-column property="accountname" label="银行名"></el-table-column>
              <el-table-column property="subBranch" label="支行名"></el-table-column>
            </el-table>
            <el-link slot="reference" type="primary" icon="el-icon-view" :underline="false">查看详情</el-link>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属部门" prop="orgInfo.name"></el-table-column>
      <el-table-column align="center" label="岗位" prop="stationInfo.name"></el-table-column>
      <el-table-column align="center" label="职称" prop="postTitle"></el-table-column>
      <el-table-column align="center" label="操作" prop="state">
        <template slot-scope="scope">
          <el-tooltip effect="light" content="编辑" placement="bottom">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.row.id)"
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
          :current-page.sync="pageNum"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "staffInfo",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      formOptions: [
        {
          label: "名称", // label文字
          prop: "name", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入名称" // elementui组件属性
        },
        {
          label: "部门", // label文字
          prop: "orgId", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "请选择部门", // elementui组件属性
          options: []
        },
        {
          element: "el-date-picker",
          label: "入职日期",
          type: "daterange",
          prop: "entryDateList" // 字段名
        }
      ],
      pageSize: 10,
      total: 0,
      pageNum: 1,
      searchVal: {
        name: "",
        orgId: "",
        entryDateList:""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleCommand(command) {
      if (command == "addStaff") {
        this.$router.push({ path: "staffAdd" });
      }
      if (command == "importStaff") {
        this.$message("click on item " + command);
      }
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = this.Utils.copyObj(this.searchVal);
      data.pageNum = val;
      this.search(data);
    },
    search(val) {
      var url = "/salary/staffInfoList";
      if(val){
        this.searchVal = this.Utils.copyObj(val);
      }else{
        this.searchVal = {};
      }
      this.axios.post(url, this.searchVal).then(res => {
        if (res.success) {
          this.tableData = res.obj.list;
          console.log(this.tableData);
          this.total = res.obj.total;
          this.pageNum = res.obj.pageNum;
        }
      });
    },
    handleEdit(id) {
      this.$router.push({ path: "staffAdd/" + id });
    },
    findOrgList(){
      var url = "/salary/orgInfos";
      this.axios.get(url).then(res => {
        if (res.success) {
          res.obj.forEach(item => {
            var temp = {};
            temp.label = item.name;
            temp.value = item.id;
            this.formOptions[1].options.push(temp);
          });
        }
      });
    }
  },
  created() {
    this.search();
    this.findOrgList();
  },
  mounted() {}
};
</script>
<style scoped>
</style>