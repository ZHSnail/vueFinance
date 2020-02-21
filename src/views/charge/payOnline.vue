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
    <el-tabs value="payOline" @tab-click="handleClick">
      <el-tab-pane label="在线缴费" name="payOline">
        <my-card
          :objList="feeDetailList"
          :total="100"
          :page-size="7"
          @getCurrentPage="getCurrentPage"
        >
          <template v-slot:item="{ item }">
            <row>
              <template slot="left">
                <span class="xlarge">{{item.name}}</span>
              </template>
            </row>
            <row>
              <template slot="left">单号：{{item.code}}</template>
              <template slot="right">{{item.createTime}}</template>
            </row>
            <row>
              <template slot="left">金额：{{item.amount}}</template>
              <template slot="right">{{item.org}}</template>
            </row>
          </template>
        </my-card>
      </el-tab-pane>
      <el-tab-pane label="通知缴费" name="payNotice">
        <task :taskObj="payNoticeList" :needExe="true" draftUrl="payNoticeReq" detailUrl="payNoticeDetail">
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
              <template slot="right">{{draftItem.state}}</template>
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
              <template slot="right">{{cmtItem.state}}</template>
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
              <template slot="right">{{exeItem.state}}</template>
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
              <template slot="right">{{finishItem.state}}</template>
            </row>
          </template>
        </task>
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
      feeDetailList: [
        {
          id: "1",
          code: "XF2002120003",
          name: "学费",
          createTime: this.Utils.getNowFormatDate(),
          amount: this.Utils.changeToChinese(1000),
          org: "仲恺农业工程学院",
          payTime: "2019-2020",
          timeMold: "学年"
        },
        {
          id: "2",
          code: "XF2002120003",
          name: "宿舍费",
          createTime: this.Utils.getNowFormatDate(),
          amount: "2000.00",
          org: "仲恺农业工程学院"
        },
        {
          id: "3",
          code: "XF2002120003",
          name: "电费",
          createTime: this.Utils.getNowFormatDate(),
          org: "仲恺农业工程学院"
        },
        {
          id: "4",
          code: "XF2002120003",
          name: "电费",
          createTime: this.Utils.getNowFormatDate(),
          org: "仲恺农业工程学院"
        }
      ],
      currentPage: 1,
      active: true,
      payNoticeList: {
        draftList: [
          {
            id: "1",
            code: "SF2002160001",
            memo: "2019-2020学年学费",
            amount: "7962.12",
            state: "草稿",
            createTime: this.Utils.getNowFormatDate()
          }
        ], //草稿列表
        cmtList: [
          {
            id: "2",
            code: "SF2002160001",
            memo: "2019-2020学年学费",
            amount: "7962.12",
            state: "审核中",
            createTime: this.Utils.getNowFormatDate()
          }
        ], //审核中的列表
        exeList: [
          {
            id: "3",
            code: "SF2002160001",
            memo: "2019-2020学年学费",
            amount: "7962.12",
            state: "正在执行",
            createTime: this.Utils.getNowFormatDate()
          }
        ], //正在执行的列表
        finishList: [
          {
            id: "4",
            code: "SF2002160001",
            memo: "2019-2020学年学费",
            amount: "7962.12",
            state: "已完成",
            createTime: this.Utils.getNowFormatDate()
          }
        ] //已经完成的列表
      },
      activeNames: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    getCurrentPage(val) {
      this.currentPage = val;
    },
    handleClick(tab, event) {
      if (tab.label == "通知缴费") {
        this.active = false;
      } else {
        this.active = true;
      }
    },
    addFeeNotice() {
      this.$router.push({ path: "payNoticeReq" });
    }
  },
  created() {
    if (
      this.payNoticeList.hasOwnProperty("draftList") &&
      this.payNoticeList.draftList.length != 0
    ) {
      this.activeNames.push("1");
    }
    if (
      this.payNoticeList.hasOwnProperty("cmtList") &&
      this.payNoticeList.cmtList.length != 0
    ) {
      this.activeNames.push("2");
    }
    if (
      this.payNoticeList.hasOwnProperty("exeList") &&
      this.payNoticeList.exeList.length != 0
    ) {
      this.activeNames.push("3");
    }
    if (
      this.payNoticeList.hasOwnProperty("finishList") &&
      this.payNoticeList.finishList.length != 0
    ) {
      this.activeNames.push("4");
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>