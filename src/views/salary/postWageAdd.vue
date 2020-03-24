<template>
  <div class="postWageAdd">
     <my-pageheader :titleContent="titleContent"></my-pageheader>
     <el-row>
       <el-col :span="8"></el-col>
       <el-col :span="8"></el-col>
       <el-col :span="8"></el-col>
     </el-row>
     <el-row>
       <el-col :span="8"></el-col>
       <el-col :span="8"></el-col>
       <el-col :span="8"></el-col>
     </el-row>
  </div>
</template>

<script>
export default {
  name: "postWageAdd",
  components: {},
  props: {},
  data() {
    return {
        stationForm: {
        type: "",
        stationAmount: "", //岗位工资标准
        stationStage: "", //岗位工资级数
        stationGrad: "", //岗位工资级差
        scaleAmount: "", //薪级工资标准
        scaleStage: "", //薪级工资级数
        scaleGrad: "", //薪级工资级差
        status: "TRUE"
      },
      titleContent:""
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
      this.titleContent = this.$route.params.title+"岗位工资管理";
  },
  mounted() {}
};
</script>
<style scoped>
</style>