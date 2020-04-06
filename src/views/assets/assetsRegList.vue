<template>
  <div class="assetsRegList">
    <my-pageheader titleContent="固定资产登记信息" :needButton="true" buttonContent="申请" @handleClick="req"></my-pageheader>
    <el-tabs value="reqList">
      <el-tab-pane label="申请列表" name="reqList">
        <task :taskObj="assetsRegReqList" draftUrl="assetsRegReq" detailUrl="assetsRegDetail">
          <template v-slot:draftItem="{ draftItem }">
            <row>
              <template slot="left">单号：{{draftItem.code}}</template>
            </row>
            <row>
              <template slot="left">资产名称：{{draftItem.name}}</template>
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
              <template slot="left">资产名称：{{cmtItem.name}}</template>
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
          :objList="assetsRegList"
          :total="100"
          :page-size="7"
          @getCurrentPage="getCurrentPage"
          url="assetsRegDetail"
        >
          <template v-slot:item="{ item }">
            <row>
              <template slot="left">
                <span>单号：{{item.code}}</span>
              </template>
            </row>
            <row>
              <template slot="left">资产名称：{{item.name}}</template>
              <template slot="right">{{item.createTime}}</template>
            </row>
            <row>
              <template slot="left">摘要：{{item.memo}}</template>
              <template slot="right">{{item.status}}</template>
            </row>
          </template>
        </my-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "assetsRegList",
  components: {},
  props: {},
  data() {
    return {
      assetsRegReqList: {
        draftList: [
          {
            id: "1",
            code: "AR2002160001",
            memo: "固定资产登记",
            name: "小车",
            status: "草稿",
            createTime: this.Utils.getNowFormatDate()
          }
        ], //草稿列表
        cmtList: [
          {
            id: "2",
            code: "AR2002160001",
            memo: "2019-2020学年学费",
            name: "电脑",
            status: "审核中",
            createTime: this.Utils.getNowFormatDate()
          }
        ] //审核中的列表
      },
      assetsRegList: [
        {
          id: "1",
          code: "AR2002160001",
          memo: "固定资产登记",
          name: "小车",
          status: "草稿",
          createTime: this.Utils.getNowFormatDate()
        },
        {
          id: "2",
          code: "AR2002160001",
          memo: "2019-2020学年学费",
          name: "电脑",
          status: "审核中",
          createTime: this.Utils.getNowFormatDate()
        }
      ],
      formOptions: [
        {
          label: "名称", // label文字
          prop: "name", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入名称" // elementui组件属性
        },
        {
          label: "状态", // label文字
          prop: "status", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "请选择状态", // elementui组件属性
          options: [
            { label: "审批中", value: "CMT" },
            { label: "正在进行", value: "EXE" },
            { label: "已完成", value: "EXE" }
          ]
        },
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    req() {
       this.$router.push({ path: "assetsRegReq" });
    },
    getCurrentPage(val) {}
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>