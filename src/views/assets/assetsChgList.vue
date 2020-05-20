<template>
  <div class="assetsChgList">
    <my-pageheader titleContent="固定资产变动信息" :needButton="true" buttonContent="申请" @handleClick="req"></my-pageheader>
    <el-tabs value="reqList">
      <el-tab-pane label="申请列表" name="reqList">
        <task
          :taskObj="assetsChgReqList"
          draftUrl="assetsChgReq"
          detailUrl="assetsChgDetail"
        >
          <template v-slot:draftItem="{ draftItem }">
            <row>
              <template slot="left">单号：{{draftItem.code}}</template>
              <template slot="right">{{draftItem.createTime}}</template>
            </row>
            <row>
              <template slot="left">摘要：{{draftItem.memo}}</template>
              <template slot="right">{{draftItem.status}}</template>
            </row>
          </template>
          <template v-slot:cmtItem="{ cmtItem }">
            <row>
              <template slot="left">单号：{{cmtItem.code}}</template>
              <template slot="right">{{cmtItem.createTime}}</template>
            </row>
            <row>
              <template slot="left">摘要：{{cmtItem.memo}}</template>
              <template slot="right">{{cmtItem.status}}</template>
            </row>
          </template>
        </task>
      </el-tab-pane>
      <el-tab-pane label="登记查询" name="reqListQuery">
        <div>
          <searchForm :formOptions="formOptions" btnItems="search"></searchForm>
        </div>
        <my-card
          :objList="assetsChgList"
          :total="total"
          :page-size="pageSize"
          @getCurrentPage="handleCurrentChange"
          url="assetsChgDetail"
          v-if="assetsChgList.length != 0"
        >
          <template v-slot:item="{ item }">
            <row>
              <template slot="left">
                <span>单号：{{item.code}}</span>
              </template>
              <template slot="right">{{item.createTime}}</template>
            </row>
            <row>
              <template slot="left">摘要：{{item.memo}}</template>
              <template slot="right">{{item.status}}</template>
            </row>
          </template>
        </my-card>
        <h4 class="centerAlign" style="color:red" v-else>暂无数据</h4>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "assetsChgList",
  components: {},
  props: {},
  data() {
    return {
      assetsChgReqList: {},
      assetsChgList: [],
      formOptions: [
        {
          label: "单号", // label文字
          prop: "code", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入单号" // elementui组件属性
        },
        {
          label: "状态", // label文字
          prop: "status", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "请选择状态", // elementui组件属性
          options: [
            { label: "审批中", value: "CMT" },
            { label: "已完成", value: "EXE" }
          ]
        },
      ],
      pageSize: 7,
      total: 0,
      pageNum: 1,
      searchVal: {
        code: "",
        status: ""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    req() {
      this.$router.push({ path: "assetsChgReq" });
    },
    findAssetsPurchaseReqList(){
      var url = "/assets/assetsChangeTaskList";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.assetsChgReqList = res.obj;
        }
      });
    },
    search(val) {
      var url = "/assets/allAssetsChangeTaskList";
      var data={};
      data.pageSize = this.pageSize;
      if (val) {
        this.searchVal = this.Utils.copyObj(val);
        if (this.searchVal.hasOwnProperty("code")) {
          data.code = this.searchVal.code;
        }
        if (this.searchVal.hasOwnProperty("status")) {
          data.status = this.searchVal.status;
        }
      }
      this.axios
        .get(url, { params: { params: JSON.stringify(data) } })
        .then(res => {
          if (res.success) {
            this.assetsChgList = res.obj.list;
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
  created() {
    this.findAssetsPurchaseReqList();
    this.search();
  },
  mounted() {}
};
</script>
<style scoped>
</style>