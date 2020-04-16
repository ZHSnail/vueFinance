<template>
  <div class="accountInfo">
    <div>
      <my-pageheader titleContent="会计科目表" :needButton="true" buttonContent="添加" @handleClick="add"></my-pageheader>
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
          <el-form-item label="科目名称" prop="accountName">
            <el-input v-model="feeForm.accountName" class="length"></el-input>
          </el-form-item>
          <el-form-item label-position="right" label="科目编码" prop="code">
            <el-input v-model="feeForm.code" class="length"></el-input>
          </el-form-item>
          <el-form-item label="级次" prop="level" style="margin-left:30px">
                <el-input v-model="feeForm.level" class="length"></el-input>
          </el-form-item>
          <el-form-item label="是否明细" >
            <el-radio-group class="length" v-model="feeForm.isDetail">
              <el-radio label="TRUE">是</el-radio>
              <el-radio label="FALSE">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否现金" >
            <el-radio-group class="length" v-model="feeForm.isCash">
              <el-radio label="TRUE">是</el-radio>
              <el-radio label="FALSE">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否银行">
            <el-radio-group class="length" v-model="feeForm.isBank">
              <el-radio label="TRUE">是</el-radio>
              <el-radio label="FALSE">否</el-radio>
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
  name:'accountInfo',
  components:{},
  props:{},
  data(){
    return {
        dialogFormVisible: false,
        feeForm: {
        name: "",
        timeMold: "",
        amount: "",
        feeMethod: "",
        state: "TRUE",
        account: [],
        accountName:"",
        code:"",
        level:"",
        parentId:"",
        isCash:"TRUE",
        isBank:"TRUE",
        isDetail:"TRUE",
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
    }
  },
  watch:{},
  computed:{},
  methods:{
      add(){
          this.dialogFormVisible = true;
      }
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
.el-form-item {
    display: flex;
    justify-content: center;
}
</style>