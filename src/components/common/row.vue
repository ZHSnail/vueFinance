<template>
  <div class="row">
    <el-row>
      <el-col :span="12" class="leftAlign">
        <slot name="left"></slot>
      </el-col>
      <el-col :span="12" class="rightAlign">
        <slot name="right"></slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "row",
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