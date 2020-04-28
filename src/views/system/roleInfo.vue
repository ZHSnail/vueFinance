<template>
  <div class="roleInfo">
    <my-pageheader titleContent="角色信息" needButton="true" buttonContent="添加" @handleClick="add"></my-pageheader>
    <div>
      <searchForm :formOptions="formOptions" @onSearch="search" btnItems="search"></searchForm>
    </div>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="roleName" label="角色名称"></el-table-column>
      <el-table-column align="center" prop="memo" label="备注"></el-table-column>
      <el-table-column align="center" label="操作">
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
          <el-tooltip effect="light" content="删除" placement="bottom">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog
        title="角色信息"
        :visible.sync="dialogFormVisible"
        width="35%"
        @close="handleClose"
        :close-on-click-modal="false"
        center
      >
        <el-form ref="roleFrom" :rules="rules" :model="roleFrom" :status-icon="true">
          <el-form-item label="名称" prop="roleName">
            <el-input v-model="roleFrom.roleName" class="length"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="memo">
            <el-input v-model="roleFrom.memo" class="length"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </div>
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
  </div>
</template>

<script>
export default {
  name: "roleInfo",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      formOptions: [
        {
          label: "角色名称", // label文字
          prop: "roleName", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入角色名称" // elementui组件属性
        }
      ],
      pageSize: 10,
      total: 0,
      roleFrom: {
        roleName: "",
        memo: ""
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        memo: [{ required: true, message: "请输入角色备注", trigger: "blur" }]
      },
      dialogFormVisible: false,
      flag: true
    };
  },
  watch: {},
  computed: {},
  methods: {
    search(val) {
      var url = "/system/roleList";
      var data = val ? JSON.stringify(val) : "";
      this.axios.get(url, { params: { params: data } }).then(res => {
        if (res.success) {
          this.tableData = res.obj.list;
          this.total = res.obj.total;
        }
      });
    },
    handleCurrentChange(val) {
      var data = { pageNum: val };
      this.search(data);
    },
    handleClose() {
      this.$refs["roleFrom"].resetFields();
      this.Utils.clearObj(this.roleFrom);
    },
    save() {
      var formRefs = [this.$refs["roleFrom"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          if (this.flag) {
            this.axios.post("/system/role", this.roleFrom).then(res => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: res.msg,
                  center: true
                });
                this.dialogFormVisible = false;
                this.search();
              }
            });
          }else{
            this.axios.put("/system/role", this.roleFrom).then(res => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: res.msg,
                  center: true
                });
                this.dialogFormVisible = false;
                this.search();
              }
            });
          }
        }
      });
    },
    handleDelete(id) {
      var url = "/system/role/" + id;
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
    handleEdit(index, row) {
      this.roleFrom = this.Utils.copyObj(row);
      this.flag = false;
      this.dialogFormVisible = true;
    },
    add() {
      this.flag =  true;
      this.dialogFormVisible = !this.dialogFormVisible;
    }
  },
  created() {
    this.search();
  },
  mounted() {}
};
</script>
<style scoped>
.el-form-item {
  display: flex;
  justify-content: center;
}
</style>