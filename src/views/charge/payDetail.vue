<template>
  <div class="payDetail">
    <div>
      <!-- <my-pageheader titleContent="缴费单详情" :needButton="true" buttonContent="打印" @handClick="print"></my-pageheader> -->
      <my-pageheader titleContent="缴费单详情"></my-pageheader>
    </div>
    <div>
      <my-collapse title="基本信息" class="leftAlign">
          <el-row>
            <el-col :span="12">
              缴费用户：{{payDetail.userName}}
            </el-col>
            <el-col :span="12">
              单号：{{payDetail.code}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" v-if="payDetail.status == 'PAID' ">
              付款日期:{{payDetail.payDate}}
            </el-col>
            <el-col :span="12">
              缴费状态：<span style="color:red" v-if="payDetail.status == 'UNPAID' ">未付款</span> <span v-if="payDetail.status == 'PAID' ">已付款</span>
            </el-col>
          </el-row>
      </my-collapse>
      <my-collapse title="费用清单" :total="payDetail.amount+''" totalTitle="费用合计" class="leftAlign">
          <el-row>
            <el-col :span="12">
              费用类别：{{payDetail.payNotice.feeKind.name}}
            </el-col>
            <el-col :span="12">
              金额:{{payDetail.amount}}
            </el-col>
          </el-row>
            <el-row>
            <el-col :span="12">
              {{payDetail.payNotice.feeKind.timeMold}}：{{payDetail.payNotice.period}}
            </el-col>
            <el-col :span="12">
              收费机构:{{payDetail.payNotice.org}}
            </el-col>
          </el-row>
      </my-collapse>
    </div>
    <div class="rightAlign" v-if="show"><el-button type="primary" @click="toPay">前往付款</el-button></div>
  </div>
</template>

<script>
import "@/assets/css/charge/payDetail.css";




export default {
  name: "payDetail",
  components: {
    
  },
  props: {},
  data() {
    return {
      id:"",
      show:false,
      payDetail:{}
    };
  },
  watch: {},
  computed: {},
  methods: {
    //后面再实现打印的方法
    print() {},
    toPay(){

    },
    initData(id) {
      var url = "/charge/payDetail/" + id;
      this.axios.get(url).then(res => {
        if (res.success) {
          console.log(res.obj)
          this.payDetail = this.Utils.copyObj(res.obj);
          this.userInfo = this.Utils.getUser();
          if(this.userInfo.id === this.payDetail.userId && this.payDetail.status === 'UNPAID'){
            this.show = true;
          }
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