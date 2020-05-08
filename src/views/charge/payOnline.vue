<template>
  <div class="payOnline">
    <div>
      <my-pageheader titleContent="在线缴费" v-if="active"></my-pageheader>
      <my-pageheader
        titleContent="通知缴费"
        :needButton="true"
        buttonContent="发起缴费"
        v-else
        @handleClick="addFeeNotice"
      ></my-pageheader>
    </div>
    <!-- 在线缴费，需要根据用户的角色来判断是否显示某个选项卡，
    除了收费管理员都能看到在线缴费的选项卡-->
    <el-tabs value="payNotice" @tab-click="handleClick">
      <el-tab-pane label="通知缴费" name="payNotice">
        <task
          :taskObj="payNoticeList"
          :needExe="true"
          draftUrl="payNoticeReq"
          detailUrl="payNoticeDetail"
        >
          <template v-slot:draftItem="{ draftItem }">
            <row>
              <template slot="left">单号：{{draftItem.code}}</template>
            </row>
            <row>
              <template slot="left">应收金额：{{draftItem.amount}}元</template>
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
              <template slot="left">应收金额：{{cmtItem.amount}}元</template>
              <template slot="right">{{cmtItem.createTime}}</template>
            </row>
            <row>
              <template slot="left">摘要：{{cmtItem.memo}}</template>
              <template slot="right">{{cmtItem.status}}</template>
            </row>
          </template>
          <template v-slot:exeItem="{ exeItem }">
            <row>
              <template slot="left">单号：{{exeItem.code}}</template>
            </row>
            <row>
              <template slot="left">应收金额：{{exeItem.amount}}元</template>
              <template slot="right">{{exeItem.createTime}}</template>
            </row>
            <row>
              <template slot="left">摘要：{{exeItem.memo}}</template>
              <template slot="right">{{exeItem.status}}</template>
            </row>
          </template>
          <template v-slot:finishItem="{ finishItem }">
            <row>
              <template slot="left">单号：{{finishItem.code}}</template>
            </row>
            <row>
              <template slot="left">应收金额：{{finishItem.amount}}元</template>
              <template slot="right">{{finishItem.createTime}}</template>
            </row>
            <row>
              <template slot="left">摘要：{{finishItem.memo}}</template>
              <template slot="right">{{finishItem.status}}</template>
            </row>
          </template>
        </task>
      </el-tab-pane>
      <el-tab-pane label="在线缴费" name="payOline">
        <my-card
          :objList="feeDetailList"
          :total="total"
          :page-size="page.pageSize"
          @getCurrentPage="getCurrentPage"
          v-if="feeDetailList.length != 0"
        >
          <template v-slot:item="{ item }">
            <row>
              <template slot="left">
                <span class="xlarge">{{item.payNotice.feeKind.name}}</span>
              </template>
            </row>
            <row>
              <template slot="left">单号：{{item.code}}</template>
              <template slot="right">{{item.createTime}}</template>
            </row>
            <row>
              <template slot="left">金额：{{item.amount + " 元"}}</template>
              <template slot="right">{{item.payNotice.org}}</template>
            </row>
          </template>
        </my-card>
        <h4 class="centerAlign" style="color:red" v-else>暂无数据</h4>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import "@/assets/css/charge/payOnline.css";
export default {
  name: "payOnline",
  components: {},
  props: {},
  data() {
    return {
      feeDetailList: [],
      active: false,
      payNoticeList: {},
      total: 0,
      page: {
        pageNum: 1,
        pageSize: 7
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleClick(tab, event) {
      if (tab.label == "通知缴费") {
        this.active = false;
      } else {
        this.active = true;
      }
    },
    addFeeNotice() {
      this.$router.push({ path: "payNoticeReq" });
    },
    findPayNoticeList() {
      var url = "/charge/PayNoticeTaskList";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.payNoticeList = res.obj;
        }
      });
    },
    searchData() {
      var url = "/charge/payDetailList";
      this.axios.get(url,{ params: { params: JSON.stringify(this.page) } }).then(res => {
        if (res.success) {
          this.feeDetailList = res.obj.list;
          this.total = res.obj.total
        }
      });
    },
    getCurrentPage(val) {
      this.page.pageNum = val;
    }
  },
  created() {
    this.findPayNoticeList();
    this.searchData();
  },
  mounted() {}
};
</script>
<style scoped>
</style>