<template>
  <div class="feeKind">
    <div>
      <my-pageheader titleContent="费用类别设置" :needButton="true" buttonContent="添加" @handleClick="add"></my-pageheader>
    </div>
    <div class="content">
      <el-table
        cell-class-name="centerAlign"
        :data="tableData"
        stripe
        style="width: 100%"
        max-height="450"
      >
        <el-table-column align="center" prop="name" label="费用名称"></el-table-column>
        <el-table-column align="center" prop="timeMold" label="费用时间单位"></el-table-column>
        <el-table-column align="center" label="缴费角色">
          <template slot-scope="scope">
            <span v-for="item in scope.row.role" :key="item.id">{{item.name}}&nbsp;&nbsp;</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="amount" label="收费标准">
          <template slot-scope="scope">￥{{scope.row.amount}}</template>
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
            <el-tooltip effect="light" content="删除" placement="bottom">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <!-- 添加费用类别的弹窗 -->
      <el-dialog
        title="收货地址"
        :visible.sync="dialogFormVisible"
        width="35%"
        @close="handleClose('feeForm')"
        :close-on-click-modal="false"
      >
        <el-form
          ref="feeForm"
          :rules="rules"
          :model="feeForm"
          label-width="120px"
          :status-icon="true"
        >
          <el-form-item label="费用名称" prop="name">
            <el-input v-model="feeForm.name" class="length"></el-input>
          </el-form-item>
          <el-form-item label="应收金额" prop="amount">
            <el-input v-model.number="feeForm.amount" class="length"></el-input>
          </el-form-item>
          <el-form-item label="费用时间单位" prop="timeMold">
            <el-input v-model="feeForm.timeMold" class="length"></el-input>
          </el-form-item>
          <el-form-item label="缴费角色" prop="role">
            <el-select class="length" multiple v-model="feeForm.role" placeholder="请选择缴费的角色">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
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
import "@/assets/css/charge/feeKind.css";

export default {
  name: "feeKind",
  components: {},
  props: {},
  data() {
    return {
      tableData: [
        {
          timeMold: "学年",
          name: "理科类学费",
          amount: "7562.00",
          role: [{ id: "1", name: "理科类学生" }]
        },
        {
          timeMold: "学年",
          name: "文科类学费",
          amount: "7562.00",
          role: [{ id: "2", name: "文科类学生" }]
        },
        {
          timeMold: "月份",
          name: "电费",
          amount: "7562.00",
          role: [
            { id: "1", name: "理科类学生" },
            { id: "2", name: "文科类学生" },
            { id: "3", name: "艺术类学生" },
            { id: "4", name: "老师" },
            { id: "5", name: "职工" }
          ]
        },
        {
          timeMold: "年份",
          name: "宿舍费",
          amount: "7562.00",
          role: [
            { id: "1", name: "理科类学生" },
            { id: "2", name: "文科类学生" },
            { id: "3", name: "艺术类学生" }
          ]
        },
        {
          timeMold: "季度",
          name: "水费",
          amount: "7562.00",
          role: [
            { id: "1", name: "理科类学生" },
            { id: "2", name: "文科类学生" },
            { id: "3", name: "艺术类学生" }
          ]
        }
      ],
      dialogFormVisible: false,
      feeForm: {
        name: "",
        timeMold: "",
        amount: "",
        role: [] //缴费角色
      },
      rules: {
        name: [{ required: true, message: "请输入费用名称", trigger: "blur" }],
        timeMold: [
          { required: true, message: "请输入费用时间单位", trigger: "blur" }
        ],
        amount: [
          { required: true, message: "请输入应收金额", trigger: "blur" },
          { type: "number", message: "应收金额必须为数字值" }
        ],
        role: [
          { required: true, message: "请选择缴费的角色", trigger: "change" }
        ]
      },
      roleList: [
        { id: "1", name: "理科类学生" },
        { id: "2", name: "文科类学生" },
        { id: "3", name: "艺术类学生" },
        { id: "4", name: "老师" },
        { id: "5", name: "职工" }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleEdit(index, row) {
      this.feeForm.name = row.name;
      this.feeForm.timeMold = row.timeMold;
      this.feeForm.amount = parseFloat(row.amount);
      var tempRole = [];
      row.role.forEach(element => {
        tempRole.push(element.id);
      });
      this.feeForm.role = tempRole;
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {},
    add() {
      this.dialogFormVisible = true;
    },
    handleClose(formName) {
      //关闭之后清除表单的内容，
      this.$refs[formName].resetFields();
      this.feeForm.name = "";
      this.feeForm.timeMold = "";
      this.feeForm.amount = "";
      this.feeForm.role = [];
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>