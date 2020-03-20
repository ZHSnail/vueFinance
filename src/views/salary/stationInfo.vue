<template>
  <div class="stationInfo">
    <div>
      <my-pageheader titleContent="岗位设置" :needButton="true">
        <el-dropdown trigger="click" @command="handleCommand">
          <el-button type="primary">
            更多
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="addStation">新增岗位</el-dropdown-item>
            <el-dropdown-item command="importStation">导入岗位</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </my-pageheader>
    </div>
    <el-table
        cell-class-name="centerAlign"
        :data="tableData"
        stripe
        style="width: 100%"
        max-height="450"
    >
    <el-table-column align="center" prop="name" label="岗位名称"></el-table-column>
    <el-table-column align="center" prop="type" label="岗位类型"></el-table-column>
    <el-table-column align="center" label="状态">
      <template slot-scope="scope">
            <span>{{scope.row.status == "TRUE" ? "启用":"停用"}}</span>
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
    <div>
      <el-dialog
        title="添加岗位"
        :visible.sync="dialogFormVisible"
        width="35%"
        @close="handleClose('stationForm')"
        :close-on-click-modal="false"
        center
      >
        <el-form ref="stationForm" :rules="rules" :model="stationForm" :status-icon="true">
          <el-form-item label="岗位名称" prop="name">
            <el-input v-model="stationForm.name" class="length"></el-input>
          </el-form-item>
          <el-form-item label="岗位类别" prop="type">
            <el-select class="length" v-model="stationForm.type" clearable placeholder="请选择岗位类别">
              <el-option label="教师类" value="DORM"></el-option>
              <el-option label="高级管理类" value="MAJOR"></el-option>
              <el-option label="职能管理类" value="ROLE"></el-option>
              <el-option label="其他类" value="ROLE"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" style="margin-left:35px" prop="status">
            <el-radio-group class="length" v-model="stationForm.status">
              <el-radio label="TRUE">启用</el-radio>
              <el-radio label="FALSE">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
      tableData: [
        {
          name:"校长",
          type:"高级管理类",
          status:"TRUE"
        },
        {
          name:"专业老师",
          type:"教师类",
          status:"TRUE"
        },
        {
          name:"财务人员",
          type:"职能管理类",
          status:"TRUE"
        },
        {
          name:"财务人员",
          type:"其他类",
          status:"TRUE"
        },       
      ],
      cellStyle: { display: "block" },
      dialogFormVisible: false,
      stationForm: {
        name: "",
        type: "",
        status: "TRUE",      
      },
      rules: {
        name: [{ required: true, message: "请输入岗位名称", trigger: "blur" }],
        type: [
          { required: true, message: "请选择岗位类别", trigger: "change" }
        ],
      },
      
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleEdit(index, row) {
      this.stationForm.name = row.name;
      this.stationForm.type = row.type;
      this.stationForm.status = row.status;
      this.dialogFormVisible = true;    
    },
    handleCommand(command) {
      if (command == "addStation") {
        this.dialogFormVisible = true;
      }
      if (command == "importStation") {
        this.$message("click on item " + command);
      }
    },
    handleClose(formName) {
      //关闭之后清除表单的内容，
      console.log(formName);
      this.$refs[formName].resetFields();
      this.stationForm.name = "";
      this.stationForm.type = "";
      this.stationForm.status = "TRUE";
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
</style>