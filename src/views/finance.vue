<template>
  <div class="finance">
    <el-container style="height:100%">
      <el-header style="height:15%;padding:0px">
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