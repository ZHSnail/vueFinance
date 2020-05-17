<template>
  <div class="voucherReview">
    <div>
      <my-pageheader titleContent="凭证审核"></my-pageheader>
      <div style="margin-top:20px" v-if="taskList.length != 0">
        <my-card
          :objList="taskList"
          :total="total"
          :page-size="page.pageSize"
          @getCurrentPage="getCurrentPage"
          url="voucherApprove"
        >
          <template v-slot:item="{ item }">
            <row>
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
      </div>
      <div class="centerAlign" v-else>
        <h4 style="color:red">暂无数据</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "voucherReview",
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
      var url = "/voucher/voucherCmtList";
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