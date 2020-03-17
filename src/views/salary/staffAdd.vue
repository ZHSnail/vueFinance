<template>
  <div class="staffAdd">
    <my-pageheader titleContent="添加职工"></my-pageheader>
    <my-collapse title="人员信息" class="leftAlign">
      <el-form
        ref="staffForm"
        :rules="rules"
        :model="staffForm"
        label-width="80px"
        :status-icon="true"
        size="small"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="职工号" prop="staffNumber">
              <el-input class="length" v-model="staffForm.staffNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职工姓名" prop="name">
              <el-input class="length" v-model="staffForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码" prop="cardNumber">
              <el-input class="length" v-model="staffForm.cardNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="学历" prop="degree">
              <el-input class="length" v-model="staffForm.degree"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码" prop="mobile">
              <el-input class="length" v-model="staffForm.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮箱" prop="mail">
              <el-input class="length" v-model="staffForm.mail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所属部门" prop="org">
              <el-select class="length" clearable v-model="staffForm.org" placeholder="请选择所属部门">
                <el-option
                  v-for="item in orgList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职工分类" prop="degree">
              <el-select
                class="length"
                clearable
                placeholder="请选择职工分类"
                v-model="staffForm.staffType"
              >
                <el-option
                  v-for="item in staffkind"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属岗位" prop="mail">
              <el-cascader
                placeholder="请选择所属岗位"
                :options="station"
                filterable
                clearable
                class="length"
                v-model="staffForm.station"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="职称" prop="postTitle">
              <el-cascader
                placeholder="请选择职称"
                :options="station"
                filterable
                clearable
                class="length"
                v-model="staffForm.postTitle"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入职日期" prop="entryDate">
              <el-date-picker
                v-model="staffForm.entryDate"
                align="right"
                type="date"
                style="width:250px"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </my-collapse>
    <my-collapse title="银行信息" class="leftAlign">
      <el-row>
        <el-col :span="24" class="rightAlign">
            <el-button type="primary" @click="addBank" class="addButton" size="small">新增</el-button>
        </el-col>
      </el-row>
      <el-form
        ref="staffForm"
        :rules="rules"
        :model="staffForm"
        label-width="80px"
        :status-icon="true"
        size="small"
      >
        <div v-for="(bank,index) in staffForm.bankList" :key="bank.id">
          <el-row>
            <el-col :span="8">
              <el-form-item label="账户类型" prop="accountType">
                <el-select
                  class="length"
                  clearable
                  placeholder="请选择账户类型"
                  v-model="bank.accountType"
                >
                  <el-option
                    v-for="item in staffkind"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户银行" prop="bankName">
                <el-input class="length" v-model="bank.bankName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分行名" prop="subbranch">
                <el-input class="length" v-model="bank.subbranch"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="户名" prop="accountName">
                <el-input class="length" v-model="bank.accountName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行账号" prop="accountNumber">
                <el-input class="length" v-model="bank.accountNumber"></el-input>
              </el-form-item>
            </el-col>           
          </el-row>
          <div class="rightAlign">
          <el-button type="danger" @click="deleteBank(index)"  size="small">删除</el-button>
          </div>
          <!-- <el-divider></el-divider> -->
        </div>
      </el-form>

    </my-collapse>
    <div class="rightAlign">
      <el-button type="primary" @click="save('staffForm')">暂存</el-button>
      <el-button type="primary" @click="commit('staffForm')">提交</el-button>
    </div>
  </div>
</template>

<script>
import tools from "@/commonJs/searchTools.js";

export default {
  name: "staffAdd",
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
        name: [{ required: true, message: "请输入职工姓名", trigger: "blur" }],
        staffNumber: [
          { required: true, message: "请输入职工号", trigger: "blur" }
        ]
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    save(formName) {
      console.log(formName)
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
      console.log(index);
      this.staffForm.bankList.splice(index,1);
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