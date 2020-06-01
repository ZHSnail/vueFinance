<template>
  <div class="roleUserInfo">
    <my-pageheader titleContent="用户角色分配信息" ></my-pageheader>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="name" label="用户名称"></el-table-column>
      <el-table-column align="center" label="角色">
           <template slot-scope="scope">
             <span v-for="item in scope.row.roles" v-bind:key="item.id">
               {{item.roleName+","}}
             </span>
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
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog
        title="角色信息"
        :visible.sync="dialogFormVisible"
        width="35%"
        @close="handleClose"
        :close-on-click-modal="false"
        center
      >
        <el-form ref="roleFrom" :rules="rules" :model="roleFrom" :status-icon="true">
          <el-form-item label="名称" prop="name">
            <el-input v-model="roleFrom.name" class="length"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roles">
            <el-select
                class="length"
                clearable
                v-model="roleFrom.roles"
                multiple
                placeholder="请选择角色"
              >
                <el-option
                  v-for="item in roleList"
                  :key="item.id"
                  :label="item.roleName"
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
  </div>
</template>

<script>
export default {
  name: "roleUserInfo",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      roleFrom: {
        name: "",
        roles: []
      },
      dialogFormVisible: false,
      flag: true,
      roleList:[],
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleClose() {
      this.$refs["roleFrom"].resetFields();
      this.Utils.clearObj(this.roleFrom);
    },
    handleEdit(index, row) {
      this.roleFrom = this.Utils.copyObj(row);
      this.flag = false;
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    findAll(){
      var url = "/system/allUserInfo";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.tableData = res.obj;
        }
      });
    },
    findAllRole(){
      var url = "/system/getAllRoleList";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.roleList = res.obj;
        }
      });
    },
    save(){
      var data = {
        roleIds:this.roleFrom.roles,
        bizId:this.roleFrom.id,
      };
    }
  },
  created() {
    this.findAll();
    this.findAllRole();
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