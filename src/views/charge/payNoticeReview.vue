<template>
  <div class="payNoticeReview">
    <div>
      <my-pageheader titleContent="通知缴费单审核"></my-pageheader>
      <div style="margin-top:20px" v-if="taskList.length != 0">
        <my-card
          :objList="taskList"
          :total="total"
          :page-size="page.pageSize"
          @getCurrentPage="getCurrentPage"
          url="payNoticeApprove"
        >
          <template v-slot:item="{ item }">
            <row>
              <template slot="left">单号：{{item.code}}</template>
            </row>
            <row>
              <template slot="left">应收金额：{{item.amount}}元</template>
              <template slot="right">{{item.createTime}}</template>
            </row>
            <row>
              <template slot="left">摘要：{{item.memo}}</template>
            </row>
          </template>
        </my-card>
      </div>
      <div class="centerAlign" v-else>
        <h4 style="color:red">暂无数据</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "payNoticeReview",
  components: {},
  props: {},
  data() {
    return {
      taskList: [],
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
    searchData() {
      var url = "/charge/payNoticeCmtList";
      this.axios.get(url,{ params: { params: JSON.stringify(this.page) } }).then(res => {
        if (res.success) {
          this.taskList = res.obj.list;
          this.total = res.obj.total
        }
      });
    },
    getCurrentPage(val) {
      this.page.pageNum = val;
    }
  },
  created() {
    this.searchData();
  },
  mounted() {}
};
</script>
<style scoped>
</style>