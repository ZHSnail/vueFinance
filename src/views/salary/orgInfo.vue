<template>
  <div class="orgInfo">
    <my-pageheader titleContent="部门管理" :needButton="true" buttonContent="添加" @handleClick="add"></my-pageheader>
    <searchForm :formOptions="formOptions" @onSearch="search" btnItems="search"></searchForm>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="code" label="编码"></el-table-column>
      <el-table-column align="center" prop="name" label="名称"></el-table-column>
      <el-table-column align="center" prop="stateName" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip effect="light" content="编辑" placement="bottom">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.row)"
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
    <div>
      <el-dialog
        title="添加部门"
        :visible.sync="dialogFormVisible"
        width="35%"
        @close="handleClose"
        :close-on-click-modal="false"
        center
      >
        <el-form ref="orgInfoForm" :rules="rules" :model="orgInfoForm" :status-icon="true">
          <el-form-item label="编码" prop="code">
            <el-input v-model="orgInfoForm.code" class="length"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="orgInfoForm.name" class="length"></el-input>
          </el-form-item>
          <el-form-item label="状态" style="margin-left:35px" prop="state">
            <el-radio-group class="length" v-model="orgInfoForm.state">
              <el-radio label="TRUE">启用</el-radio>
              <el-radio label="FALSE">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = !dialogFormVisible">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "orgInfo",
  components: {},
  props: {},
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      orgInfoForm: {
        name: "",
        code: "",
        state: "TRUE"
      },
      floatWage: {},
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入编码", trigger: "blur" }]
      },
      pageSize: 10,
      total: 0,
      pageNum: 1,
      flag: true,
      searchVal: {
        name: "",
        state: ""
      },
      formOptions: [
        {
          label: "名称", // label文字
          prop: "name", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入名称" // elementui组件属性
        },
        {
          label: "启用状态", // label文字
          prop: "state", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "启用状态", // elementui组件属性
          options: [
            { label: "是", value: "TRUE" },
            { label: "否", value: "FALSE" }
          ],
          initValue: "TRUE"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleEdit(row) {
      this.orgInfoForm = this.Utils.copyObj(row);
      this.flag = false;
      this.dialogFormVisible = true;
    },
    handleClose() {
      this.$refs["orgInfoForm"].resetFields();
      this.Utils.clearObj(this.orgInfoForm);
    },
    add() {
      this.flag = true;
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    save() {
      var formRefs = [this.$refs["orgInfoForm"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          if (this.flag) {
            this.axios.post("/salary/orgInfo", this.orgInfoForm).then(res => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: res.msg,
                  center: true
                });
                this.dialogFormVisible = false;
                this.handleCurrentChange(this.pageNum);
              }
            });
          } else {
            this.axios.put("/salary/orgInfo", this.orgInfoForm).then(res => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: res.msg,
                  center: true
                });
                this.dialogFormVisible = false;
                this.handleCurrentChange(this.pageNum);
              }
            });
          }
        }
      });
    },
    handleDelete(id) {
      var url = "/charge/profession/" + id;
      this.axios.delete(url).then(res => {
        if (res.success) {
          this.search();
          this.$message({
            type: "success",
            message: res.msg,
            center: true
          });
        } else {
          this.$message({
            type: "error",
            message: res.msg,
            center: true
          });
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = this.Utils.copyObj(this.searchVal);
      data.pageNum = val;
      this.search(data);
    },
    search(val) {
      var url = "/salary/orgInfoList";
      var data = val ? JSON.stringify(val) : "";
      if (val) {
        this.searchVal = this.Utils.copyObj(val);
      }
      this.axios.get(url, { params: { params: data } }).then(res => {
        if (res.success) {
          this.tableData = res.obj.list;
          this.total = res.obj.total;
          this.pageNum = res.obj.pageNum;
        }
      });
    }
  },
  created() {
    this.search({ state: "TRUE" });
  },
  mounted() {}
};
</script>
<style scoped>
.el-form-item {
  display: flex;
  justify-content: center;
}
.orgInfo >>> .el-form-item__label {
  width: 80px;
}
</style>