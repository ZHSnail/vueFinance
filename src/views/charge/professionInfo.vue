<template>
  <div class="professionInfo">
    <my-pageheader titleContent="专业信息" needButton="true" buttonContent="添加" @handleClick="add"></my-pageheader>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="name" label="专业名"></el-table-column>
      <el-table-column align="center" prop="isLeaf" label="是否叶子节点"></el-table-column>
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
        title="专业信息"
        :visible.sync="dialogFormVisible"
        width="35%"
        @close="handleClose"
        :close-on-click-modal="false"
        center
      >
        <el-form ref="professionInfoFrom" :rules="rules" :model="professionInfoFrom" :status-icon="true">
          <el-form-item label="专业名" prop="name">
            <el-input v-model="professionInfoFrom.name" class="length"></el-input>
          </el-form-item>
          <el-form-item label="是否叶子节点" prop="isLeaf">
            <el-input v-model="professionInfoFrom.isLeaf" class="length"></el-input>
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
  name: "professionInfo",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      pageSize: 10,
      total: 0,
      professionInfoFrom: {
        name: "",
        isLeaf: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入宿舍号", trigger: "blur" },
        ],
        isLeaf: [
          { required: true, message: "请输入楼号", trigger: "blur" },
        ]
      },
      dialogFormVisible: false,
      flag: true
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
      var data = { pageNum: val };
      this.search(data);
    },
    handleClose() {
      this.$refs["professionInfoFrom"].resetFields();
      this.Utils.clearObj(this.professionInfoFrom);
    },
    save() {
      var formRefs = [this.$refs["professionInfoFrom"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          if (this.flag) {
            this.axios.post("/charge/dormInfo", this.professionInfoFrom).then(res => {
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
          } else {
            this.axios.put("/charge/dormInfo", this.professionInfoFrom).then(res => {
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
      this.professionInfoFrom = this.Utils.copyObj(row);
      this.professionInfoFrom.buildNumber = parseInt(this.professionInfoFrom.buildNumber);
      this.professionInfoFrom.dormNumber = parseInt(this.professionInfoFrom.dormNumber);
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