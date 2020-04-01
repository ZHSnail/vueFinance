<template>
  <div class="payStubInfo">
    <my-pageheader
      titleContent="工资单管理"
      :needButton="true"
      buttonContent="添加"
      @handleClick="show = !show"
    ></my-pageheader>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="name" label="名称"></el-table-column>
      <el-table-column align="center" prop="scope" label="适用范围"></el-table-column>
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
    <div>
      <el-dialog
        title="添加工资单"
        :visible.sync="show"
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
              <el-option
                v-for="item in staffkind"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="扣减项" prop="deduct">
            <el-select
              class="length"
              v-model="payStubForm.deduct"
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
          <el-form-item label="应发项" prop="shouldPaid">
            <el-select
              class="length"
              v-model="payStubForm.shouldPaid"
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
          <el-form-item label="单位缴纳" prop="unitPay">
            <el-select
              class="length"
              v-model="payStubForm.unitPay"
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
          <el-button @click="show = !show">取 消</el-button>
          <el-button type="primary" @click="show = !show">确 定</el-button>
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
      show: false,
      tableData: [
        {
          id: 1,
          scope: "教师类", //适用范围
          name: "教师类工资单",
          deduct: ["餐费补贴"],
          shouldPaid: ["住房补贴"],
          unitPay: ["交通补贴", "交通补贴"],
          amount: 220
        },
        {
          id: 2,
          scope: "高级管理类",
          deduct: ["餐费补贴"],
          shouldPaid: ["住房补贴"],
          unitPay: ["交通补贴", "交通补贴"],
          name: "高级管理类工资单",
          amount: 220
        },
        {
          id: 3,
          scope: "职能管理类",
          deduct: ["餐费补贴"],
          shouldPaid: ["住房补贴"],
          unitPay: ["交通补贴", "交通补贴"],
          name: "职能管理类工资单",
          amount: 220
        },
        {
          id: 4,
          scope: "其他类",
          deduct: ["餐费补贴"],
          shouldPaid: ["住房补贴"],
          unitPay: ["交通补贴", "交通补贴"],
          name: "其他类工资单",
          amount: 220
        }
      ],
      payStubForm: {
        name: "",
        scope: "",
        deduct: [],
        shouldPaid: [],
        unitPay: []
      },
      staffkind: [
        {
          id: "1",
          name: "高级管理类"
        },
        {
          id: "2",
          name: "教师类"
        },
        {
          id: "3",
          name: "职能管理类"
        },
        {
          id: "4",
          name: "其它类"
        }
      ],
      floatWage: {
        deductList: [
          {
            id: "2",
            name: "餐费补贴",
            amount: 220
          }
        ],
        shouldPaidList: [
          {
            id: "1",
            name: "住房补贴",
            amount: 220
          }
        ],
        unitPayList: [
          {
            id: "3",
            name: "交通补贴",
            amount: 220
          },
          {
            id: "4",
            name: "交通补贴",
            amount: 220
          }
        ]
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        scope: [
          { required: true, message: "请选择适用范围", trigger: "change" }
        ],
        deduct: [
          { required: true, message: "请选择扣减项", trigger: "change" }
        ],
        shouldPaid: [
          { required: true, message: "请选择应发项", trigger: "change" }
        ],
        unitPay: [
          { required: true, message: "请选择单位缴纳", trigger: "change" }
        ]
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    add() {
      this.$router.push({ path: "payStubAdd" });
    },
    handleEdit(row) {
      this.payStubForm = this.Utils.copyObj(row);
      this.show = true;
    },
    handleClose() {
      this.$refs["payStubForm"].resetFields();
      this.Utils.clearObj(this.payStubForm);
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
.payStubInfo >>> .el-form-item__label {
  width: 80px;
}
</style>