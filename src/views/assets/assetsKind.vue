<template>
  <div class="assetsKind">
    <my-pageheader titleContent="资产分类配置" :needButton="true" buttonContent="添加" @handleClick="add"></my-pageheader>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="code" label="编码"></el-table-column>
      <el-table-column align="center" prop="name" label="资产名称"></el-table-column>
      <el-table-column align="center" prop="calUnit" label="计量单位"></el-table-column>
      <el-table-column align="center" prop="fixAccount" label="固定资产科目">
        <template slot-scope="scope">
          <span v-for="(item) in scope.row.account" :key="item.id">{{item.code+" " + item.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="depreAccount" label="累计折旧科目">
        <template slot-scope="scope">
          <span>{{scope.row.state == "TRUE" ? "启用":"停用"}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="preMeth" label="预设折旧方法">
        <template slot-scope="scope">
          <span>{{scope.row.state == "TRUE" ? "启用":"停用"}}</span>
        </template>
      </el-table-column>
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
    <el-dialog
      title="添加资产分类"
      :visible.sync="dialogFormVisible"
      width="35%"
      @close="handleClose"
      :close-on-click-modal="false"
      center
    >
      <el-form ref="assetsForm" :rules="rules" :model="assetsForm" :status-icon="true">
          <el-form-item label="收费方式" prop="feeMethod">
              <select-account v-model="assetsForm.feeMethod"></select-account>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "assetsKind",
  components: {},
  props: {},
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      assetsForm: {
        feeMethod: {}
      },
       rules: {
        feeMethod: [{ required: true, message: "请输入费用名称", trigger: "change" }],
        
        }
    };
  },
  watch: {},
  computed: {},
  methods: {
    add() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    handleClose() {},
    save(){
        console.log(this.assetsForm.feeMethod)
    }
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