<template>
  <div class="professionInfo">
    <my-pageheader titleContent="专业信息" :needButton="true" buttonContent="添加" @handleClick="add"></my-pageheader>
    <div>
      <searchForm
        :formOptions="formOptions"
        @onSearch="search"
        btnItems="search"
      ></searchForm>
    </div>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="name" label="专业名"></el-table-column>
      <el-table-column align="center" prop="grade" label="年级"></el-table-column>
      <el-table-column align="center" prop="isLeaf" label="叶子节点">
        <template slot-scope="scope">
          {{scope.row.isLeaf=='TRUE' ? "是" :"否"}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
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
    <div>
      <el-dialog
        title="专业信息"
        :visible.sync="dialogFormVisible"
        width="35%"
        @close="handleClose"
        :close-on-click-modal="false"
        center
      >
        <el-form
          ref="professionInfoFrom"
          :rules="rules"
          :model="professionInfoFrom"
          :status-icon="true"
        >
          <el-form-item label="专业名" prop="name">
            <el-input v-model="professionInfoFrom.name" class="length"></el-input>
          </el-form-item>
          <el-form-item label="年级" prop="grade" v-if="professionInfoFrom.isLeaf == 'TRUE'" style="margin-left:15px">
            <el-input v-model="professionInfoFrom.grade" class="length"></el-input>
          </el-form-item>
          <el-form-item label="父节点" v-if="professionInfoFrom.isLeaf == 'TRUE'" prop="parentId">
            <el-select
              class="length"
              placeholder="请选择父节点"
              v-model="professionInfoFrom.parentId"
              value-key="id"
            >
              <el-option
                v-for="item in parentProfessionList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="叶子节点" prop="isLeaf" style="margin-right:150px">
            <el-radio-group v-model="professionInfoFrom.isLeaf">
              <el-radio label="TRUE">是</el-radio>
              <el-radio label="FALSE">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </div>
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
          :current-page.sync="pageNum"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "professionInfo",
  components: {},
  props: {},
  data() {
    return {
      formOptions: [
        {
          label: "专业名", // label文字
          prop: "name", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入专业名" // elementui组件属性
        },
        {
          label: "只显示叶子节点", // label文字
          prop: "isLeaf", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "只显示叶子节点", // elementui组件属性
          options: [
            { label: "是", value: "TRUE" },
            { label: "否", value: "FALSE" },
          ],
          initValue:"TRUE"
        }
      ],
      tableData: [],
      pageSize: 10,
      total: 0,
      pageNum:1,
      professionInfoFrom: {
        name: "",
        isLeaf: "TRUE",
        parentId: "",
        grade:""
      },
      rules: {
        name: [{ required: true, message: "请输入专业号", trigger: "blur" }],
        grade: [{ required: true, message: "请输入年级", trigger: "blur" }],
        isLeaf: [
          { required: true, message: "请选择是否叶子节点", trigger: "change" }
        ],
        parentId: [
          { required: true, message: "请选择父节点", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      flag: true,
      parentProfessionList: [],
      searchVal:{
        name: "",
        isLeaf: "",
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    search(val) {
      var url = "/charge/professionList";
      var data = val ? JSON.stringify(val) : "";
      if(val){
        this.searchVal = this.Utils.copyObj(val);
      }
      this.axios.get(url, { params: { params: data } }).then(res => {
        if (res.success) {
          this.tableData = res.obj.list;
          this.total = res.obj.total;
          this.pageNum = res.obj.pageNum;
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = this.Utils.copyObj(this.searchVal);
      data.pageNum = val;
      this.search(data);
    },
    handleClose() {
      this.$refs["professionInfoFrom"].resetFields();
      this.Utils.clearObj(this.professionInfoFrom);
    },
    save() {
      var formRefs = [this.$refs["professionInfoFrom"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          if (this.flag) {
            this.axios
              .post("/charge/profession", this.professionInfoFrom)
              .then(res => {
                if (res.success) {
                  this.$message({
                    type: "success",
                    message: res.msg,
                    center: true
                  });
                  this.dialogFormVisible = false;
                  this.handleCurrentChange(this.pageNum);
                }
              });
          } else {
            this.axios
              .put("/charge/profession", this.professionInfoFrom)
              .then(res => {
                if (res.success) {
                  this.$message({
                    type: "success",
                    message: res.msg,
                    center: true
                  });
                  this.dialogFormVisible = false;
                  this.handleCurrentChange(this.pageNum);
                }
              });
          }
        }
      });
    },
    handleDelete(id) {
      var url = "/charge/profession/" + id;
      this.axios.delete(url).then(res => {
        if (res.success) {
          this.search();
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
    },
    handleEdit(index, row) {
      this.professionInfoFrom = this.Utils.copyObj(row);
      this.flag = false;
      this.dialogFormVisible = true;
    },
    add() {
      this.flag = true;
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    findParent() {
      var url = "/charge/parentProfession";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.parentProfessionList = res.obj;
        }
      });
    },
  },
  created() {
    this.search({isLeaf:"TRUE"});
    this.findParent();
  },
  mounted() {}
};
</script>
<style scoped>
.el-form-item {
  display: flex;
  justify-content: center;
}
</style>