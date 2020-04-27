<template>
  <div class="test">
    <div>
      <el-button @click="test" type="primary" icon="el-icon-user" round>登录</el-button>
      <el-button @click="open" type="primary" icon="el-icon-user" round>查看流程图</el-button>
    </div>
    <my-collapse title="审批记录">
        <el-timeline>
          <el-timeline-item :reverse="true" placement="top" v-for="item in tetsList" v-bind:key="item.id" :timestamp="item.time">
              <div class="box-card centerAlign">{{item.activityName}}</div>
              <div>{{item.comment.type}}</div>
          </el-timeline-item>
        </el-timeline> 
      </my-collapse>
    <el-dialog
      title="流程图"
      :visible.sync="show"
      center
      append-to-body
      :close-on-click-modal="false"
    >
    <div class="centerAlign">
      <el-image  :src="pic"></el-image>
    </div>
    </el-dialog>
    
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
      pic: "",
      show:false,
      tetsList:[]
    };
  },
  watch: {},
  computed: {},
  methods: {
    test() {
      var data = { name: "4564", id: "8578" };
      // window.open(this.Utils.getUrl()+"/modeler.html?modelId=11","_blank");
      this.axios.get("/test", data).then(res => {
          this.tetsList = res.obj;
          // this.testHtml=res.data.msg
          // console.log(res)
          // console.log(this.testHtml.split("###"))
      });
    },
    open(){
      this.show = !this.show;
    }
  },
  created() {
    var url = "/activiti/image";
    var data = {
      workKey: "testRole",
      businessKey: "704364813727301632"
    };
    this.Utils.getImage(url, data,item=>{
      this.pic = item
    });
  },
  mounted() {}
};
</script>
<style scoped>
.box-card{
  width: 200px;
  border-radius: 4px;
  box-shadow:unset;
  background-color: white;
  height: 50px;
  padding-top: 5px;
}
</style>