<template>
  <div class="payNoticeDetail">
    <div>
      <my-pageheader titleContent="通知缴费单详情"></my-pageheader>
    </div>
    <div>
      <my-collapse title="费用清单" total="4500.00" totalTitle="费用合计" class="leftAlign">
         <el-row>
            <el-col :span="12">单号:SF2002180001</el-col>
          <el-col :span="12">摘要：1324654</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">费用类别：学费</el-col>
          <el-col :span="12">金额:4500.00</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">学年：2019-2020</el-col>
          <el-col :span="12">收费机构:仲恺农业工程学院</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">缴费角色：理科类学生,文科类学生,艺术类学生</el-col>
          <el-col :span="12">缴费期限:2020年02月18日至2020年02月29日</el-col>
        </el-row>
       
      </my-collapse>
      <my-collapse title="审批记录">
        <el-timeline>
          <el-timeline-item timestamp="2018/4/12" placement="top">
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/3 20:46</p>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-timeline-item>
        </el-timeline>
      </my-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "payNoticeDetail",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>