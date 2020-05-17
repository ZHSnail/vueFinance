<template>
  <div class="feeKind">
    <div>
      <my-pageheader titleContent="费用类别设置" :needButton="true" buttonContent="添加" @handleClick="add"></my-pageheader>
    </div>
    <div>
      <searchForm :formOptions="formOptions" @onSearch="search" btnItems="search"></searchForm>
    </div>
    <div class="content">
      <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
        <el-table-column align="center" prop="name" label="费用名称"></el-table-column>
        <el-table-column align="center" prop="timeMold" label="时间单位"></el-table-column>
        <el-table-column align="center" label="收费方式">
          <template slot-scope="scope">
            <span v-if="scope.row.feeMethod=='DORM'">面向宿舍</span>
            <span v-if="scope.row.feeMethod=='MAJOR'">面向专业</span>
            <!-- <span v-if="scope.row.feeMethod=='ROLE'">面向角色</span> -->
          </template>
        </el-table-column>
        <el-table-column align="center" label="借方会计科目">
          <template slot-scope="scope">
            {{scope.row.debitAccount.accountName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="贷方会计科目">
          <template slot-scope="scope">
            {{scope.row.creditAccount.accountName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
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
    <div>
      <!-- 添加费用类别的弹窗 -->
      <el-dialog
        title="添加费用类别"
        :visible.sync="dialogFormVisible"
        width="35%"
        @close="handleClose('feeForm')"
        :close-on-click-modal="false"
        center
      >
        <el-form ref="feeForm" :rules="rules" :model="feeForm" :status-icon="true">
          <el-form-item label="费用名称" prop="name">
            <el-input v-model="feeForm.name" class="length"></el-input>
          </el-form-item>
          <el-form-item label-position="right" label="时间单位" prop="timeMold">
            <el-input v-model="feeForm.timeMold" class="length"></el-input>
          </el-form-item>
          <el-form-item label="收费方式" prop="feeMethod">
            <el-select class="length" v-model="feeForm.feeMethod" clearable placeholder="请选择收费方式">
              <el-option label="面向宿舍" value="DORM"></el-option>
              <el-option label="面向专业" value="MAJOR"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="借方会计科目" prop="debitAccountId">
            <select-account v-model="feeForm.debitAccountId" height="32" width="250px"></select-account>
          </el-form-item>
          <el-form-item label="贷方会计科目" prop="creditAccountId">
            <select-account v-model="feeForm.creditAccountId" height="32" width="250px"></select-account>
          </el-form-item>
          <el-form-item label="状态" style="margin-left:35px">
            <el-radio-group class="length" v-model="feeForm.state">
              <el-radio label="TRUE">启用</el-radio>
              <el-radio label="FALSE">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import "@/assets/css/charge/feeKind.css";

export default {
  name: "feeKind",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      cellStyle: { display: "block" },
      dialogFormVisible: false,
      feeForm: {
        name: "",
        timeMold: "",
        amount: "",
        feeMethod: "",
        state: "TRUE",
        debitAccountId: "",
        creditAccountId:""
      },
      rules: {
        name: [{ required: true, message: "请输入费用名称", trigger: "blur" }],
        timeMold: [
          { required: true, message: "请输入费用时间单位", trigger: "blur" }
        ],
        amount: [
          { required: true, message: "请输入应收金额", trigger: "blur" },
          { type: "number", message: "应收金额必须为数字值" }
        ],
        feeMethod: [
          { required: true, message: "请选择收费方式", trigger: "change" }
        ],
        debitAccountId: [
          {
            required: true,
            message: "请选择借方会计科目",
            trigger: "change"
          }
        ],
        creditAccountId: [
          {
            required: true,
            message: "请选择贷方会计科目",
            trigger: "change"
          }
        ],
      },
      accountList: [],
      formOptions: [
        {
          label: "费用名称", // label文字
          prop: "name", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入费用名称" // elementui组件属性
        },
        {
          label: "状态", // label文字
          prop: "state", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "状态", // elementui组件属性
          options: [
            { label: "是", value: "TRUE" },
            { label: "否", value: "FALSE" }
          ],
          initValue: "TRUE"
        }
      ],
      pageSize: 10,
      total: 0,
      pageNum: 1,
      flag: true,
      searchVal: {
        name: "",
        state: ""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    search(val) {
      var url = "/charge/feeKindList";
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
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = this.Utils.copyObj(this.searchVal);
      data.pageNum = val;
      this.search(data);
    },
    handleEdit(index, row) {
      this.feeForm = this.Utils.copyObj(row);
      this.flag = false;
      this.dialogFormVisible = true;
    },
    add() {
      this.flag = true;
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
          if (this.flag) {
            this.axios.post("/charge/feeKind", this.feeForm).then(res => {
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
            this.axios.put("/charge/feeKind", this.feeForm).then(res => {
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
    }
  },
  created() {
    this.search({state:"TRUE"});
  },
  mounted() {}
};
</script>
<style scoped>
</style>