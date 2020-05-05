<template>
  <div class="studentInfo">
    <my-pageheader titleContent="学生信息" :needButton="true" buttonContent="添加" @handleClick="add"></my-pageheader>
    <div>
      <searchForm :formOptions="formOptions" @onSearch="search" btnItems="search"></searchForm>
    </div>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="name" label="名称"></el-table-column>
      <el-table-column align="center" prop="stuNo" label="学号"></el-table-column>
      <el-table-column align="center" prop="stuClass" label="班级"></el-table-column>
      <el-table-column align="center" label="专业">
        <template slot-scope="scope">{{scope.row.profession.grade+'级'+scope.row.profession.name}}</template>
      </el-table-column>
      <el-table-column align="center" label="宿舍">
        <template
          slot-scope="scope"
        >{{scope.row.dormInfo.buildNumber + '栋' + scope.row.dormInfo.dormNumber}}</template>
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
        title="学生信息"
        :visible.sync="dialogFormVisible"
        width="35%"
        @close="handleClose"
        :close-on-click-modal="false"
        center
      >
        <el-form ref="studentInfoFrom" :rules="rules" :model="studentInfoFrom" :status-icon="true">
          <el-form-item label="名称" prop="name">
            <el-input v-model="studentInfoFrom.name" class="length"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="stuNo">
            <el-input v-model="studentInfoFrom.stuNo" class="length"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="stuClass">
            <el-input v-model="studentInfoFrom.stuClass" class="length"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="professionId">
            <el-cascader
              placeholder="请选择专业"
              :options="professionList"
              filterable
              clearable
              class="length"
              v-model="studentInfoFrom.professionId"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="宿舍" prop="dormId">
            <el-select
              class="length"
              placeholder="请选择宿舍"
              v-model="studentInfoFrom.dormId"
              value-key="id"
              clearable
              filterable
            >
              <el-option
                v-for="item in dormList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
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
          :current-page="pageNum"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "studentInfo",
  components: {},
  props: {},
  data() {
    return {
      formOptions: [
        {
          label: "学生名", // label文字
          prop: "name", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入学生名" // elementui组件属性
        },
        {
          label: "专业", // label文字
          prop: "professionId", // 字段名
          element: "el-cascader", // 指定elementui组件
          placeholder: "专业", // elementui组件属性
          options: []
        },
        {
          label: "宿舍", // label文字
          prop: "dormId", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "宿舍", // elementui组件属性
          options: []
        }
      ],
      tableData: [],
      pageSize: 10,
      total: 0,
      pageNum: 1,
      studentInfoFrom: {
        name: "",
        stuNo: "",
        stuClass: "",
        dormId: "",
        professionId: ""
      },
      rules: {
        name: [{ required: true, message: "请输入学生名称", trigger: "blur" }],
        stuNo: [{ required: true, message: "请输入学号", trigger: "blur" }],
        stuClass: [{ required: true, message: "请输入班级", trigger: "blur" }],
        dormId: [{ required: true, message: "请选择宿舍", trigger: "blur" }],
        professionId: [
          { required: true, message: "请选择专业", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      flag: true,
      professionList: [],
      searchVal: {
        name: "",
        professionId: "",
        dormId: ""
      },
      dormList: [],
      dormOption: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    search(val) {
      var url = "/charge/studentInfoList";
      var data = "";
      if (val) {
        if (val.professionId) {
          val.professionId = val.professionId[2];
        }
        this.searchVal = this.Utils.copyObj(val);
        data = JSON.stringify(val);
      }
      this.axios.get(url, { params: { params: data } }).then(res => {
        if (res.success) {
          this.tableData = res.obj.list;
          this.total = res.obj.total;
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
      this.$refs["studentInfoFrom"].resetFields();
      this.Utils.clearObj(this.studentInfoFrom);
    },
    save() {
      var formRefs = [this.$refs["studentInfoFrom"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          this.studentInfoFrom.professionId = this.studentInfoFrom.professionId[2];
          if (this.flag) {
            this.axios
              .post("/charge/studentInfo", this.studentInfoFrom)
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
              .put("/charge/studentInfo", this.studentInfoFrom)
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
      var url = "/charge/studentInfo/" + id;
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
      this.studentInfoFrom = this.Utils.copyObj(row);
      var professionId = this.studentInfoFrom.professionId;
      this.professionList.forEach(item => {
        if (item.children) {
          var temp = item.children;
          for (var i = 0; i < temp.length; i++) {
            if (temp[i].children) {
              for (var j = 0; j < temp[i].children.length; j++) {
                if (temp[i].children[j].value === professionId) {
                  this.studentInfoFrom.professionId = [];
                  this.studentInfoFrom.professionId.push(item.value);
                  this.studentInfoFrom.professionId.push(temp[i].value);
                  this.studentInfoFrom.professionId.push(professionId);
                }
              }
            }
          }
        }
      });
      this.flag = false;
      this.dialogFormVisible = true;
    },
    add() {
      this.flag = true;
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    findProfessionList() {
      var url = "/charge/easyProSelect";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.professionList = res.obj;
          this.formOptions[1].options = this.professionList;
        }
      });
    },
    findDormList() {
      var url = "/charge/dormInfos";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.dormList = res.obj;
          this.dormList.forEach(item => {
            var temp = {};
            item.name = item.buildNumber + "栋" + item.dormNumber;
            temp.label = item.name;
            temp.value = item.id;
            this.formOptions[2].options.push(temp);
          });
        }
      });
    }
  },
  created() {
    this.search();
    this.findProfessionList();
    this.findDormList();
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