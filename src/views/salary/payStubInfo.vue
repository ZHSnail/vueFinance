<template>
  <div class="payStubInfo">
    <my-pageheader titleContent="工资单管理" :needButton="true" buttonContent="添加" @handleClick="add"></my-pageheader>
    <searchForm :formOptions="formOptions" @onSearch="search" btnItems="search"></searchForm>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="name" label="名称"></el-table-column>
      <el-table-column align="center" prop="scopeName" label="适用范围"></el-table-column>
      <el-table-column align="center" prop="deduct" label="扣减项"></el-table-column>
      <el-table-column align="center" prop="shouldPaid" label="应发项"></el-table-column>
      <el-table-column align="center" prop="unitPay" label="单位缴纳"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip effect="light" content="编辑" placement="bottom">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.row)"
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
        title="添加工资单"
        :visible.sync="dialogFormVisible"
        width="35%"
        @close="handleClose"
        :close-on-click-modal="false"
        center
      >
        <el-form ref="payStubForm" :rules="rules" :model="payStubForm" :status-icon="true">
          <el-form-item label="名称" prop="name">
            <el-input v-model="payStubForm.name" class="length"></el-input>
          </el-form-item>
          <el-form-item label="适用范围" prop="scope">
            <el-select class="length" clearable v-model="payStubForm.scope" placeholder="请选择使用范围">
              <el-option label="教师类" value="TCH"></el-option>
              <el-option label="高级管理类" value="SEN"></el-option>
              <el-option label="职能管理类" value="FUNC"></el-option>
              <el-option label="其他类" value="OTH"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="扣减项" prop="deductList">
            <el-select
              class="length"
              v-model="payStubForm.deductList"
              multiple
              clearable
              placeholder="请选择扣减项"
            >
              <el-option
                v-for="item in floatWage.deductList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <el-row>
                  <el-col :span="12">{{ item.name }}</el-col>
                  <el-col :span="12" class="rightAlign">金额：{{ item.amount+" " }}元</el-col>
                </el-row>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应发项" prop="shouldPaidList">
            <el-select
              class="length"
              v-model="payStubForm.shouldPaidList"
              multiple
              clearable
              placeholder="请选择应发项"
            >
              <el-option
                v-for="item in floatWage.shouldPaidList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <el-row>
                  <el-col :span="12">{{ item.name }}</el-col>
                  <el-col :span="12" class="rightAlign">金额：{{ item.amount+" " }}元</el-col>
                </el-row>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位缴纳" prop="unitPayList">
            <el-select
              class="length"
              v-model="payStubForm.unitPayList"
              multiple
              clearable
              placeholder="请选择单位缴纳"
            >
              <el-option
                v-for="item in floatWage.unitPayList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <el-row>
                  <el-col :span="12">{{ item.name }}</el-col>
                  <el-col :span="12" class="rightAlign">金额：{{ item.amount+" " }}元</el-col>
                </el-row>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = !dialogFormVisible">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "payStubInfo",
  components: {},
  props: {},
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      payStubForm: {
        name: "",
        scope: "",
        deductList: [],
        shouldPaidList: [],
        unitPayList: []
      },
      floatWage: {},
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        scope: [
          { required: true, message: "请选择适用范围", trigger: "change" }
        ],
        deductList: [
          { required: true, message: "请选择扣减项", trigger: "change" }
        ],
        shouldPaidList: [
          { required: true, message: "请选择应发项", trigger: "change" }
        ],
        unitPayList: [
          { required: true, message: "请选择单位缴纳", trigger: "change" }
        ]
      },
      pageSize: 10,
      total: 0,
      pageNum: 1,
      flag: true,
      searchVal: {
        name: ""
      },
      formOptions: [
        {
          label: "名称", // label文字
          prop: "name", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入工资单名称" // elementui组件属性
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleEdit(row) {
      this.payStubForm = this.Utils.copyObj(row);
      this.flag = false;
      this.dialogFormVisible = true;
    },
    handleClose() {
      this.$refs["payStubForm"].resetFields();
      this.Utils.clearObj(this.payStubForm);
    },
    add() {
      this.flag = true;
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    save() {
      var formRefs = [this.$refs["payStubForm"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          if (this.flag) {
            this.axios
              .post("/salary/payStubInfo", this.payStubForm)
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
              .put("/salary/payStubInfo", this.payStubForm)
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
      var url = "/salary/payStubInfoList";
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
    findFloatWage() {
      var url = "/salary/selectFloatWageInfo";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.floatWage = res.obj;
        }
      });
    }
  },
  created() {
    this.search();
    this.findFloatWage();
  },
  mounted() {}
};
</script>
<style scoped>
.el-form-item {
  display: flex;
  justify-content: center;
}
.payStubInfo >>> .el-form-item__label {
  width: 80px;
}
</style>