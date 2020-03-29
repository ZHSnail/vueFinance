<template>
  <div class="payStubAdd">
    <my-pageheader :titleContent="title"></my-pageheader>
    <my-collapse title="基本信息" class="leftAlign">
      <el-form ref="payStubForm" :rules="rules" :model="payStubForm" :status-icon="true">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model.number="payStubForm.name" class="length"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="适用范围" prop="scope">
              <el-select class="length" clearable placeholder="请选择适用范围" v-model="payStubForm.scope">
                <el-option
                  v-for="item in staffkind"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </my-collapse>
    <my-collapse title="工资项设置" class="leftAlign">
      <el-row>
        <el-col :span="12">
          <div class="el-form-item">
            <label for="baseSalary" class="el-form-item__label">基本工资公式</label>
            <el-input v-model="baseWage" readonly class="length"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="el-form-item">
            <label for="floatWageFormula" class="el-form-item__label">浮动工资公式</label>
            <el-input type="textarea" readonly  :rows="5" v-model="floatWageFormula" class="length"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="openFloatWage">设置计算项</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="el-form-item">
            <label for="floatWageFormula" class="el-form-item__label">浮动工资速算</label>
            <el-input readonly v-model="totalAmount" class="length"></el-input>
          </div>
        </el-col>
      </el-row>
    </my-collapse>
    <el-dialog
      title="设置浮动工资公式"
      :visible.sync="dialogFormVisible"
      @close="handleClose"
      width="800px"
      :close-on-click-modal="false"
      center
    >
      <el-row>
        <el-col :span="24">
          <h3>浮动工资项</h3>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedFloatWage" @change="handleCheckedFloatWageChange">
            <div
              style="display:inline;margin-right:5px"
              v-for="floatWage in floatWageList"
              :key="floatWage.code"
            >
              <el-checkbox border :label="floatWage.code">{{floatWage.name}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <h3>运算符</h3>
          <el-button @click="calcFloatWage('+')">加</el-button>
          <el-button @click="calcFloatWage('-')">减</el-button>
          <el-button @click="reset()">重置</el-button>
        </el-col>
        <el-col :span="12">
          <h3>浮动工资速算预览</h3>
          <el-input readonly v-model="totalAmountView"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <h3>公式预览</h3>
          <el-input type="textarea" v-model="floatWageView" readonly :title="floatWageView"></el-input>
        </el-col>
      </el-row>
      <el-row class="rightAlign">
        <el-col :span="24">
          <el-button type="primary" style="margin-top:5px;" @click="saveFloatWage">保存</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <div class="rightAlign">
      <el-button type="primary" @click="save()">暂存</el-button>
      <el-button type="primary" @click="commit('staffForm')">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "payStubAdd",
  components: {},
  props: {},
  data() {
    return {
      title: "",
      payStubForm: {
        name: "",
        scope: ""
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
      baseWage: "岗位工资+薪级工资",
      floatWageFormula: "",
      dialogFormVisible: false,
      floatWageList: [
        {
          code: "001",
          name: "住房补贴",
          amount: 220
        },
        {
          code: "002",
          name: "餐费补贴",
          amount: 220
        },
        {
          code: "003",
          name: "交通补贴",
          amount: 220
        },
        {
          code: "004",
          name: "交通补贴",
          amount: 220
        }
      ],
      checkAll: false,
      isIndeterminate: true,
      checkedFloatWage: [],
      floatWageView: "",
      totalFloatWageList: [
        {
          code: "001",
          name: "住房补贴",
          amount: 220
        },
        {
          code: "002",
          name: "餐费补贴",
          amount: 220
        },
        {
          code: "003",
          name: "交通补贴",
          amount: 220
        },
        {
          code: "004",
          name: "交通补贴",
          amount: 220
        }
      ],
      totalAmountView: 0,
      totalAmount:0,
    };
  },
  watch: {},
  computed: {},
  methods: {
    openFloatWage() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    handleCheckAllChange(val) {
      if (val) {
        this.floatWageList.forEach(item => {
          this.checkedFloatWage.push(item.code);
        });
      } else {
        this.checkedFloatWage = [];
      }
      this.isIndeterminate = false;
    },
    handleCheckedFloatWageChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.floatWageList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.floatWageList.length;
    },
    saveFloatWage() {
      this.floatWageFormula = this.Utils.copyObj(this.floatWageView);
      this.dialogFormVisible = false;
      var temp = this.totalAmountView;
      this.totalAmount = temp;
      },
    calcFloatWage(str) {
      var tempView = "";
      var tempAmount = 0;
      if (this.checkedFloatWage.length != 0) {
        this.checkedFloatWage.forEach(checkItem => {
          for (var i = 0; i < this.floatWageList.length; i++) {
            if (checkItem === this.floatWageList[i].code) {
              tempView += this.floatWageList[i].name;
              if (str == "+") {
                tempAmount += this.floatWageList[i].amount;
              }
              if (str == "-") {
                tempAmount -= this.floatWageList[i].amount;
              }
              this.floatWageList.splice(i, 1);
            }
          }
          tempView += str;
        });
        tempView = tempView.substring(0, tempView.length - 1);
        this.totalAmountView += tempAmount;
        if (
          this.floatWageView.indexOf("+") == -1 ||
          this.floatWageView.indexOf("-") == -1
        ) {
          if (this.floatWageView == "") {
            this.floatWageView += tempView;
          } else {
            this.floatWageView += str + tempView;
          }
        } else {
          this.floatWageView += str + tempView;
        }
      }
      this.checkedFloatWage = [];
    },
    reset() {
      this.floatWageList = this.Utils.copyObj(this.totalFloatWageList);
      this.floatWageView = "";
      this.totalAmountView = 0;
    },
    handleClose(){
      this.checkedFloatWage = [];
      this.isIndeterminate = true;
      this.floatWageList = this.Utils.copyObj(this.totalFloatWageList);
      this.totalAmountView = 0;
      this.floatWageView = "";
    }
  },
  created() {
    if (this.$route.params.id != undefined) {
      this.title = "编辑工资单";
    } else {
      this.title = "添加工资单";
    }
  },
  mounted() {}
};
</script>
<style scoped>
.el-checkbox {
  margin-top: 10px;
}
</style>