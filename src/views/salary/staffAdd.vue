<template>
  <div class="staffAdd">
    <my-pageheader titleContent="添加职工"></my-pageheader>
          <my-collapse title="人员信息" class="leftAlign">
          </my-collapse>
           <my-collapse title="银行信息" class="leftAlign">
          </my-collapse>
              <div class="rightAlign">
      <el-button type="primary" @click="save('feeForm')">暂存</el-button>
      <el-button type="primary" @click="commit('feeForm')">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "staffAdd",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
      save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.feeForm);
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    commit(formName) {},
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>