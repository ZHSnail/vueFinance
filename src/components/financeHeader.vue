<template>
  <div class="financeHeader">
    <el-row>
      <el-col :xs="12" :lg="4" class="leftArea">
        <div>
          <el-image :src="url" class="logo" fit="fill"></el-image>
          <div class="test"><span class="fontTitle">财务管理系统</span></div>
        </div>
      </el-col>
      <el-col :xs="8" :lg="16" class="centerButton">
        <div>
          <el-tooltip effect="light" content="首页" placement="bottom">
            <el-button icon="el-icon-s-home" circle></el-button>
          </el-tooltip>
          <el-badge :value="200" :max="99" type="danger" class="msgButton">
            <el-tooltip effect="light" content="消息" placement="bottom">
              <el-button icon="el-icon-message" circle></el-button>
            </el-tooltip>
          </el-badge>
        </div>
      </el-col>
      <el-col :xs="4" :lg="4" class="centerArea">
        <div class="avatar">
          <el-dropdown @command="handleCommand">
            <el-avatar style="background:#37C23A">{{userName}}</el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-error" command="a">
                退出
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-phone">联系我们</el-dropdown-item>
              <el-dropdown-item icon="el-icon-s-promotion">反馈</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import "@/assets/css/financeHeader.css";
import headImg from "@/assets/images/logo.png";
export default {
  name: "financeHeader",
  components: {},
  props: {},
  data() {
    return {
      url: headImg,
      userName:""
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleCommand(command){
      if(command=="a"){
        this.axios.get("/system/loginOut").then(res => {
            if (res.success) {
              window.sessionStorage.removeItem("token");
              window.sessionStorage.removeItem("userInfo");
              this.$router.push({path:'/'});
            } else {
              this.$message({
                type:"error",
                message: res.msg,
                center: true
              });
            }
        });
      }
    }
  },
  created() {
    var userInfo = this.Utils.getUser();
    this.userName = userInfo.name;
    this.userName=this.userName.substr(1,3)
  },
  mounted() {}
};
</script>
<style scoped>
</style>