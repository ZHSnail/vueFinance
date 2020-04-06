<template>
  <div class="assetsKind">
    <my-pageheader titleContent="资产分类配置" :needButton="true" buttonContent="添加" @handleClick="add"></my-pageheader>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="code" label="编码"></el-table-column>
      <el-table-column align="center" prop="name" label="资产名称"></el-table-column>
      <el-table-column align="center" prop="fixAccount" label="固定资产科目">
        <template slot-scope="scope">
          <span v-for="(item) in scope.row.account" :key="item.id">{{item.code+" " + item.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="depreAccount" label="累计折旧科目">
        <template slot-scope="scope">
          <span>{{scope.row.state == "TRUE" ? "启用":"停用"}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="preMeth" label="预设折旧方法">
        <template slot-scope="scope">
          <span>{{scope.row.state == "TRUE" ? "启用":"停用"}}</span>
        </template>
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
    <el-dialog
      title="添加资产分类"
      :visible.sync="dialogFormVisible"
      width="35%"
      @close="handleClose"
      :close-on-click-modal="false"
      center
    >
      <el-form ref="assetsForm" :rules="rules" :model="assetsForm" :status-icon="true">
        <el-form-item label="资产名称" prop="name">
          <el-input v-model="assetsForm.name" class="length"></el-input>
        </el-form-item>
        <el-form-item label="固定资产科目" prop="fixAccount">
          <select-account v-model="assetsForm.fixAccount" placeholder="请选择固定资产科目" width="250px"></select-account>
        </el-form-item>
        <el-form-item label="累计折旧科目" prop="depreAccount">
          <select-account v-model="assetsForm.depreAccount" placeholder="请选择累计折旧科目" width="250px"></select-account>
        </el-form-item>
        <el-form-item label="预设折旧方法" prop="preMeth">
          <el-select class="length" v-model="assetsForm.preMeth" clearable placeholder="请选择预设折旧方法">
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
        calUnit: "",
        fixAccount: "",
        depreAccount: "",
        preMeth: ""
      },
      rules: {
        name: [{ required: true, message: "请输入资产名称", trigger: "blur" }],
        calUnit: [
          { required: true, message: "请选择计量单位", trigger: "change" }
        ],
        fixAccount: [
          { required: true, message: "请选择固定资产科目", trigger: "change" }
        ],
        depreAccount: [
          { required: true, message: "请选择累计折旧科目", trigger: "change" }
        ],
        preMeth: [
          { required: true, message: "请选择预设折旧方法", trigger: "change" }
        ]
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    add() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    handleClose() {},
    save() {
      var formRefs = [this.$refs["assetsForm"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          alert("submit");
        } else {
          alert("error");
        }
      });
      console.log(this.assetsForm.feeMethod);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.el-form-item {
  display: flex;
  justify-content: center;
}
.assetsKind >>> .el-form-item__label {
  width: 110px;
}
</style>