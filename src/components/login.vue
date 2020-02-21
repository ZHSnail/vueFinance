<template>
  <div class="login-box">
    <el-dialog
      title="登录"
      :visible.sync="show"
      center
      :close-on-click-modal="false"
      custom-class="dialog-box"
      width="350px"
      @close="handleClose('user')"
    >
      <el-form :rules="rules" ref="user" :model="user" label-width="65px" :status-icon="true">
        <el-form-item label="用户名" prop="name">
          <el-input prefix-icon="el-icon-user-solid" v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="user.password"
            type="password"
            :show-password="true"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('user')" class="button-box">登录</el-button>
          <div class="register-box">
            <span>没有账户？</span>
            <router-link to>创建一个！</router-link>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import '@/assets/css/login.css'
export default {
  name: "login",
  components: {},
  props: {
    isShow: Boolean
  },
  data() {
    return {
      show: false,
      user: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
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
    handleClose(formName) {
      //关闭之后清除表单的内容，
      this.$refs[formName].resetFields();
    },
    //登录时如果后端成功则返回0，不成功则为1，后面带有错误信息
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var i = 0;
          if (i == 0) {
            //后面会结合vuex进行token的认证与存放，并且token中会有用户的id
            console.log("denglu");
            this.$router.push({path:'/finance'});
          } else {
            this.$message({
              message: "用户不存在或密码错误",
              showClose: true,
              type: "error"
            });
          }
        } else {
          return false;
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