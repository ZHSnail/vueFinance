<template>
  <div class="payDetail">
    <div>
      <my-pageheader titleContent="缴费单详情" :needButton="true" buttonContent="打印" @handClick="print"></my-pageheader>
    </div>
    <div>
      <my-collapse title="基本信息" class="leftAlign">
          <el-row>
            <el-col :span="12">
              缴费用户：张三
            </el-col>
            <el-col :span="12">
              单号：XF202002120001
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              付款日期:2020-02-14
            </el-col>
            <el-col :span="12">
              缴费状态：<span style="color:red">未付款</span>
            </el-col>
          </el-row>
      </my-collapse>
      <my-collapse title="费用清单" total="4500.00" totalTitle="费用合计" class="leftAlign">
          <el-row>
            <el-col :span="12">
              费用类别：学费
            </el-col>
            <el-col :span="12">
              金额:4500.00
            </el-col>
          </el-row>
            <el-row>
            <el-col :span="12">
              学年：2019-2020
            </el-col>
            <el-col :span="12">
              收费机构:仲恺农业工程学院
            </el-col>
          </el-row>
      </my-collapse>
    </div>
    <div class="rightAlign"><el-button type="primary" @click="toPay">前往付款</el-button></div>
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
    };
  },
  watch: {},
  computed: {},
  methods: {
    //后面再实现打印的方法
    print() {},
    toPay(){

    },
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>