<template>
  <div class="activitiHandle">
    <my-collapse title="审批意见">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input type="textarea" v-model="form.comment"></el-input>
        </el-form-item>
      </el-form>
      <div class="rightAlign">
        <el-button type="danger" @click="refuse">拒绝</el-button>
        <el-button type="success" @click="approve">审核通过</el-button>
      </div>
    </my-collapse>
  </div>
</template>

<script>
export default {
  name: "activitiHandle",
  components: {},
  props: {
    workKey: String,
    bizId: String,
    url:String
  },
  data() {
    return {
      form: {
        comment: ""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    refuse() {
      var data = {
        workKey: this.workKey,
        businessKey: this.bizId,
        comment: this.form.comment
      };
      var url = "/activiti/refuse";
      this.axios.post(url, data).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg,
            center: true
          });
          this.$router.push({ path: this.url });
        }
      });
    },
    approve() {
      var data = {
        workKey: this.workKey,
        businessKey: this.bizId,
        comment: this.form.comment
      };
      var url = "/activiti/approve";
      this.axios.post(url, data).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg,
            center: true
          });
          this.$router.push({ path: this.url });
        }
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>