<template>
  <div class="assetsRegQuery">
    <my-pageheader titleContent="固定资产登记综合查询"></my-pageheader>
     <div>
      <searchForm
        :formOptions="formOptions"
        @onSearch="search"
        btnItems="search"
      ></searchForm>
    </div>
    <el-table cell-class-name="centerAlign" :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" label="单号">
         <template slot-scope="scope">
          <router-link :to="'assetsRegDetail/'+scope.row.id" tag="div">
            <el-link type="primary" :underline="false">{{scope.row.code}}</el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="assets.name" label="资产名称"></el-table-column>
      <el-table-column align="center" prop="assets.assetsKind.name" label="资产类别"></el-table-column>
      <el-table-column align="center" prop="assets.depreMethod" label="折旧方法"></el-table-column>
      <el-table-column align="center" prop="assets.num" label="数量"></el-table-column>
      <el-table-column align="center" prop="assets.orival" label="原价值"></el-table-column>
      <el-table-column align="center" label="残值率">
        <template slot-scope="scope">
          <span>{{scope.row.assets.salvage * 100}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="assets.usefulLife" label="预计使用年限"></el-table-column>
      <el-table-column align="center" prop="status" label="状态"></el-table-column>
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
          :current-page.sync="pageNum"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "assetsRegQuery",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      pageSize: 10,
      total: 0,
      pageNum:1,
      formOptions: [
        {
          label: "单号", // label文字
          prop: "code", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入单号" // elementui组件属性
        }
      ],
      searchVal:{
        code: "",
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    search(val) {
      var url = "/assets/assetsRegisterList";
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
  },
  created() {
    this.search();
  },
  mounted() {}
};
</script>
<style scoped>
</style>