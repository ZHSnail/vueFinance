<template>
  <div class="staffDetail">
    <my-pageheader titleContent="职工详情"></my-pageheader>
    <my-collapse title="人员信息" class="leftAlign">   
        <el-row>
          <el-col :span="8">
            职工号：
          </el-col>
          <el-col :span="8">
            职工姓名：
          </el-col>
          <el-col :span="8">
            证件号码：
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            学历：
          </el-col>
          <el-col :span="8">
            手机号码：
          </el-col>
          <el-col :span="8">
           电子邮箱：
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            所属部门：
          </el-col>
          <el-col :span="8">
           职工分类：
          </el-col>
          <el-col :span="8">
            所属岗位：
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            职称：
          </el-col>
          <el-col :span="8">
            入职日期：
          </el-col>
        </el-row>
    </my-collapse>
    <my-collapse title="银行信息" class="leftAlign">
        <div v-for="(bank) in staffForm.bankList" :key="bank.id">
          <el-row>
            <el-col :span="8">
              账户类型：
            </el-col>
            <el-col :span="8">
              开户银行：
            </el-col>
            <el-col :span="8">
              分行名：
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              户名：
            </el-col>
            <el-col :span="8">
             银行账号：
            </el-col>           
          </el-row>      
          <el-divider></el-divider>
        </div>
    </my-collapse>
  </div>
</template>

<script>
import tools from "@/commonJs/searchTools.js";

export default {
  name: "staffDetail",
  components: {},
  props: {},
  data() {
    return {
      staffForm: {
        staffNumber: "",
        name: "", //姓名
        sex: "", //性别
        degree: "", //学历
        cardNumber: "", //证件号码
        entryDate: "", //入职日期
        bankList: [
          {
            bankName: "",
            accountNumber: "",
            subbranch: "",
            accountName: "",
            accountType: ""
          }
        ], //银行信息维护
        org: "", //部门信息
        staffType: "", //职工分类
        station: "", //岗位
        postTitle: "", //职称
        mobile: "",
        mail: ""
      },
      //职工分类
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
      orgList: [
        { id: "1", name: "仲恺农业工程学院" },
        { id: "3", name: "物业管理处" },
        { id: "4", name: "人事处" },
        { id: "5", name: "财务管理处" },
        { id: "6", name: "校长办公室" }
      ],
      station: [
        {
          label: "高级管理类",
          value: "1",
          children: [
            { value: "1", label: "校长" },
            { value: "2", label: "副校长" },
            {
              value: "3",
              label: "名誉校长"
            }
          ]
        },
        {
          label: "教师类",
          value: "2",
          children: [
            { value: "4", label: "教授" },
            { value: "5", label: "信息与计算科学老师" }
          ]
        },
        {
          label: "职能管理类",
          value: "3",
          children: [
            { value: "6", label: "教务员" },
            { value: "7", label: "财务管理员" }
          ]
        },
        {
          label: "其它类",
          value: "4",
          children: [
            { value: "8", label: "校车司机" },
            { value: "9", label: "食堂大妈" },
            { value: "10", label: "保安" }
          ]
        }
      ],
      pickerOptions: tools.pickerOptionsDay,
      rules: {
        name: [{ required: true, message: "请输入职工姓名", trigger: "change" }],
        staffNumber: [
          { required: true, message: "请输入职工号", trigger: "change" }
        ],
        mobile:[
          { required: true, message: "请输入手机号", trigger: "change" }
        ],
        mail:[
          { required: true, message: "请输入电子邮箱", trigger: "change" }
        ],
        org:[
          { required: true, message: "请选择所属部门", trigger: "change" }
        ],
        staffType:[
          { required: true, message: "请选择职工分类", trigger: "change" }
        ],
        station:[
          { required: true, message: "请选择所属岗位", trigger: "change" }
        ],
        entryDate:[
          { required: true, message: "请选择入职日期", trigger: "change" }
        ]
      },
      bankRules:{
        accountType:[{ required: true, message: "请选择账户类型", trigger: "change" }],
        bankName:[{ required: true, message: "请输入开户银行", trigger: "change" }],
        subbranch:[{ required: true, message: "请输入分行名", trigger: "change" }],
        accountName:[{ required: true, message: "请输入户名", trigger: "change" }],
        accountNumber:[{ required: true, message: "请输入银行账号", trigger: "change" }],
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    save(formName) {
      var formRefs = [this.$refs['staffForm'], this.$refs['bank']];
      this.Utils.checkForm(formRefs).then(res=>{
        if(res){
          alert("submit")
        }else{
          alert("error")
        }
      })
    },
    commit(formName) {},
    addBank(){
      var bank = {
            bankName: "",
            accountNumber: "",
            subbranch: "",
            accountName: "",
            accountType: ""
      };
      this.staffForm.bankList.push(bank);
    },
    deleteBank(index){
      this.staffForm.bankList.splice(index,1);    
    },
    getFormPromise(form) {
      return new Promise(resolve => {
        form.validate(res => {
          resolve(res);
        })
      })
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.length {
  width: 250px;
}
.addButton{
  margin-bottom: 10px;
}
</style>