<template>
  <div class="myPageheader">
    <el-page-header @back="goBack">
      <template slot="title">
        <div :class="needButton ? 'buttonBack':'back'">返回</div>
      </template>
      <template slot="content">
        <el-row>
          <el-col :span="12" class="spancontent">{{titleContent}}</el-col>
          <el-col :span="12" class="rightButton" v-if="buttonContent">
            <el-button type="primary" @click="handClick">{{buttonContent}}</el-button>
          </el-col>
        </el-row>
      </template>
    </el-page-header>
  </div>
</template>
<script>
import "@/assets/css/common/myPageheader.css";

export default {
  name: "myPageheader",
  components: {},
  props: {
    titleContent: String, //内容
    buttonContent: String, //按钮的内容
    needButton:Boolean,//是否需要按钮
  },
  data() {
    return {
      active: false
    };
  },
  watch: {
  },
  computed: {},
  methods: {
    //返回上一页
    goBack() {
      this.$router.go(-1);
    },
    //让父组件去实现按钮的点击方法
    handClick(){
        this.$emit("handleClick");
    }
  },
  created() {
    
  },
  mounted() {}
};
</script>
<style scoped>
</style>