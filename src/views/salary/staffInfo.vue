<template>
  <div class="staffInfo">
    <div>
      <my-pageheader
        titleContent="职工详情"
        :needButton="true"
        buttonContent="导入"
        @handClick="importStaff"
      ></my-pageheader>
    </div>
    <el-table
      cell-class-name="centerAlign"
      :data="tableData"
      stripe
      style="width: 100%"
      max-height="400"
    >
      <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
      <el-table-column align="center" prop="name" label="名称" width="120"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别"></el-table-column>
      <el-table-column align="center" label="学历" prop="degree"></el-table-column>
      <el-table-column align="center" prop="cardNumber" label="证件号码"></el-table-column>
      <el-table-column align="center" prop="entryDate" label="入职日期"></el-table-column>
      <el-table-column align="center" prop="bankName" label="银行账户"></el-table-column>
      <el-table-column align="center" label="职工分类" prop="station"></el-table-column>
      <el-table-column align="center" label="状态" prop="state"></el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total"
          class="centerAlign"
          :hide-on-single-page="true"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "staffInfo",
  components: {},
  props: {},
  data() {
    return {
      tableData: [
        {
          id: "1",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankName: "建设银行",
          station: "教师"
        },
        {
          id: "1",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankName: "建设银行",
          station: "教师"
        },
        {
          id: "1",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankName: "建设银行",
          station: "教师"
        },
        {
          id: "1",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankName: "建设银行",
          station: "教师"
        },
        {
          id: "1",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankName: "建设银行",
          station: "教师"
        },
        {
          id: "1",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankName: "建设银行",
          station: "教师"
        },
        {
          id: "1",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankName: "建设银行",
          station: "教师"
        },
        {
          id: "1",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankName: "建设银行",
          station: "教师"
        },
        {
          id: "1",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankName: "建设银行",
          station: "教师"
        },
        {
          id: "1",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankName: "建设银行",
          station: "教师"
        }
      ],
      total: 200,
      pageSize: 10
    };
  },
  watch: {},
  computed: {},
  methods: {
    import() {}
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>