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
      tableData: [
        {
          id: "1",
          type: "教师类",
          stationAmount: 1000, //岗位工资标准
          stationStage: 10, //岗位工资级数
          stationGrad: 200, //岗位工资级差
          scaleAmount: 220, //薪级工资标准
          scaleStage: 10, //薪级工资级数
          scaleGrad: 200, //薪级工资级差
        },
        {
          id: "2",
          type: "高级管理类",
          stationAmount: 1000, //岗位工资标准
          stationStage: 10, //岗位工资级数
          stationGrad: 200, //岗位工资级差
          scaleAmount: 220, //薪级工资标准
          scaleStage: 10, //薪级工资级数
          scaleGrad: 200, //薪级工资级差
        },
        {
          id: "3",
          type: "职能管理类",
          stationAmount: 1000, //岗位工资标准
          stationStage: 10, //岗位工资级数
          stationGrad: 200, //岗位工资级差
          scaleAmount: 220, //薪级工资标准
          scaleStage: 10, //薪级工资级数
          scaleGrad: 200, //薪级工资级差
        },
        {
          id: "4",
          type: "其他类",
          stationAmount: 1000, //岗位工资标准
          stationStage: 10, //岗位工资级数
          stationGrad: 200, //岗位工资级差
          scaleAmount: 220, //薪级工资标准
          scaleStage: 10, //薪级工资级数
          scaleGrad: 200, //薪级工资级差
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleEdit(index, row) {
      this.$router.push({ name: "postWageAdd",params:{obj:row,id:row.id} });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>