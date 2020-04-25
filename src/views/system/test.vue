<template>
  <div class="test">
    <div>
        <el-button @click="test" type="primary" icon="el-icon-user" round>登录</el-button>
    </div>
    <div>
      <h3 style="text-align:center">服务器错误</h3>
      <div>
        {{testHtml}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'test',
  components:{},
  props:{},
  data(){
    return {
      completeTask:"static/modeler.html",
      testHtml:"",
    }
  },
  watch:{},
  computed:{},
  methods:{
    test() {
      console.log("hello");
      var data = { name: "4564", id: "8578" };
      console.log()
      // window.open(this.Utils.getUrl()+"/modeler.html?modelId=11","_blank");                 
      this.axios.get("/test", data).then(res => {
          // this.testHtml=res.data.msg
          // console.log(res)
          // console.log(this.testHtml.split("###"))
      });
    }
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
</style>