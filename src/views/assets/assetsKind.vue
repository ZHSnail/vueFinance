<template>
  <div class="assetsKind">
    <my-pageheader titleContent="资产分类配置" :needButton="true" buttonContent="添加" @handleClick="add"></my-pageheader>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="code" label="编码"></el-table-column>
      <el-table-column align="center" prop="name" label="资产名称"></el-table-column>
      <el-table-column align="center" label="固定资产科目">
        <el-table-column align="center" prop="debitAssetsAccName" label="借方"></el-table-column>
        <el-table-column align="center" prop="creditAssetsAccName" label="贷方"></el-table-column>
      </el-table-column>
      <el-table-column align="center" prop="debitDepreAccId" label="累计折旧科目">
        <el-table-column align="center" prop="debitDepreAccName" label="借方"></el-table-column>
        <el-table-column align="center" prop="creditDepreAccName" label="贷方"></el-table-column>
      </el-table-column>
      <el-table-column align="center" prop="depreMethodName" label="预设折旧方法"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
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
    <el-dialog
      title="添加资产分类"
      :visible.sync="dialogFormVisible"
      width="35%"
      @close="handleClose"
      :close-on-click-modal="false"
      center
    >
      <el-form ref="assetsForm" :rules="rules" :model="assetsForm" :status-icon="true">
        <el-form-item label="资产类别名称" prop="name">
          <el-input v-model="assetsForm.name" class="length"></el-input>
        </el-form-item>
        <el-form-item label="资产类别编码" prop="code">
          <el-input v-model="assetsForm.code" class="length"></el-input>
        </el-form-item>
        <el-form-item label="借方固定资产科目" prop="debitAssetsAccId">
          <select-account
            v-model="assetsForm.debitAssetsAccId"
            placeholder="请选择借方固定资产科目"
            width="250px"
          ></select-account>
        </el-form-item>
        <el-form-item label="贷方固定资产科目" prop="creditAssetsAccId">
          <select-account
            v-model="assetsForm.creditAssetsAccId"
            placeholder="请选择贷方固定资产科目"
            width="250px"
          ></select-account>
        </el-form-item>
        <el-form-item label="借方累计折旧科目" prop="debitDepreAccId">
          <select-account
            v-model="assetsForm.debitDepreAccId"
            placeholder="请选择借方累计折旧科目"
            width="250px"
          ></select-account>
        </el-form-item>
        <el-form-item label="借方累计折旧科目" prop="creditDepreAccId">
          <select-account
            v-model="assetsForm.creditDepreAccId"
            placeholder="请选择借方累计折旧科目"
            width="250px"
          ></select-account>
        </el-form-item>
        <el-form-item label="预设折旧方法" prop="depreMethod">
          <el-select
            class="length"
            v-model="assetsForm.depreMethod"
            clearable
            placeholder="请选择预设折旧方法"
          >
            <el-option label="年限平均法(直线法)" value="STRLINE"></el-option>
            <el-option label="工作量法" value="WORKLOAD"></el-option>
            <el-option label="双倍余额递减法" value="DOUDECBAL"></el-option>
            <el-option label="年数总和法" value="SUMYEAR"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "assetsKind",
  components: {},
  props: {},
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      assetsForm: {
        name: "",
        code: "",
        debitAssetsAccId: "",
        creditAssetsAccId: "",
        debitDepreAccId: "",
        creditDepreAccId: "",
        depreMethod: ""
      },
      rules: {
        name: [{ required: true, message: "请输入资产名称", trigger: "blur" }],
        debitAssetsAccId: [
          {
            required: true,
            message: "请选择固定资产借方科目",
            trigger: "change"
          }
        ],
        creditAssetsAccId: [
          {
            required: true,
            message: "请选择固定资产贷方方科目",
            trigger: "change"
          }
        ],
        debitDepreAccId: [
          {
            required: true,
            message: "请选择累计折旧借方科目",
            trigger: "change"
          }
        ],
        creditDepreAccId: [
          {
            required: true,
            message: "请选择累计折旧贷方科目",
            trigger: "change"
          }
        ],
        depreMethod: [
          { required: true, message: "请选择预设折旧方法", trigger: "change" }
        ],
        code: [
          { required: true, message: "请选择资产类别编码", trigger: "change" }
        ]
      },
      pageSize: 10,
      total: 0,
      pageNum: 1
    };
  },
  watch: {},
  computed: {},
  methods: {
    add() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    search(val) {
      var url = "/assets/assetsKindList";
      var data = val ? JSON.stringify(val) : "";
      this.axios.get(url, { params: { params: data } }).then(res => {
        if (res.success) {
          this.tableData = res.obj.list;
          this.total = res.obj.total;
          this.pageNum = res.obj.pageNum;
        }
      });
    },
    handleClose() {
      this.$refs["assetsForm"].resetFields();
      this.Utils.clearObj(this.assetsForm);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = { pageNum: val };
      this.search(data);
    },
    save() {
      var formRefs = [this.$refs["assetsForm"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          this.axios.post("/assets/assetsKind", this.assetsForm).then(res => {
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
      });
    },
    handleDelete(id) {
      var url = "/assets/assetsKind/" + id;
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
.assetsKind >>> .el-form-item__label {
  width: 150px;
}
</style>