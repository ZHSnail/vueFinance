<template>
  <div class="salaryInfo">
    <my-pageheader titleContent="浮动工资管理" :needButton="true" v-if="active">
      <el-dropdown trigger="click" @command="handleCommand">
        <el-button type="primary">
          更多
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="addFloatWage">新增浮动工资项</el-dropdown-item>
          <el-dropdown-item command="importFloatWage">导入浮动工资项</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </my-pageheader>
    <my-pageheader titleContent="岗位工资管理" :needButton="true" v-else>
      <el-dropdown trigger="click" @command="handleCommand">
        <el-button type="primary">
          更多
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="addPostWage">新增岗位工资</el-dropdown-item>
          <el-dropdown-item command="importPostWage">导入岗位工资</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </my-pageheader>
    <el-tabs value="floatWage" @tab-click="handleClick">
      <el-tab-pane label="浮动工资管理" name="floatWage">
        <floatWage></floatWage>
      </el-tab-pane>
      <el-tab-pane label="岗位工资管理" name="postWage"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import floatWage from "@/views/salary/floatWageView.vue";

export default {
  name: "salaryInfo",
  components: {
    floatWage,
  },
  props: {},
  data() {
    return {
      active: true,
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleClick(tab, event) {
      if (tab.label == "岗位工资管理") {
        this.active = false;
      } else {
        this.active = true;
      }
    },
    handleCommand(command) {
      if (command == "addFloatWage") {
        this.dialogFormVisible = true;
      }
      if (command == "importFloatWage") {
        this.$message("click on item " + command);
      }
    },
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.el-form-item {
    display: flex;
    justify-content: center;
}
</style>