<template>
  <div class="floatWageView">
    <searchForm :formOptions="formOptions" btnItems="search,export"></searchForm>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="code" label="编码"></el-table-column>
      <el-table-column align="center" prop="name" label="名称"></el-table-column>
      <el-table-column align="center" prop="taxType" label="计税类型"></el-table-column>
      <el-table-column align="center" prop="signType" label="扣减分类"></el-table-column>
      <el-table-column align="center" prop="account" label="工资出处科目"></el-table-column>
      <el-table-column align="center" label="金额">
        <template slot-scope="scope">
          <span>{{scope.row.amount+"元"}}</span>
        </template>
      </el-table-column>
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
        :visible.sync="show"
        width="35%"
        @close="handleClose('stationForm')"
        :close-on-click-modal="false"
        center
      >
        <el-form ref="stationForm" :rules="rules" :model="stationForm" :status-icon="true">
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
          <el-form-item label="状态" style="margin-left:35px" prop="status">
            <el-radio-group class="length" v-model="stationForm.status">
              <el-radio label="TRUE">启用</el-radio>
              <el-radio label="FALSE">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="show = !show">取 消</el-button>
          <el-button type="primary" @click="show = !show">确 定</el-button>
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
    isShow: Boolean
  },
  data() {
    return {
      show: false,
      tableData: [
        {
          id: "1",
          code: "001",
          name: "住房补贴",
          amount: 220,
          taxType: "应税项",
          signType: "应发项",
          status: "TRUE"
        },
        {
          id: "2",
          code: "002",
          name: "餐费补贴",
          amount: 220,
          taxType: "非税项",
          signType: "扣减项",
          status: "TRUE"
        },
        {
          id: "3",
          code: "003",
          name: "交通补贴",
          amount: 220,
          taxType: "税前扣减项",
          signType: "单位缴纳",
          status: "TRUE"
        },
        {
          id: "4",
          code: "004",
          name: "交通补贴",
          amount: 220,
          taxType: "税前扣减项",
          signType: "单位缴纳",
          status: "TRUE"
        }
      ],
      stationForm: {
        code: "",
        name: "",
        amount: "",
        taxType: "",
        signType: "",
        status: "TRUE"
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
        ]
      },
      formOptions: [
        {
          label: "名称", // label文字
          prop: "name", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入名称" // elementui组件属性
        }
      ],
      total: 200,
      pageSize: 10
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
      this.show = true;
    },
    handleClose(formName) {
      //关闭之后清除表单的内容，
      this.$refs[formName].resetFields();
      this.Utils.clearObj(this.stationForm);
    }
  },
  created() {},
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