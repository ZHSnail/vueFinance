<template>
  <div class="myCard">
    <div
      v-for="(item,index) in objList"
      :key="item.id"
      @mouseenter="changeClass(index)"
      @mouseleave="changeClass(index)"
      class="card"
    >
      <router-link :to="cardUrl+'/'+item.id" tag="a">
        <el-card :body-style="index==flag ? hoverCardStyle:cardStyle">
          <slot name="item" :item="item"></slot>
        </el-card>
      </router-link>
    </div>
    <div>
      <el-row>
        <el-col :span="24">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total"
            class="page"
            :hide-on-single-page="true"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import "@/assets/css/common/myCard.css";
export default {
  name: "myCard",
  components: {},
  props: {
    objList: Array, //对象列表，里面含有单号，单据金额，ID,创建时间等
    title: String, //卡片的标题
    total: Number, //总的数量
    pageSize: Number, //每页显示多少条
    url: String, //路由跳转的地址,自动拼id,不传值直接拼detail
    unit: String //金额单位
  },
  data() {
    return {
      flag: -1,
      cardStyle: { backgroundColor: "#F2F6FC" },
      hoverCardStyle: { backgroundColor: "#DCDFE6" },
      cardUnit: "元",
      cardUrl: "detail"
    };
  },
  watch: {},
  computed: {},
  methods: {
    //改变鼠标悬浮的样式
    changeClass(index) {
      //说明点到了空白的地方
      if(index == this.flag){
          this.flag = -1;
      }else{
      this.flag = index;

      }
    },
    //当前页传给父组件的方法
    handleCurrentChange(val) {
      this.$emit("getCurrentPage", val);
    }
  },
  created() {
    if (this.url) {
      this.cardUrl = this.url;
    }
    if (this.unit) {
      if (this.unit.toLowerCase() == "chinese") {
        this.cardUnit = "";
      } else {
        this.cardUnit = this.unit;
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
.el-pagination button,
.el-pagination span:not([class*="suffix"]) {
  display: unset;
}
</style>