<template>
  <div class="voucherList">
    <my-pageheader titleContent="凭证录入信息" :needButton="true" buttonContent="申请" @handleClick="req"></my-pageheader>
    <el-tabs value="reqList">
      <el-tab-pane label="申请列表" name="reqList">
        <task :taskObj="voucherReqList" draftUrl="voucherReq" detailUrl="voucherDetail">
          <template v-slot:draftItem="{ draftItem }">
            <!-- <row>
              <template slot="left">凭证号："提交后生成"</template>
            </row>-->
            <row>
              <template slot="left">会计期间：{{draftItem.accountPeriod}}</template>
              <template slot="right">{{draftItem.bizDate}}</template>
            </row>
            <row>
              <template slot="left">摘要：{{draftItem.memo}}</template>
              <template slot="right">{{draftItem.status}}</template>
            </row>
          </template>
          <template v-slot:cmtItem="{ cmtItem }">
            <row>
              <template slot="left">凭证号：{{cmtItem.code}}</template>
            </row>
            <row>
              <template slot="left">会计期间：{{cmtItem.accountPeriod}}</template>
              <template slot="right">{{cmtItem.bizDate}}</template>
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
          <searchForm :formOptions="formOptions" btnItems="search" @onSearch="search"></searchForm>
        </div>
        <my-card
          :objList="voucherList"
          :total="total"
          :page-size="pageSize"
          @getCurrentPage="handleCurrentChange"
          url="voucherDetail"
          v-if="voucherList.length != 0"
        >
          <template v-slot:item="{ item }">
            <row v-if="item.status != '草稿'">
              <template slot="left">
                <span>凭证号：{{item.code}}</span>
              </template>
            </row>
            <row>
              <template slot="left">会计期间：{{item.accountPeriod}}</template>
              <template slot="right">{{item.bizDate}}</template>
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
  name: "voucherList",
  components: {},
  props: {},
  data() {
    return {
      voucherReqList: {},
      voucherList: [],
      formOptions: [
        {
          label: "凭证号", // label文字
          prop: "code", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入凭证号" // elementui组件属性
        },
        {
          label: "状态", // label文字
          prop: "status", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "请选择状态", // elementui组件属性
          options: [
            { label: "草稿", value: "DRAFT" },
            { label: "审批中", value: "CMT" },
            { label: "已完成", value: "EXE" }
          ]
        }
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
      this.$router.push({ path: "voucherReq" });
    },
    findVoucherReqList() {
      var url = "/voucher/voucherTaskList";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.voucherReqList = res.obj;
        }
      });
    },
    search(val) {
      var url = "/voucher/allTaskList";
      var data={};
      data.pageSize = this.pageSize;
      if (val) {
        this.searchVal = this.Utils.copyObj(val);
        if (this.searchVal.hasOwnProperty("status")) {
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
            this.voucherList = res.obj.list;
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
    this.findVoucherReqList();
    this.search();
  },
  mounted() {}
};
</script>
<style scoped>
</style>