<template>
  <div class="design">
    <my-pageheader titleContent="流程设计" :needButton="true" buttonContent="创建模型" @handleClick="add"></my-pageheader>
    <div>
      <!-- 添加费用类别的弹窗 -->
      <el-dialog
        title="创建模型"
        :visible.sync="dialogFormVisible"
        width="35%"
        @close="handleClose('feeForm')"
        :close-on-click-modal="false"
        center
      >
        <el-form ref="feeForm" :rules="rules" :model="feeForm" :status-icon="true">
          <el-form-item label="流程名称" prop="name">
            <el-input v-model="feeForm.name" class="length"></el-input>
          </el-form-item>
          <el-form-item label="流程key" prop="key">
            <el-input v-model="feeForm.key" class="length"></el-input>
          </el-form-item>
          <el-form-item label="流程描述" prop="desc">
            <el-input v-model="feeForm.desc" class="length"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="key" label="KEY"></el-table-column>
      <el-table-column align="center" prop="name" label="名称"></el-table-column>
      <el-table-column align="center" prop="desc" label="描述"></el-table-column>
      <el-table-column align="center" prop="version" label="版本"></el-table-column>
      <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column align="center" prop="lastUpdateTime" label="最后修改时间"></el-table-column>
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
          <el-tooltip effect="light" content="删除" placement="bottom">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.row.id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip effect="light" content="发布" placement="bottom">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-refresh"
              circle
              @click="handleDeploy(scope.row.id)"
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
  </div>
</template>

<script>
export default {
  name: "design",
  components: {},
  props: {},
  data() {
    return {
      dialogFormVisible: false,
      feeForm: {
        name: "",
        key: "",
        desc: ""
      },
      rules: {
        name: [{ required: true, message: "请输入流程名称", trigger: "blur" }],
        key: [{ required: true, message: "请输入流程key", trigger: "blur" }],
        desc: [{ required: true, message: "请输入流程描述", trigger: "blur" }]
      },
      tableData: [],
      pageSize: 10,
      total: 0
    };
  },
  watch: {},
  computed: {},
  methods: {
    add() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    handleClose() {
      this.$refs["feeForm"].resetFields();
      this.Utils.clearObj(this.feeForm);
    },
    save() {
      var formRefs = [this.$refs["feeForm"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          this.axios.post("/activiti/create", this.feeForm).then(res => {
            if (res.success) {
              window.open(
                this.Utils.getUrl() +
                  "/modeler.html?modelId=" +
                  res.obj.modelId,
                "_blank"
              );
              this.$message({
                type: "success",
                message: "创建成功",
                center: true
              });
              this.dialogFormVisible = false;
            }
          });
        }
      });
    },
    handleCurrentChange(val) {
      var data = { pageNum: val };
      this.search(data);
    },
    search(val) {
      var url = "/activiti/model";
      var data = val ? JSON.stringify(val) : "";
      this.axios.get(url, { params: { data: data } }).then(res => {
        if (res.success) {
          this.tableData = res.obj.list;
          this.tableData.forEach(item => {
            var temp = eval("(" + item.metaInfo + ")");
            item.desc = temp.description;
            console.log();
          });
          this.total = res.obj.total;
        }
      });
    },
    handleEdit(id) {
      var url = "/activiti/edit/" + id;
      this.axios.put(url).then(res => {
        if (res.success) {
            window.open(
              this.Utils.getUrl() + "/modeler.html?modelId=" + res.obj.modelId,
              "_blank"
            );
        }
      });
    },
    handleDelete(id) {
      var url = "/activiti/delete/" + id;
      this.axios.delete(url).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg,
            center: true
          });
          this.search();
        } else {
          this.$message({
            type: "error",
            message: res.msg,
            center: true
          });
        }
      });
    },
    handleDeploy(id) {
      var url = "/activiti/deploy/" + id;
      this.axios.post(url).then(res => {
        if (res.success) {
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