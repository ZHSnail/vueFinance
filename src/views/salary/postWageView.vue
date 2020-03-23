<template>
  <div class="postWageView">
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="type" label="类别"></el-table-column>
      <el-table-column align="center" label="岗位工资标准">
        <template slot-scope="scope">
          <span>{{scope.row.stationAmount+"元"}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="stationStage" label="岗位工资级数"></el-table-column>
      <el-table-column align="center" prop="stationGrad" label="岗位工资级差"></el-table-column>
      <el-table-column align="center" label="薪级工资标准">
        <template slot-scope="scope">
          <span>{{scope.row.scaleAmount+"元"}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="scaleStage" label="薪级工资级数"></el-table-column>
      <el-table-column align="center" prop="scaleGrad" label="薪级工资级差"></el-table-column>
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
        width="1100px"
        @close="handleClose('stationForm')"
        :close-on-click-modal="false"
        center
      >
        <el-form ref="stationForm" :rules="rules" :model="stationForm" :status-icon="true">
          <el-form-item label="类别" style="margin-left:55px" prop="type">
            <el-input v-model="stationForm.type" class="length" disabled></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="岗位工资标准" prop="stationAmount">
                <el-input v-model.number="stationForm.stationAmount" class="length"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="岗位工资级数" prop="stationStage">
                <el-input v-model.number="stationForm.stationStage" class="length"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="岗位工资级差" prop="stationGrad">
                <el-input v-model.number="stationForm.stationGrad" class="length"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="薪级工资标准" prop="scaleAmount">
                <el-input v-model.number="stationForm.scaleAmount" class="length"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="薪级工资级数" prop="scaleStage">
                <el-input v-model.number="stationForm.scaleStage" class="length"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="薪级工资级差" prop="scaleGrad">
                <el-input v-model.number="stationForm.scaleGrad" class="length"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="状态" style="margin-left:55px" prop="status">
            <el-radio-group class="length" v-model="stationForm.status">
              <el-radio label="TRUE">启用</el-radio>
              <el-radio label="FALSE">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = !dialogFormVisible">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = !dialogFormVisible">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "postWageView",
  components: {},
  props: {},
  data() {
    return {
      tableData: [
        {
          type: "教师类",
          stationAmount: 1000, //岗位工资标准
          stationStage: 10, //岗位工资级数
          stationGrad: 200, //岗位工资级差
          scaleAmount: 220, //薪级工资标准
          scaleStage: 10, //薪级工资级数
          scaleGrad: 200, //薪级工资级差
          status: "TRUE"
        },
        {
          type: "高级管理类",
          stationAmount: 1000, //岗位工资标准
          stationStage: 10, //岗位工资级数
          stationGrad: 200, //岗位工资级差
          scaleAmount: 220, //薪级工资标准
          scaleStage: 10, //薪级工资级数
          scaleGrad: 200, //薪级工资级差
          status: "TRUE"
        },
        {
          type: "职能管理类",
          stationAmount: 1000, //岗位工资标准
          stationStage: 10, //岗位工资级数
          stationGrad: 200, //岗位工资级差
          scaleAmount: 220, //薪级工资标准
          scaleStage: 10, //薪级工资级数
          scaleGrad: 200, //薪级工资级差
          status: "TRUE"
        },
        {
          type: "其他类",
          stationAmount: 1000, //岗位工资标准
          stationStage: 10, //岗位工资级数
          stationGrad: 200, //岗位工资级差
          scaleAmount: 220, //薪级工资标准
          scaleStage: 10, //薪级工资级数
          scaleGrad: 200, //薪级工资级差
          status: "TRUE"
        }
      ],
      stationForm: {
        type: "",
        stationAmount: "", //岗位工资标准
        stationStage: "", //岗位工资级数
        stationGrad: "", //岗位工资级差
        scaleAmount: "", //薪级工资标准
        scaleStage: "", //薪级工资级数
        scaleGrad: "", //薪级工资级差
        status: "TRUE"
      },
      rules: {
        amount: [
          { required: true, message: "请输入金额", trigger: "blur" },
          { type: "number", message: "金额必须为数字值" }
        ],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入编码", trigger: "change" }]
      },
      dialogFormVisible: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleEdit(index, row) {
      this.stationForm.type = row.type;
      this.stationForm.stationAmount = row.stationAmount;
      this.stationForm.stationStage = row.stationStage;
      this.stationForm.stationGrad = row.stationGrad;
      this.stationForm.scaleAmount = row.scaleAmount;
      this.stationForm.scaleStage = row.scaleStage;
      this.stationForm.scaleGrad = row.scaleGrad;
      this.stationForm.status = row.status;
      this.dialogFormVisible = true;
    },
    handleClose(formName) {
      //关闭之后清除表单的内容，
      this.$refs[formName].resetFields();
      this.stationForm.name = "";
      this.stationForm.code = "";
      this.stationForm.amount = "";
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