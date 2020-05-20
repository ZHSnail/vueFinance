<template>
  <div class="depreciatedList">
    <my-pageheader titleContent="固定资产折旧信息" :needButton="true" buttonContent="申请" @handleClick="req"></my-pageheader>
    <el-tabs value="reqList">
      <el-tab-pane label="申请列表" name="reqList">
        <task :taskObj="depreciatedReqList" draftUrl="depreciatedReq" detailUrl="depreciatedDetail">
          <template v-slot:draftItem="{ draftItem }">
            <row>
              <template slot="left">单号：{{draftItem.code}}</template>
            </row>
            <row>
              <template slot="left">资产名称：{{draftItem.assets.name}}</template>
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
            </row>
            <row>
              <template slot="left">资产名称：{{cmtItem.assets.name}}</template>
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
          :objList="depreciatedList"
          :total="total"
          :page-size="pageSize"
          @getCurrentPage="handleCurrentChange"
          url="depreciatedDetail"
          v-if="depreciatedList.length != 0"
        >
          <template v-slot:item="{ item }">
            <row>
              <template slot="left">
                <span>单号：{{item.code}}</span>
              </template>
            </row>
            <row>
              <template slot="left">资产名称：{{item.assets.name}}</template>
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
  name: "depreciatedList",
  components: {},
  props: {},
  data() {
    return {
      depreciatedReqList: {
        draftList: [
          {
            id: "1",
            code: "AD2002160001",
            memo: "固定资产登记",
            name: "小车",
            status: "草稿",
            createTime: this.Utils.getNowFormatDate()
          }
        ], //草稿列表
        cmtList: [
          {
            id: "2",
            code: "AD2002160001",
            memo: "2019-2020学年学费",
            name: "电脑",
            status: "审核中",
            createTime: this.Utils.getNowFormatDate()
          }
        ] //审核中的列表
      },
      depreciatedList: [
        {
          id: "1",
          code: "AD2002160001",
          memo: "固定资产登记",
          name: "小车",
          status: "草稿",
          createTime: this.Utils.getNowFormatDate()
        },
        {
          id: "2",
          code: "AD2002160001",
          memo: "2019-2020学年学费",
          name: "电脑",
          status: "审核中",
          createTime: this.Utils.getNowFormatDate()
        }
      ],
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
      this.$router.push({ path: "depreciatedReq" });
    },
    findDepreciatedReqList(){
      var url = "/assets/assetsDepreciationTaskList";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.depreciatedReqList = res.obj;
        }
      });
    },
    search(val) {
      var url = "/assets/allAssetsDepreciationTaskList";
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
            this.depreciatedList = res.obj.list;
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
    this.findDepreciatedReqList();
    this.search();
  },
  mounted() {}
};
</script>
<style scoped>
</style>