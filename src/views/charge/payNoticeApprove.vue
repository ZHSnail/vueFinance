<template>
  <div class="payNoticeApprove">
    <div>
      <my-pageheader titleContent="通知缴费单审核"></my-pageheader>
    </div>
    <div>
      <my-collapse title="费用清单" :total="feeForm.totalAmount+''" totalTitle="费用合计" class="leftAlign">
         <el-row>
            <el-col :span="12">单号:{{feeForm.code}}</el-col>
          <el-col :span="12">缴费期限:{{feeForm.deadLineMin}}  至  {{feeForm.deadLineMax}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">费用类别：{{feeForm.feeKind.name}}</el-col>
          <el-col :span="12">金额:{{feeForm.amount}} 元</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">收费机构:{{feeForm.org}}</el-col>
          <el-col :span="12">应收总金额:{{feeForm.totalAmount}} 元</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">{{feeForm.feeKind.timeMold}}：{{feeForm.period}}</el-col>
          <el-col :span="12">摘要：{{feeForm.memo}}</el-col>
        </el-row>
      </my-collapse>
      <activiti-record workKey="payNoticeReq" :bizId="id"></activiti-record>
      <activiti-handle workKey="payNoticeReq" url="/finance/charge/payNoticeReview" :bizId="id"></activiti-handle>
    </div>
  </div>
</template>

<script>
export default {
  name: "payNoticeApprove",
  components: {},
  props: {},
  data() {
    return {
      feeForm:{},
      id:"",
      userInfo:{},
    };
  },
  watch: {},
  computed: {},
  methods: {
    initData(id) {
      var url = "/charge/payNotice/" + id;
      this.axios.get(url).then(res => {
        if (res.success) {
          this.feeForm = this.Utils.copyObj(res.obj);
          var deadline = [];
          deadline.push(res.obj.deadLineMin);
          deadline.push(res.obj.deadLineMax);
          this.feeForm.deadline = deadline;
          this.userInfo = this.Utils.getUser();
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
</style>