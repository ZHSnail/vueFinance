<template>
  <div class="dormInfo">
    <my-pageheader titleContent="宿舍信息" :needButton="true" buttonContent="添加" @handleClick="add"></my-pageheader>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="buildNumber" label="楼号"></el-table-column>
      <el-table-column align="center" prop="dormNumber" label="宿舍号"></el-table-column>
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
        title="宿舍信息"
        :visible.sync="dialogFormVisible"
        width="35%"
        @close="handleClose"
        :close-on-click-modal="false"
        center
      >
        <el-form ref="dormInfoFrom" :rules="rules" :model="dormInfoFrom" :status-icon="true">
          <el-form-item label="楼号" prop="buildNumber">
            <el-input v-model.number="dormInfoFrom.buildNumber" class="length"></el-input>
          </el-form-item>
          <el-form-item label="宿舍号" prop="dormNumber">
            <el-input v-model.number="dormInfoFrom.dormNumber" class="length"></el-input>
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
          :current-page="pageNum"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "dormInfo",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      pageSize: 10,
      total: 0,
      dormInfoFrom: {
        dormNumber: "",
        buildNumber: ""
      },
      rules: {
        dormNumber: [
          { required: true, message: "请输入宿舍号", trigger: "blur" },
          { type: "number", message: "宿舍号必须为数字值" }
        ],
        buildNumber: [
          { required: true, message: "请输入楼号", trigger: "blur" },
          { type: "number", message: "楼号必须为数字值" }
        ]
      },
      dialogFormVisible: false,
      flag: true,
      pageNum:1
    };
  },
  watch: {},
  computed: {},
  methods: {
    search(val) {
      var url = "/charge/dormInfoList";
      var data = val ? JSON.stringify(val) : "";
      this.axios.get(url, { params: { params: data } }).then(res => {
        if (res.success) {
          this.tableData = res.obj.list;
          this.total = res.obj.total;
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = { pageNum: val };
      this.search(data);
    },
    handleClose() {
      this.$refs["dormInfoFrom"].resetFields();
      this.Utils.clearObj(this.dormInfoFrom);
    },
    save() {
      var formRefs = [this.$refs["dormInfoFrom"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          if (this.flag) {
            this.axios.post("/charge/dormInfo", this.dormInfoFrom).then(res => {
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
            this.axios.put("/charge/dormInfo", this.dormInfoFrom).then(res => {
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
      var url = "/charge/dormInfo/" + id;
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
      this.dormInfoFrom = this.Utils.copyObj(row);
      this.dormInfoFrom.buildNumber = parseInt(this.dormInfoFrom.buildNumber);
      this.dormInfoFrom.dormNumber = parseInt(this.dormInfoFrom.dormNumber);
      this.flag = false;
      this.dialogFormVisible = true;
    },
    add() {
      this.flag = true;
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