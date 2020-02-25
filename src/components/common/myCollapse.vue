<template>
  <div class="myCollapse">
    <el-collapse v-model="activeNames">
      <el-card>
        <el-collapse-item name="1">
          <template slot="title">
            <el-row>
              <el-col :span="12" class="title">
                <div>{{title}}</div>
              </el-col>
              <el-col :span="12" class="total" v-if="total">
                <div>
                  合计&nbsp;&nbsp;&nbsp;&nbsp;
                  <span style="color:#F56C6C;">￥{{total}}</span>
                </div>
              </el-col>
            </el-row>
          </template>
          <slot></slot>
          <br />
          <div v-if="total" class="totalArea rightAlign">
            <div class="inline">{{totalTitle}}</div>
            <div class="money inline">￥{{total}}</div>
            <div class="money inline">{{chineseTotal}}</div>
          </div>
        </el-collapse-item>
      </el-card>
    </el-collapse>
  </div>
</template>

<script>
import "@/assets/css/common/myCollapse.css";
export default {
  name: "myCollapse",
  components: {},
  props: {
    title: String, //页签标题
    fold: Boolean, //是否折叠
    total: String, //合计多少
    totalTitle: String //合计金额卡片的标题
  },
  data() {
    return {
      activeNames: ["1"],
      chineseTotal: ""
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    if (this.fold) {
      this.activeNames = [];
    }
    if (this.total) {
      this.chineseTotal = this.Utils.convertCurrency(this.total);
    }
  },
  mounted() {
    this.$watch("total", function(newVal, oldVal) {
      if (newVal) {
        this.chineseTotal = this.Utils.convertCurrency(newVal);
      }
    });
  }
};
</script>
<style scoped>
</style>