<template>
  <div class="staffDetail">
    <my-pageheader titleContent="职工详情"></my-pageheader>
    <my-collapse title="人员信息" class="leftAlign">   
        <el-row>
          <el-col :span="8">
            职工号：{{staffForm.staffNumber}}
          </el-col>
          <el-col :span="8">
            职工姓名：{{staffForm.name}}
          </el-col>
          <el-col :span="8">
            证件号码：{{staffForm.cardNumber}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            学历：{{staffForm.degree}}
          </el-col>
          <el-col :span="8">
            手机号码：{{staffForm.mobile}}
          </el-col>
          <el-col :span="8">
           电子邮箱：{{staffForm.mail}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            所属部门：{{staffForm.orgInfo.name}}
          </el-col>
          <el-col :span="8">
           职工分类：{{staffForm.stationInfo.type}}
          </el-col>
          <el-col :span="8">
            所属岗位：{{staffForm.stationInfo.name}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            职称：{{staffForm.postTitle}}
          </el-col>
          <el-col :span="8">
            入职日期：{{staffForm.entryDate}}
          </el-col>
        </el-row>
    </my-collapse>
    <my-collapse title="工资单信息" class="leftAlign">
      <el-row>
          <el-col :span="8">
            工资单：{{staffForm.payStubInfo.name}}
          </el-col>
          <el-col :span="8">
            岗位等级：{{staffForm.stationLv}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            薪级等级：{{staffForm.scaleLv}}
          </el-col>
          <el-col :span="8">
            基础工资速算：{{staffForm.postWageAmount}}
          </el-col>
        </el-row>
    </my-collapse>
    <my-collapse title="银行信息" class="leftAlign">
        <div v-for="(bank) in staffForm.bankInfoList" :key="bank.id">
          <el-row>
            <el-col :span="8">
              账户类型：{{bank.accounttype}}
            </el-col>
            <el-col :span="8">
              开户银行：{{bank.name}}
            </el-col>
            <el-col :span="8">
              分行名：{{bank.subBranch}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              户名：{{bank.accountname}}
            </el-col>
            <el-col :span="8">
             银行账号：{{bank.accountNumber}}
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
      staffForm:{}
    };
  },
  watch: {},
  computed: {},
  methods: {
    initData(id) {
      var url = "/salary/staffInfo/"+id;
      this.axios.get(url).then(res => {
        if (res.success) {
          var temp = {};
          temp = this.Utils.copyObj(res.obj);
          this.staffForm = this.Utils.copyObj(temp); 
        }
      });
    },
  },
  created() {
    if (typeof this.$route.params.id != undefined) {
      this.id = this.$route.params.id;
      this.initData(this.$route.params.id);
    }
  },
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