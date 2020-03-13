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
      <el-table-column type="index" fixed align="center" label="序号"></el-table-column>
      <el-table-column align="center" fixed prop="name" label="名称"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别" width="50"></el-table-column>
      <el-table-column align="center" label="学历" prop="degree"></el-table-column>
      <el-table-column align="center" prop="cardNumber" label="证件号码"></el-table-column>
      <el-table-column align="center" prop="entryDate" label="入职日期"></el-table-column>
      <el-table-column align="center" prop="bankName" label="账户信息">
        <template slot-scope="scope">
          <el-popover placement="top" width="500" trigger="click">
            <el-table :data="scope.row.bankList">
              <el-table-column property="accountType" label="账户类型"></el-table-column>
              <el-table-column property="accountName" label="户名"></el-table-column>
              <el-table-column property="accountNumber" label="账号"></el-table-column>
              <el-table-column property="bankName" label="银行名"></el-table-column>
              <el-table-column property="subbranch" label="支行名"></el-table-column>
            </el-table>
            <el-link slot="reference" type="primary" icon="el-icon-view" :underline="false">查看详情</el-link>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属部门" prop="staffType"></el-table-column>
      <el-table-column align="center" label="职工分类" prop="staffType"></el-table-column>
      <el-table-column align="center" label="岗位" prop="station"></el-table-column>
      <el-table-column align="center" label="职称" prop="postTitle"></el-table-column>
      <el-table-column align="center" label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="light" content="编辑" placement="bottom">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                circle
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
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
          bankList: [
            {
              bankName: "建设银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "工商银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "兴业银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            }
          ],
          staffType: "教师类",
          station: "教授",
          postTitle: "助教"
        },
        {
          id: "2",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankList: [
            {
              bankName: "建设银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "工商银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "兴业银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            }
          ],
          staffType: "高级管理类",
          station: "校长",
          postTitle: ""
        },
        {
          id: "3",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankList: [
            {
              bankName: "建设银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "工商银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "兴业银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            }
          ],
          staffType: "职能管理类",
          station: "人事处处长",
          postTitle: ""
        },
        {
          id: "4",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankList: [
            {
              bankName: "建设银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "工商银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "兴业银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            }
          ],
          staffType: "其他类",
          station: "校车司机",
          postTitle: ""
        },
        {
          id: "5",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankList: [
            {
              bankName: "建设银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "工商银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "兴业银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            }
          ],
          staffType: "教师类",
          station: "教授",
          postTitle: "助教"
        },
        {
          id: "6",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankList: [
            {
              bankName: "建设银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "工商银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "兴业银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            }
          ],
          staffType: "教师类",
          station: "教授",
          postTitle: "助教"
        },
        {
          id: "7",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankList: [
            {
              bankName: "建设银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "工商银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "兴业银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            }
          ],
          staffType: "教师类",
          station: "教授",
          postTitle: "助教"
        },
        {
          id: "8",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankList: [
            {
              bankName: "建设银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "工商银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "兴业银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            }
          ],
          staffType: "教师类",
          station: "教授",
          postTitle: "助教"
        },
        {
          id: "9",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankList: [
            {
              bankName: "建设银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "工商银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "兴业银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            }
          ],
          staffType: "教师类",
          station: "教授",
          postTitle: "助教"
        },
        {
          id: "10",
          name: "张三",
          sex: "男",
          degree: "本科",
          entryDate: "2018-01-02",
          cardNumber: "668489794654654987654654",
          state: "启用",
          bankList: [
            {
              bankName: "建设银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "工商银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            },
            {
              bankName: "兴业银行",
              accountNumber: "123456789",
              subbranch: "广州分行",
              accountName: "张三",
              accountType: "工资卡"
            }
          ],
          staffType: "教师类",
          station: "教授",
          postTitle: "助教"
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