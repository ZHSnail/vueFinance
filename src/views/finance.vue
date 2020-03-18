<template>
  <div class="finance">
    <el-container :style="contentStyleObj">
      <el-header style="height:100px;padding:0px">
        <financeHeader></financeHeader>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-scrollbar
            class="default-scrollbar"
            wrap-class="default-scrollbar__wrap"
            view-class="default-scrollbar__view"
          >
            <finance-menu></finance-menu>
          </el-scrollbar>
        </el-aside>
        <el-main class="mainArea">
          <el-scrollbar
            class="default-scrollbar"
            wrap-class="default-scrollbar__wrap"
            view-class="p20-scrollbar__view"
          >
            <el-card>
              <router-view></router-view>
            </el-card>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import "@/assets/css/finance.css";
import financeMenu from "@/components/financeMenu.vue";
import financeHeader from "@/components/financeHeader.vue";

export default {
  name: "finance",
  components: {
    financeMenu,
    financeHeader
  },
  props: {},
  data() {
    return {
      contentStyleObj:{
            height:document.documentElement.clientHeight-100+'px',
      },
      screenHeight:document.documentElement.clientHeight
    };
  },
  watch: {
    screenHeight(val){
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if(!this.timer){
            // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
            this.screenHeight = val
            this.contentStyleObj.height = this.screenHeight-100+'px'
            this.timer = true
            let that = this
            setTimeout(function(){
                // 打印screenWidth变化的值
                console.log(that.screenHeight)
                that.timer = false
            },400)
        }
    }
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {
    const that = this
    window.onresize = () => {
        return (() => {
            window.screenHeight = document.body.clientHeight
            that.screenHeight = window.screenHeight
    })()
    }
  }
};
</script>
<style scoped>
</style>