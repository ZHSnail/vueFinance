<template>
  <div class="taskList">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <span class="titleContent">草稿</span>
        </template>
        <div>
          <my-card :objList="taskObj.draftList" :url="draftUrl">
            <template v-slot:item="{ item }">
                <slot name="draftItem" :draftItem="item"></slot>
            </template>
          </my-card>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span class="titleContent">审核中</span>
        </template>
        <div>
          <my-card :objList="taskObj.cmtList" :url="detailUrl">
            <template v-slot:item="{ item }">
                <slot name="cmtItem" :cmtItem="item"></slot>
            </template>
          </my-card>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3" v-if="needExe">
        <template slot="title">
          <span class="titleContent">正在进行</span>
        </template>
        <div>
          <my-card :objList="taskObj.exeList" :url="detailUrl">
            <template v-slot:item="{ item }">
                <slot name="exeItem" :exeItem="item"></slot>
            </template>
          </my-card>
        </div>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <span class="titleContent">已完成</span>
        </template>
        <div>
          <my-card :objList="taskObj.finishList" :url="detailUrl">
            <template v-slot:item="{ item }">
                <slot name="finishItem" :finishItem="item"></slot>
            </template>
          </my-card>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import "@/assets/css/common/taskList.css";
export default {
  name: "taskList",
  components: {},
  props: {
      taskObj:Object,
      needExe:Boolean,
      draftUrl:String,
      detailUrl:String,
  },
  data() {
    return {
        activeNames:[],
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
      if (
      this.taskObj.hasOwnProperty("draftList") &&
      this.taskObj.draftList.length != 0
    ) {
      this.activeNames.push("1");
    }
    if (
      this.taskObj.hasOwnProperty("cmtList") &&
      this.taskObj.cmtList.length != 0
    ) {
      this.activeNames.push("2");
    }
    if (
      this.taskObj.hasOwnProperty("exeList") &&
      this.taskObj.exeList.length != 0
    ) {
      this.activeNames.push("3");
    }
    if (
      this.taskObj.hasOwnProperty("finishList") &&
      this.taskObj.finishList.length != 0
    ) {
      this.activeNames.push("4");
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>