<template>
  <div class="stationInfo">
    <div>
      <my-pageheader titleContent="岗位设置" :needButton="true" buttonContent="添加" @handleClick="add"></my-pageheader>
    </div>
    <searchForm :formOptions="formOptions" @onSearch="search" btnItems="search,export" @onExport="exportData"></searchForm>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="name" label="岗位名称"></el-table-column>
      <el-table-column align="center" prop="typeName" label="岗位类型"></el-table-column>
      <el-table-column align="center" label="薪级工资出处科目">
        <el-table-column align="center" prop="debitScaleAccName" label="借方"></el-table-column>
        <el-table-column align="center" prop="creditScaleAccName" label="贷方"></el-table-column>
      </el-table-column>
      <el-table-column align="center" label="岗位工资出处科目">
        <el-table-column align="center" prop="debitStationAccName" label="借方"></el-table-column>
        <el-table-column align="center" prop="creditStationAccName" label="贷方"></el-table-column>
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
        :visible.sync="dialogFormVisible"
        width="35%"
        @close="handleClose('stationForm')"
        :close-on-click-modal="false"
        center
      >
        <el-form ref="stationForm" :rules="rules" :model="stationForm" :state-icon="true">
          <el-form-item label="岗位名称" prop="name">
            <el-input v-model="stationForm.name" class="length"></el-input>
          </el-form-item>
          <el-form-item label="岗位类别" prop="type">
            <el-select class="length" v-model="stationForm.type" clearable placeholder="请选择岗位类别">
              <el-option label="教师类" value="TCH"></el-option>
              <el-option label="高级管理类" value="SEN"></el-option>
              <el-option label="职能管理类" value="FUNC"></el-option>
              <el-option label="其他类" value="OTH"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="薪级借方会计科目" prop="debitScaleAccId">
            <select-account v-model="stationForm.debitScaleAccId" width="250px"></select-account>
          </el-form-item>
          <el-form-item label="薪级贷方会计科目" prop="creditScaleAccId">
            <select-account v-model="stationForm.creditScaleAccId" width="250px"></select-account>
          </el-form-item>
          <el-form-item label="岗位借方会计科目" prop="debitStationAccId">
            <select-account v-model="stationForm.debitStationAccId" width="250px"></select-account>
          </el-form-item>
          <el-form-item label="岗位贷方会计科目" prop="creditStationAccId">
            <select-account v-model="stationForm.creditStationAccId" width="250px"></select-account>
          </el-form-item>
          <el-form-item label="状态" style="margin-left:35px" prop="state">
            <el-radio-group class="length" v-model="stationForm.state">
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
export default {
  name: "stationInfo",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      pageSize: 10,
      total: 0,
      pageNum: 1,
      dialogFormVisible: false,
      flag: true,
      searchVal: {
        name: "",
        type: "",
        state: ""
      },
      stationForm: {
        name: "",
        type: "",
        debitScaleAccId: "",
        creditScaleAccId: "",
        debitStationAccId: "",
        creditStationAccId: "",
        state: "TRUE"
      },
      rules: {
        name: [{ required: true, message: "请输入岗位名称", trigger: "blur" }],
        type: [
          { required: true, message: "请选择岗位类别", trigger: "change" }
        ],
        debitScaleAccId: [
          {
            required: true,
            message: "请选择薪级借方会计科目",
            trigger: "change"
          }
        ],
        creditScaleAccId: [
          {
            required: true,
            message: "请选择薪级贷方会计科目",
            trigger: "change"
          }
        ],
        debitStationAccId: [
          {
            required: true,
            message: "请选择岗位借方会计科目",
            trigger: "change"
          }
        ],
        creditStationAccId: [
          {
            required: true,
            message: "请选择岗位借方会计科目",
            trigger: "change"
          }
        ]
      },
      formOptions: [
        {
          label: "岗位名称", // label文字
          prop: "name", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入岗位名称" // elementui组件属性
        },

        {
          label: "岗位类别", // label文字
          prop: "type", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "请选择岗位类别", // elementui组件属性
          options: [
            { label: "教师类", value: "TCH" },
            { label: "高级管理类", value: "SEN" },
            { label: "职能管理类", value: "FUNC" },
            { label: "其他类", value: "OTH" }
          ]
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
    handleEdit(index, row) {
      this.stationForm = this.Utils.copyObj(row);
      this.flag = false;
      this.dialogFormVisible = true;
    },   
    handleClose(formName) {
      //关闭之后清除表单的内容，
      this.$refs[formName].resetFields();
      this.stationForm.name = "";
      this.stationForm.type = "";
      this.stationForm.state = "TRUE";
      this.Utils.clearObj(this.stationForm);
    },
    save() {
      var formRefs = [this.$refs["stationForm"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          if (this.flag) {
            this.axios
              .post("/salary/stationInfo", this.stationForm)
              .then(res => {
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
            this.axios
              .put("/salary/stationInfo", this.stationForm)
              .then(res => {
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
      var url = "/salary/stationInfoList";
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
      var url = "/salary/stationInfoExport";
      var data = JSON.stringify(val) ? JSON.stringify(val) : "";
      this.Utils.downloadFile(url, { data: data });
    },
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
</style>