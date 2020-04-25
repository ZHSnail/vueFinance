<template>
  <div class="activityInfo">
    <my-pageheader titleContent="流程管理"></my-pageheader>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="activitiProcess.key" label="KEY"></el-table-column>
      <el-table-column align="center" prop="name" label="名称"></el-table-column>
      <el-table-column align="center" prop="activitiProcess.version" label="版本"></el-table-column>
      <el-table-column align="center" prop="deployTime" label="发布时间"></el-table-column>
      <el-table-column align="center" label="操作" prop="state">
        <template slot-scope="scope">
          <!-- <el-tooltip effect="light" content="编辑" placement="bottom">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.row.id)"
            ></el-button>
          </el-tooltip>-->
          <el-tooltip effect="light" content="转换成模型" placement="bottom">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-d-arrow-right"
              circle
              @click="handleTrans(scope.row.activitiProcess.id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip effect="light" content="删除" placement="bottom">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total"
          class="centerAlign"
          :hide-on-single-page="true"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "activityInfo",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      pageSize: 10,
      total: 0
    };
  },
  watch: {},
  computed: {},
  methods: {
    search(val) {
      var url = "/activiti/deployment";
      var data = val ? JSON.stringify(val) : "";
      this.axios.get(url, { params: { data: data } }).then(res => {
        if (res.success) {
          this.tableData = res.obj.list;
          this.total = res.obj.total;
        }
      });
    },
    handleCurrentChange(val) {
      var data = { pageNum: val };
      this.search(data);
    },
    handleDelete(deploymentId) {
      var url = "/activiti/deployment/" + deploymentId;
      this.axios.delete(url).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg,
            center: true
          });
          this.search();
        } else {
          this.$message({
            type: "error",
            message: res.msg,
            center: true
          });
        }
      });
    },
    handleTrans(processDefinitionId) {
      var url = "/activiti/trantoModel/" + processDefinitionId;
      this.axios.post(url).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg,
            center: true
          });
        } else {
          this.$message({
            type: "error",
            message: res.msg,
            center: true
          });
        }
      });
    }
  },
  created() {
    this.search();
  },
  mounted() {}
};
</script>
<style scoped>
</style>