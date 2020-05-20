<template>
  <div class="floatWageView">
    <searchForm :formOptions="formOptions" @onSearch="search" btnItems="search,export" @onExport="exportData"></searchForm>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="code" label="编码"></el-table-column>
      <el-table-column align="center" prop="name" label="名称"></el-table-column>
      <el-table-column align="center" prop="taxTypeName" label="计税类型"></el-table-column>
      <el-table-column align="center" prop="signTypeName" label="扣减分类"></el-table-column>
      <el-table-column align="center" label="工资出处科目">
        <el-table-column align="center" prop="debitAccountName" label="借方"></el-table-column>
        <el-table-column align="center" prop="creditAccountName" label="贷方"></el-table-column>
      </el-table-column>
      <el-table-column align="center" label="金额">
        <template slot-scope="scope">
          <span>{{scope.row.amount+"元"}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="stateName" label="状态"></el-table-column>
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
        title="添加岗位"
        :visible.sync="show"
        width="35%"
        @close="handleClose('stationForm')"
        :close-on-click-modal="false"
        center
      >
        <el-form ref="stationForm" :rules="rules" :model="stationForm" :state-icon="true">
          <el-form-item label="编码" prop="code">
            <el-input v-model="stationForm.code" class="length"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="stationForm.name" class="length"></el-input>
          </el-form-item>
          <el-form-item label="金额" prop="amount">
            <el-input v-model.number="stationForm.amount" class="length"></el-input>
          </el-form-item>
          <el-form-item label="计税类型" prop="taxType">
            <el-select class="length" v-model="stationForm.taxType" clearable placeholder="请选择计税类型">
              <el-option label="应税项" value="TAX"></el-option>
              <el-option label="非税项" value="NON_TAX"></el-option>
              <el-option label="税前扣减项" value="PRE_TAX_DED"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="扣减分类" prop="signType">
            <el-select
              class="length"
              v-model="stationForm.signType"
              clearable
              placeholder="请选择扣减分类"
            >
              <el-option label="应发项" value="SHOULD_PAID"></el-option>
              <el-option label="扣减项" value="DEDUCT"></el-option>
              <el-option label="单位缴纳" value="UNIT_PAY"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="借方工资出处科目" prop="debitAccountId">
            <select-account v-model="stationForm.debitAccountId" width="250px"></select-account>
          </el-form-item>
          <el-form-item label="贷方工资出处科目" prop="creditAccountId">
            <select-account v-model="stationForm.creditAccountId" width="250px"></select-account>
          </el-form-item>
          <el-form-item label="状态" style="margin-left:35px" prop="state">
            <el-radio-group class="length" v-model="stationForm.state">
              <el-radio label="TRUE">启用</el-radio>
              <el-radio label="FALSE">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="show = !show">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "floatWageView",
  components: {},
  props: {
    isShow: Boolean,
  },
  data() {
    return {
      show: false,
      tableData: [],
      pageSize: 10,
      total: 0,
      pageNum: 1,
      flag: true,
      searchVal: {
        name: "",
        state: ""
      },
      stationForm: {
        code: "",
        name: "",
        amount: "",
        taxType: "",
        signType: "",
        debitAccountId:"",
        creditAccountId:"",
        state: "TRUE"
      },
      rules: {
        amount: [
          { required: true, message: "请输入金额", trigger: "blur" },
          { type: "number", message: "金额必须为数字值" }
        ],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入编码", trigger: "change" }],
        signType: [
          { required: true, message: "请选择扣减分类", trigger: "change" }
        ],
        taxType: [
          { required: true, message: "请选择计税类型", trigger: "change" }
        ],
        debitAccountId: [
          {
            required: true,
            message: "请选择借方工资出处科目",
            trigger: "change"
          }
        ],
        creditAccountId: [
          {
            required: true,
            message: "请选择贷方工资出处科目",
            trigger: "change"
          }
        ],
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
      ],
    };
  },
  watch: {
    show: function(newValue, oldValue) {
      //每当show的值改变则发送事件update:word , 并且把值传过去
      this.$emit("update:isShow", newValue);
    }
  },
  computed: {},
  methods: {
    handleEdit(index, row) {
      this.stationForm = this.Utils.copyObj(row);
      this.flag = false;
      this.show = true;
    },   
    handleClose(formName) {
      //关闭之后清除表单的内容，
      this.$refs[formName].resetFields();
      this.Utils.clearObj(this.stationForm);
      this.flag = true;
    },
    save() {
      var formRefs = [this.$refs["stationForm"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          if (this.flag) {
            this.axios
              .post("/salary/floatWage", this.stationForm)
              .then(res => {
                if (res.success) {
                  this.$message({
                    type: "success",
                    message: res.msg,
                    center: true
                  });
                  this.show = false;
                  this.handleCurrentChange(this.pageNum);
                }
              });
          } else {
            this.axios
              .put("/salary/floatWage", this.stationForm)
              .then(res => {
                if (res.success) {
                  this.$message({
                    type: "success",
                    message: res.msg,
                    center: true
                  });
                  this.show = false;
                  this.handleCurrentChange(this.pageNum);
                  this.flag = true;
                }
              });
          }
        }
      });
    },
    handleDelete(id) {
      var url = "/charge/floatWage/" + id;
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
      var url = "/salary/floatWageList";
      var data = val ? JSON.stringify(val) : "";
      if(val){
        this.searchVal = this.Utils.copyObj(val);
      }
      this.axios.get(url, { params: { params: data } }).then(res => {
        if (res.success) {
          this.tableData = res.obj.list;
          this.total = res.obj.total;
          this.pageNum = res.obj.pageNum;
        }
      });
    },
    add() {
      this.flag = true;
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    exportData(val) {
      var url = "/salary/floatWageExport";
      var data = JSON.stringify(val) ? JSON.stringify(val) : "";
      this.Utils.downloadFile(url, { data: data });
    },
  },
  created() {
     this.search({ state: "TRUE" });
  },
  mounted() {
    this.$watch("isShow", function(newVal, oldVal) {
      this.show = newVal;
    });
  }
};
</script>
<style scoped>
.el-form-item {
  display: flex;
  justify-content: center;
}
.floatWageView >>> .el-form-item__label {
  width: 80px;
}
</style>