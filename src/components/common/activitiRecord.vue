<template>
  <div class="activitiRecord">
    <my-collapse title="审批记录">
      <div class="rightAlign">
        <el-button @click="open" type="primary" size="medium">查看流程图</el-button>
      </div>
      <el-timeline>
        <el-timeline-item
          :reverse="true"
          placement="top"
          v-for="(item,index) in recordList"
          v-bind:key="item.id"
          :timestamp="item.time"
          v-show="activeButton ? index<3:true"
        >
          <div class="box-card centerAlign">
            {{item.activityName}}
            <div class="smallCircle" :class="item.circleClass">
              <div class="bigCircle" :class="item.circleClass">
                <span :class="item.textClass">{{item.comment.type}}</span>
              </div>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
      <div class="changeButton">
        <el-button @click="changeTimeline" v-if="activeButton" type="primary" size="mini">查看更多</el-button>
        <el-button @click="changeTimeline" v-else type="primary" size="mini">收起</el-button>
      </div>
      <el-dialog
        title="流程图"
        :visible.sync="show"
        @open="getImage"
        center
        append-to-body
        :close-on-click-modal="false"
      >
        <div class="centerAlign">
          <el-image :src="pic"></el-image>
        </div>
      </el-dialog>
    </my-collapse>
  </div>
</template>

<script>
export default {
  name: "activitiRecord",
  components: {},
  props: {
    workKey: String,
    bizId: String
  },
  data() {
    return {
      recordList: [],
      show: false,
      pic: "",
      activeButton: true,
    };
  },
  watch: {},
  computed: {},
  methods: {
    arrangeClass(list) {
      list.forEach(element => {
        if (
          element.comment.type == "申请" ||
          element.comment.type == "重新提交"
        ) {
          element.circleClass = "info";
          element.textClass = "text-info";
        }
        if (element.comment.type == "通过") {
          element.circleClass = "success";
          element.textClass = "text-success";
        }
        if (element.comment.type == "拒绝") {
          element.circleClass = "danger";
          element.textClass = "text-danger";
        }
        if (element.comment.type == "撤回") {
          element.circleClass = "info";
          element.textClass = "text-info";
        }
      });
    },
    open() {
      this.show = !this.show;
    },
    getImage() {
      this.pic = "";
      var url = "/activiti/image";
      var data = {
        workKey: this.workKey,
        businessKey: this.bizId
      };
      this.Utils.getImage(url, data, item => {
        this.pic = item;
      });
    },
    changeTimeline() {
      this.activeButton = !this.activeButton;
    }
  },
  created() {
    var url = "/activiti/record";
    var data = {
      workKey: this.workKey,
      businessKey: this.bizId
    };
    this.axios.get(url, { params: data }).then(res => {
      this.recordList = res.obj;
      this.arrangeClass(this.recordList);
    });
  },
  mounted() {}
};
</script>
<style scoped>
.info {
  border-color: #409eff;
}
.text-info {
  color: #409eff;
}
.danger {
  border-color: #f56c6c;
}
.text-danger {
  color: #f56c6c;
}
.success {
  border-color: #67c23a;
}
.text-success {
  color: #67c23a;
}
.box-card {
  width: 250px;
  border-radius: 4px;
  box-shadow: unset;
  background-color: white;
  height: 50px;
  padding-top: 5px;
}
.smallCircle {
  position: absolute;
  top: 10px;
  left: 250px;
  width: 44px;
  height: 44px;
  border-style: solid;
  border-width: 1px;
  border-radius: 50px;
  content: "";
}
.bigCircle {
  position: absolute;
  top: -6px;
  left: -6px;
  width: 54px;
  height: 54px;
  border-radius: 50px;
  text-align: center;
  font-size: 12px;
  line-height: 54px;
  border-style: solid;
  border-width: 1px;
  z-index: 1;
}
.changeButton {
  margin-left: 60px;
}
</style>