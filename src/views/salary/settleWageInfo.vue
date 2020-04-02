<template>
  <div class="settleWageInfo">
    <my-pageheader titleContent="工资结算"></my-pageheader>
    <div style="margin-top:20px">
      <my-card :objList="payStubList" url="salaryRunInfo" :total="100" :page-size="7" @getCurrentPage="getCurrentPage">
        <template v-slot:item="{ item }">
          <row>
            <template slot="left"><span class="xlarge">{{item.name}}</span></template>
          </row>
          <row>
            <template slot="left">当前关联人数：{{item.lastExePeriod}}</template>
            <template slot="right">最新执行期间：{{item.lastExePeriod}}</template>
          </row>
        </template>
      </my-card>
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
      payStubList: [
        {
          id: "1",
          name: "教师类工资单",
          lastExePeriod: "202004"
        },
        {
          id: "2",
          name: "教师类工资单",
          lastExePeriod: "202004"
        },
        {
          id: "3",
          name: "教师类工资单",
          lastExePeriod: "202004"
        },
        {
          id: "4",
          name: "教师类工资单",
          lastExePeriod: "202004"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    getCurrentPage(val) {}
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>