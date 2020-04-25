<template>
  <div class="importResult">
    <el-dialog
      :title="title"
      :visible.sync="show"
      center
      :close-on-click-modal="false"
      width="35%"
      @open="open"
    >
      <el-row>
        <el-col :span="24">
          <div>成功信息：</div>
          <div style="color:#67C23A">{{result.succResult}}</div>
        </el-col>
        <el-col :span="24">
          <div>失败信息：</div>
          <div style="color:#F56C6C" v-for="item in result.errResult" v-bind:key="item">{{item}}</div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "importResult",
  components: {},
  props: {
    isShow: Boolean,
    title: String,
    fileId: String
  },
  data() {
    return {
      show: false,
      result: ""
    };
  },
  watch: {
    show: function(newValue, oldValue) {
      //每当show的值改变则发送事件update:word , 并且把值传过去
      this.$emit("update:isShow", newValue);
    }
  },
  computed: {},
  methods: {
    open() {
      var url = "/system/importResult/" + this.fileId;
      this.axios.get(url).then(res => {
        if (res.success) {
          this.result = res.obj;
          this.result.errResult = eval(res.obj.errResult);
        }
      });
    }
  },
  created() {},
  mounted() {
    this.$watch("isShow", function(newVal, oldVal) {
      this.show = newVal;
    });
  }
};
</script>
<style scoped>
</style>