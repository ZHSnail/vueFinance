<template>
  <div class="floatWageView">
    <searchForm :formOptions="formOptions" btnItems="search,export"></searchForm>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
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
              <el-option label="教师类" value="TCH"></el-option>
              <el-option label="高级管理类" value="SEN"></el-option>
              <el-option label="职能管理类" value="FUNC"></el-option>
              <el-option label="其他类" value="OTH"></el-option>
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
  name: "floatWageView",
  components: {},
  props: {},
  data() {
    return {
      tableData: [
        {
          name: "校长",
          type: "高级管理类",
          status: "TRUE"
        },
        {
          name: "专业老师",
          type: "教师类",
          status: "TRUE"
        },
        {
          name: "财务人员",
          type: "职能管理类",
          status: "TRUE"
        },
        {
          name: "财务人员",
          type: "其他类",
          status: "TRUE"
        }
      ],
      dialogFormVisible: false,
      stationForm: {
        name: "",
        type: "",
        status: "TRUE"
      },
      rules: {
        name: [{ required: true, message: "请输入岗位名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择岗位类别", trigger: "change" }]
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
        }
      ],
      total: 200,
      pageSize: 10
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
    handleClose(formName) {
      //关闭之后清除表单的内容，
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
</style>