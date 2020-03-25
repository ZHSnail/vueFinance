<template>
  <div class="payStubAdd">
    <my-pageheader :titleContent="title"></my-pageheader>
  </div>
</template>

<script>
export default {
  name: "payStubAdd",
  components: {},
  props: {},
  data() {
    return {
      title: ""
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    if (this.$route.params.id != undefined) {
      this.title = "编辑工资单";
    } else {
      this.title = "添加工资单";
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>