<template>
  <div class="test">
    <div>
      <el-button @click="test" type="primary" icon="el-icon-user" round>登录</el-button>
      <el-button @click="open" type="primary" icon="el-icon-user" round>查看流程图</el-button>
    </div>
    <!-- <my-collapse title="审批记录">
      <el-timeline>
        <el-timeline-item
          :reverse="true"
          placement="top"
          v-for="item in tetsList"
          v-bind:key="item.id"
          :timestamp="item.time"
        >
          <div class="box-card centerAlign content">
            {{item.activityName}}
            <div class="test1 content">
              <div class="test2 content">{{item.comment.type}}</div>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </my-collapse> -->
    <activiti-record workKey="testRole" bizId="704462990006550528"></activiti-record>
    <activiti-handle  workKey="testRole" bizId="657498789797987"></activiti-handle>
    <el-dialog title="流程图" :visible.sync="show" center append-to-body :close-on-click-modal="false">
      <div class="centerAlign">
        <el-image :src="pic"></el-image>
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
      show: false,
      tetsList: []
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
    open() {
      this.show = !this.show;
    }
  },
  created() {
    var url = "/activiti/image";
    var data = {
      workKey: "testRole",
      businessKey: "704364813727301632"
    };
    this.Utils.getImage(url, data, item => {
      this.pic = item;
    });
  },
  mounted() {}
};
</script>
<style scoped>
.box-card {
  width: 250px;
  border-radius: 4px;
  box-shadow: unset;
  background-color: white;
  height: 50px;
  padding-top: 5px;
}
.content{
  border-color: #45b7af;
}
.test1 {
  position: absolute;
  top: 10px;
  left: 250px;
  width: 44px;
  height: 44px;
  border-style: solid;
  border-width: 1px;
  border-color: inherit;
  border-radius: 50px;
  content: "";
}
.test2 {
  position: absolute;
  top: -6px;
  left: -6px;
  width: 54px;
  height: 54px;
  border-radius: 50px;
  text-align: center;
  font-size: 12px;
  line-height: 54px;
  border: 1px solid;
  border-color: inherit;
  z-index: 1;
}
</style>