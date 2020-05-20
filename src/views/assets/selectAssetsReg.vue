<template>
  <div class="selectAssetsReg">
    <el-row>
      <el-col :span="24" class="rightAlign">
        <el-button type="primary" @click="addAssets" class="addButton" size="small">添加资产</el-button>
      </el-col>
    </el-row>
    <el-dialog
      title="添加资产清单"
      :visible.sync="dialogFormVisible"
      width="800px"
      :close-on-click-modal="false"
      @open="open"
      center
    >
      <div>
        <searchForm :formOptions="formOptions" @onSearch="search" btnItems="search"></searchForm>
      </div>
      <el-checkbox-group v-if="!isSimple" v-model="checkList">
        <el-checkbox
          class="checkbox"
          v-for="item in assetsRegList"
          v-bind:key="item.id"
          :label="item"
        >
          <el-card shadow="hover" style="width:750px">
            <row>
              <template slot="left">
                <span style="font-size: medium;font-weight: bold;">{{item.name}}</span>
              </template>
            </row>
            <row>
              <template slot="left">资产编号：{{item.code}}</template>
              <template slot="right" v-if="item.assetsKind">资产类别：{{item.assetsKind.name}}</template>
            </row>
            <row>
              <template slot="left">原价值：{{item.orival}}</template>
            </row>
          </el-card>
        </el-checkbox>
      </el-checkbox-group>
      <el-checkbox-group v-if="isSimple" :max="1" v-model="checkList">
        <el-checkbox
          class="checkbox"
          v-for="item in assetsRegList"
          v-bind:key="item.id"
          :label="item"
        >
          <el-card shadow="hover" style="width:750px">
            <row>
              <template slot="left">
                <span style="font-size: medium;font-weight: bold;">{{item.name}}</span>
              </template>
            </row>
            <row>
              <template slot="left">资产编号：{{item.code}}</template>
              <template slot="right" v-if="item.assetsKind">资产类别：{{item.assetsKind.name}}</template>
            </row>
            <row>
              <template slot="left">原价值：{{item.orival}}</template>
            </row>
          </el-card>
        </el-checkbox>
      </el-checkbox-group>
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
      <div slot="footer" class="rightAlign">
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "selectAssetsReg",
  components: {},
  props: {
    ignoreIds: Array,
    isSimple: Boolean,
    isChange:Boolean,
  },
  data() {
    return {
      dialogFormVisible: false,
      pageSize: 10,
      total: 0,
      pageNum: 1,
      formOptions: [
        {
          label: "名称", // label文字
          prop: "name", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入名称" // elementui组件属性
        }
      ],
      checkList: [],
      assetsRegList: [],
      searchVal: {
        name: ""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    addAssets() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    save() {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.$emit("getVal", this.checkList);
    },
    open() {
      (this.checkList = []); this.search();
    },
    search(val) {
      var url = "/assets/assetsList";
      if(this.isChange){
         url = "/assets/selectAssetsChangeList";
      }
      var data = val ? JSON.stringify(val) : "";
      if (val) {
        this.searchVal = this.Utils.copyObj(val);
      }
      this.axios.get(url, { params: { params: data } }).then(res => {
        if (res.success) {
          this.assetsRegList = res.obj.list;
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
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.addButton {
  margin-bottom: 10px;
}
.selectAssetsReg >>> .el-checkbox__label {
  display: block;
}
.selectAssetsReg >>> .el-card {
  border-radius: 0px;
}
.checkbox {
  padding-top: 5px;
}
</style>