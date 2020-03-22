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
      >
        <el-table-column align="center" prop="name" label="费用名称"></el-table-column>
        <el-table-column align="center" prop="timeMold" label="时间单位"></el-table-column>
        <el-table-column align="center" prop="feeMethod" label="收费方式"></el-table-column>
        <el-table-column align="center" label="会计科目">
          <template slot-scope="scope">
            <span v-for="(item) in scope.row.account" :key="item.id">{{item.code+" " + item.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.state == "TRUE" ? "启用":"停用"}}</span>
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
    </div>
    <div>
      <!-- 添加费用类别的弹窗 -->
      <el-dialog
        title="添加费用类别"
        :visible.sync="dialogFormVisible"
        width="35%"
        @close="handleClose('feeForm')"
        :close-on-click-modal="false"
        center
      >
        <el-form ref="feeForm" :rules="rules" :model="feeForm" :status-icon="true">
          <el-form-item label="费用名称" prop="name">
            <el-input v-model="feeForm.name" class="length"></el-input>
          </el-form-item>
          <el-form-item label-position="right" label="时间单位" prop="timeMold">
            <el-input v-model="feeForm.timeMold" class="length"></el-input>
          </el-form-item>
          <el-form-item label="收费方式" prop="feeMethod">
            <el-select class="length" v-model="feeForm.feeMethod" clearable placeholder="请选择收费方式">
              <el-option label="面向宿舍" value="DORM"></el-option>
              <el-option label="面向专业" value="MAJOR"></el-option>
              <el-option label="面向角色" value="ROLE"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会计科目" prop="account">
            <el-select class="length" multiple v-model="feeForm.account" placeholder="请选择会计科目">
              <el-option
                v-for="item in accountList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <el-row>
                  <el-col :span="12">{{ item.code }}</el-col>
                  <el-col :span="12" class="rightAlign">{{item.name}}</el-col>
                </el-row>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" style="margin-left:35px">
            <el-radio-group class="length" v-model="feeForm.state">
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
          name: "学费",
          // role: [{ id: "1", name: "理科类学生" }],//按角色收费
          // major:[{id:"1",name:""}],//按专业收费
          // dorm:[{id:"1", buildingNo:"",roomNo:""}],//按宿舍收费
          // account:[{id:"1",name:""}],//可选的会计科目
          account: [
            { id: "1", name: "行政收入", code: "4001" },
            { id: "2", name: "现金\n", code: "1001" }
            // { id: "2", name: "现金", code: "1001" },
            // { id: "2", name: "现金\n", code: "1001" },
            // { id: "2", name: "现金", code: "1001" },
            // { id: "2", name: "现金\n", code: "1001" },
            // { id: "2", name: "现金", code: "1001" },
            // { id: "2", name: "现金\n", code: "1001" }
          ],
          state: "TRUE", //状态
          feeMethod: "专业" //MAJOR 专业。DORM 宿舍。ROLE 角色。
        },
        {
          timeMold: "学年",
          name: "宿舍费",
          // role: [{ id: "2", name: "文科类学生" }],//按角色收费
          // major:[{id:"1",name:""}],//按专业收费
          // dorm:[{id:"1", buildingNo:"",roomNo:""}],//按宿舍收费
          // account:[{id:"1",name:"行政收入"}],//可选的会计科目
          account: [
            { id: "1", name: "行政收入", code: "4001" },
            { id: "2", name: "现金", code: "1001" }
          ],
          feeMethod: "宿舍", //MAJOR 专业。DORM 宿舍。ROLE 角色。
          state: "TRUE" //状态
        },
        {
          timeMold: "月份",
          name: "电费",
          // role: [
          //   { id: "1", name: "理科类学生" },
          //   { id: "2", name: "文科类学生" },
          //   { id: "3", name: "艺术类学生" },
          //   { id: "4", name: "老师" },
          //   { id: "5", name: "职工" }
          // ],//按角色收费
          // major:[{id:"1",name:""}],//按专业收费
          // dorm:[{id:"1", buildingNo:"",roomNo:""}],//按宿舍收费
          // account:[{id:"1",name:""}],//可选的会计科目
          account: [
            { id: "1", name: "行政收入", code: "4001" },
            { id: "2", name: "现金", code: "1001" }
          ],
          feeMethod: "宿舍", //MAJOR 专业。DORM 宿舍。ROLE 角色。
          state: "TRUE" //状态
        },
        {
          timeMold: "年份",
          name: "宿舍费",
          // role: [
          //   { id: "1", name: "理科类学生" },
          //   { id: "2", name: "文科类学生" },
          //   { id: "3", name: "艺术类学生" }
          // ],//按角色收费
          // major:[{id:"1",name:""}],//按专业收费
          // dorm:[{id:"1", buildingNo:"",roomNo:""}],//按宿舍收费
          // account:[{id:"1",name:""}],//可选的会计科目
          account: [
            { id: "1", name: "行政收入", code: "4001" },
            { id: "2", name: "现金", code: "1001" }
          ], //这里应该是一个数组
          feeMethod: "宿舍", //MAJOR 专业。DORM 宿舍。ROLE 角色。
          state: "TRUE" //状态
        },
        {
          timeMold: "季度",
          name: "水费",
          // role: [
          //   { id: "1", name: "理科类学生" },
          //   { id: "2", name: "文科类学生" },
          //   { id: "3", name: "艺术类学生" }
          // ],//按角色收费
          // major:[{id:"1",name:""}],//按专业收费
          // dorm:[{id:"1", buildingNo:"",roomNo:""}],//按宿舍收费
          // account:[{id:"1",name:""}],//可选的会计科目
          account: [
            { id: "1", name: "行政收入", code: "4001" },
            { id: "2", name: "现金", code: "1001" }
          ], //对象数组
          feeMethod: "宿舍", //MAJOR 专业。DORM 宿舍。ROLE 角色。
          state: "FALSE" //状态
        }
      ],
      cellStyle: { display: "block" },
      dialogFormVisible: false,
      feeForm: {
        name: "",
        timeMold: "",
        amount: "",
        feeMethod: "",
        state: "TRUE",
        account: []
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
        feeMethod: [
          { required: true, message: "请选择收费方式", trigger: "change" }
        ],
        account: [
          {
            required: true,
            message: "请选择会计科目",
            trigger: "change"
          }
        ]
      },
      accountList: [
        { id: "1", name: "行政收入", code: "4001" },
        { id: "2", name: "现金", code: "1001" }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleEdit(index, row) {
      this.feeForm.name = row.name;
      this.feeForm.timeMold = row.timeMold;
      var tempAccount = [];
      row.account.forEach(element => {
        tempAccount.push(element.id);
      });
      this.feeForm.account = tempAccount;
      this.feeForm.state = row.state;
      this.dialogFormVisible = true;
      this.feeForm.feeMethod = row.feeMethod;
    },
    add() {
      this.dialogFormVisible = true;
    },
    handleClose(formName) {
      //关闭之后清除表单的内容，
      console.log(formName);
      this.$refs[formName].resetFields();
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>