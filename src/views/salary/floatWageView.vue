<template>
  <div class="floatWageView">
    <searchForm :formOptions="formOptions" btnItems="search,export"></searchForm>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="code" label="编码"></el-table-column>
      <el-table-column align="center" prop="name" label="名称"></el-table-column>
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
          code: "001",
          name: "住房补贴",
          amount:220,
          status: "TRUE"
        },
        {
          code: "002",
          name: "餐费补贴",
          amount:220,
          status: "TRUE"
        },
        {
          code: "003",
          name: "交通补贴",
          amount:220,
          status: "TRUE"
        },
        {
          code: "004",
          name: "交通补贴",
          amount:220,
          status: "TRUE"
        }
      ],
      stationForm: {
        code:"",
        name: "",
        amount: "",
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
      this.stationForm.name = row.name;
      this.stationForm.amount = row.amount;
      this.stationForm.code = row.code;
      this.stationForm.status = row.status;
      this.show = true;
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
</style>