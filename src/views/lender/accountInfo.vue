<template>
  <div class="accountInfo">
    <div>
      <my-pageheader titleContent="会计科目表" :needButton="true">
        <el-dropdown trigger="click" @command="handleCommand">
          <el-button type="primary">
            更多
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="add">添加会计科目</el-dropdown-item>
            <el-dropdown-item command="import">导入会计科目</el-dropdown-item>
            <el-dropdown-item command="result">查看导入结果</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </my-pageheader>
    </div>
    <div>
      <searchForm
        :formOptions="formOptions"
        @onSearch="search"
        @onExport="exportData"
        btnItems="search,export"
      ></searchForm>
    </div>
    <el-table
      cell-class-name="centerAlign"
      :data="tableData"
      stripe
      row-key="id"
      style="width: 100%"
      :tree-props="{children: 'children'}"
    >
      >
      <el-table-column align="center" prop="accountName" label="科目名称"></el-table-column>
      <el-table-column align="center" prop="code" label="科目编码"></el-table-column>
      <el-table-column align="center" prop="level" label="级次"></el-table-column>
      <el-table-column align="center" prop="isCash" label="是否现金"></el-table-column>
      <el-table-column align="center" prop="isBank" label="是否银行"></el-table-column>
      <el-table-column align="center" prop="isDetail" label="是否明细"></el-table-column>
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
    <div>
      <el-dialog
        title="添加会计科目"
        :visible.sync="dialogFormVisible"
        width="35%"
        @close="handleClose('accountForm')"
        :close-on-click-modal="false"
        center
      >
        <el-form
          ref="accountForm"
          size="small"
          :rules="rules"
          :model="accountForm"
          :status-icon="true"
        >
          <el-form-item label="科目名称" prop="accountName">
            <el-input v-model="accountForm.accountName" class="length"></el-input>
          </el-form-item>
          <el-form-item label-position="right" label="科目编码" prop="code">
            <el-input v-model.number="accountForm.code" class="length"></el-input>
          </el-form-item>
          <el-form-item label="级次" prop="level" style="margin-left:30px">
            <el-input @change="getAccount()" v-model.number="accountForm.level" class="length"></el-input>
          </el-form-item>
          <el-form-item label="父级科目" v-if="accountForm.level>1" prop="parentId">
            <el-select class="length" v-model="accountForm.parentId" placeholder="请选择父级科目">
              <el-option
                v-for="item in accountList"
                :key="item.id"
                :label="item.accountName"
                :value="item.id"
              >
                <el-row>
                  <el-col :span="12">{{ item.code }}</el-col>
                  <el-col :span="12" class="rightAlign">{{item.accountName}}</el-col>
                </el-row>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否明细" prop="isDetail">
            <el-select class="length" v-model="accountForm.isDetail" placeholder="请选择是否明细">
              <el-option label="是" value="TRUE"></el-option>
              <el-option label="否" value="FALSE"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否现金" prop="isCash">
            <el-select class="length" v-model="accountForm.isCash" placeholder="请选择是否现金">
              <el-option label="是" value="TRUE"></el-option>
              <el-option label="否" value="FALSE"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否银行" prop="isBank">
            <el-select class="length" v-model="accountForm.isBank" placeholder="请选择是否银行">
              <el-option label="是" value="TRUE"></el-option>
              <el-option label="否" value="FALSE"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <import-excel
      :is-show.sync="show"
      @importFile="importFile"
      templateName="ACCOUNT_IMPORT"
      title="导入会计科目"
    ></import-excel>
    <import-result :is-show.sync="resultShow" :fileId="fileId" title="导入结果"></import-result>
    <el-row>
      <el-col :span="24">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="totalTableData.length"
          class="centerAlign"
          :hide-on-single-page="true"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "accountInfo",
  components: {},
  props: {},
  data() {
    return {
      formOptions: [
        {
          label: "科目名称", // label文字
          prop: "accountName", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入科目名称" // elementui组件属性
        },
        {
          label: "科目编码", // label文字
          prop: "code", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入科目编码" // elementui组件属性
        }
      ],
      dialogFormVisible: false,
      accountForm: {
        accountName: "",
        code: "",
        level: "",
        parentId: "",
        isCash: "TRUE",
        isBank: "TRUE",
        isDetail: "TRUE"
      },
      rules: {
        accountName: [
          { required: true, message: "请输入科目名称", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入科目编码", trigger: "blur" },
          { type: "number", message: "科目级次必须为数字值" }
        ],
        level: [
          { required: true, message: "请输入科目级次", trigger: "blur" },
          { type: "number", message: "科目级次必须为数字值" }
        ],
        isCash: [
          { required: true, message: "请选择是否现金", trigger: "change" }
        ],
        isBank: [
          { required: true, message: "请选择是否银行", trigger: "change" }
        ],
        isDetail: [
          { required: true, message: "请选择是否明细", trigger: "change" }
        ],
        parentId: [
          { required: true, message: "请选择父级科目", trigger: "change" }
        ]
      },
      accountList: [],
      tableData: [],
      totalTableData: [],
      pageSize: 10,
      show: false,
      fileId: "",
      resultShow: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    save() {
      var formRefs = [this.$refs["accountForm"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          this.axios.post("/lender/account", this.accountForm).then(res => {
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
      });
    },
    getAccount() {
      var url = "/lender/lastAccounts/" + this.accountForm.level;
      this.axios.get(url).then(res => {
        if (res.success) {
          this.accountList = res.obj;
        }
      });
    },
    handleClose(formName) {
      this.$refs[formName].resetFields();
      this.Utils.clearObj(this.accountForm);
    },
    handleCurrentChange(page) {
      var pageSize = this.pageSize;
      var start = (page - 1) * pageSize;
      var end = start + pageSize;
      this.tableData = this.totalTableData.slice(start, end);
    },
    search(val) {
      var url = "/lender/accountCondition";
      var data = JSON.stringify(val) ? JSON.stringify(val) : "";
      this.axios.get(url, { params: { params: data } }).then(res => {
        if (res.success) {
          this.totalTableData = res.obj;
          this.tableData = this.totalTableData.slice(0, 10);
          this.total = this.totalTableData.size;
        }
      });
    },
    handleDelete(id) {
      var url = "/lender/account/" + id;
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
    handleCommand(command) {
      if (command == "add") {
        this.dialogFormVisible = true;
      }
      if (command == "import") {
        this.show = !this.show;
      }
      if (command == "result") {
        this.resultShow = !this.resultShow;
      }
    },
    exportData(val) {
      var url = "/lender/accountExport";
      var data = JSON.stringify(val) ? JSON.stringify(val) : "";
      this.Utils.downloadFile(url, { data: data });
    },
    importFile(id) {
      this.fileId = id;
      this.axios.post("/lender/importAccount/" + id).then(res => {
        this.$message("正在导入数据，请在导入数据结果中查看！");
        this.show = !this.show;
        this.search();
      });
    }
  },
  created() {
    this.uploadUrl = this.Utils.getUrl();
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