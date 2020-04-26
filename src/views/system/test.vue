<template>
  <div class="test">
    <div>
      <el-button @click="test" type="primary" icon="el-icon-user" round>登录</el-button>
    </div>
    <div>
      <!-- <img :src="pic" style="float:right;" alt="Loading..."> -->
      <el-image :src="pic"></el-image>
    </div>
  </div>
</template>

<script>
export default {
  name: "test",
  components: {},
  props: {},
  data() {
    return {
      completeTask: "static/modeler.html",
      testHtml: "",
      pic: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    test() {
      var data = { name: "4564", id: "8578" };
      console.log(this.pic);
      // window.open(this.Utils.getUrl()+"/modeler.html?modelId=11","_blank");
      // this.axios.get("/test", data).then(res => {
      //     // this.testHtml=res.data.msg
      //     // console.log(res)
      //     // console.log(this.testHtml.split("###"))
      // });
    }
  },
  created() {
    var url = "/activiti/image";
    var data = {
      workKey: "testRole",
      businessKey: "704003589214830592"
    };
    this.Utils.getImage(url, data,item=>{
      this.pic = item
    });
  },
  mounted() {}
};
</script>
<style scoped>
</style>