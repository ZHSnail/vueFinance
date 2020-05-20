<template>
  <div class="postWageView">
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="type" label="类别"></el-table-column>
      <el-table-column align="center" label="岗位工资标准">
        <template slot-scope="scope">
          <span>{{scope.row.stationAmount+"元"}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="stationStage" label="岗位工资级数"></el-table-column>
      <el-table-column align="center" prop="stationGrad" label="岗位工资级差"></el-table-column>
      <el-table-column align="center" label="薪级工资标准">
        <template slot-scope="scope">
          <span>{{scope.row.scaleAmount+"元"}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="scaleStage" label="薪级工资级数"></el-table-column>
      <el-table-column align="center" prop="scaleGrad" label="薪级工资级差"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip effect="light" content="编辑" placement="bottom">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "postWageView",
  components: {},
  props: {},
  data() {
    return {
      tableData: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleEdit(index, row) {
      this.$router.push({ name: "postWageAdd",params:{obj:row,id:row.id} });
    },
    initData(){
      var url = "/salary/scaleAndStationList";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.tableData = res.obj;
        }
      });
    }
  },
  created() {
    this.initData();
  },
  mounted() {}
};
</script>
<style scoped>
</style>