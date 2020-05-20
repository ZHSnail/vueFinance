<template>
  <div class="settleWageInfo">
    <my-pageheader titleContent="工资结算"></my-pageheader>
    <div style="margin-top:20px" v-if="payStubList.length != 0">
      <my-card
        :objList="payStubList"
        url="salaryRunInfo"
        :total="total"
        :page-size="page.pageSize"
        @getCurrentPage="getCurrentPage"
      >
        <template v-slot:item="{ item }">
          <row>
            <template slot="left">
              <span class="xlarge">{{item.name}}</span>
            </template>
          </row>
          <row>
            <template slot="left">当前关联人数：{{item.relatedNumber}}</template>
            <template slot="right" v-if="item.lastExeDate">最新执行期间：{{item.lastExeDate}}</template>
          </row>
        </template>
      </my-card>
    </div>
    <div class="centerAlign" v-else>
      <h4 style="color:red">暂无数据</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "settleWageInfo",
  components: {},
  props: {},
  data() {
    return {
      payStubList: [],
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
      var url = "/salary/payStubInfoList";
      this.axios
        .get(url, { params: { params: JSON.stringify(this.page) } })
        .then(res => {
          if (res.success) {
            this.payStubList = res.obj.list;
            this.total = res.obj.total;
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