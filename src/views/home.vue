<template>
  <div class="home">
    <div class="header">
      <el-row type="flex" justify="end">
        <el-col :offset="21">
          <el-button @click="show = !show" type="primary" icon="el-icon-user" round>登录</el-button>
        </el-col>
        <el-col :offset="0">
          <el-dropdown>
            <el-button type="primary" icon="el-icon-arrow-down el-icon-menu" round></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-school">
                <el-link :underline="false" href="https://www.zhku.edu.cn/">学校官网</el-link>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-phone">联系我们</el-dropdown-item>
              <el-dropdown-item icon="el-icon-s-promotion">反馈</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
    <div class="main">
        <h1>改变，因我而来</h1>
        <login :is-show.sync="show"></login>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import login from "@/components/login.vue";
import '@/assets/css/home.css'
// @ is an alias to /src
export default {
  name: "home",
  components: {
    login
  },
  data() {
    return {
      show:false
    };
  },
  methods:{
    onChangeDialog(type){
      this.show = type;
    }
  }
};
</script>
<style scoped>
</style>
