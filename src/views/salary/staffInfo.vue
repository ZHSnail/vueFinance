<template>
  <div class="staffInfo">
    <div>
      <my-pageheader titleContent="职工详情" :needButton="true">
        <el-dropdown trigger="click" @command="handleCommand">
          <el-button type="primary">
            更多
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="addStaff">新增员工</el-dropdown-item>
            <el-dropdown-item command="importStaff">导入员工</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </my-pageheader>
    </div>
    <div>
      <searchForm  class="test" :formOptions="formOptions" btnItems="search,export"></searchForm>
    </div>
    <el-table
      cell-class-name="centerAlign"
      :data="tableData"
      stripe
      style="width: 100%"
      max-height="380"
    >
      <el-table-column align="center" fixed prop="name" label="名称"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别" width="50"></el-table-column>
      <el-table-column align="center" label="学历" prop="degree" width="50"></el-table-column>
      <el-table-column align="center" prop="cardNumber" label="证件号码" width="250"></el-table-column>
      <el-table-column align="center" prop="entryDate" label="入职日期" width="100"></el-table-column>
      <el-table-column align="center" prop="bankName" label="银行账户" width="120">
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
      <el-table-column align="center" label="所属部门" prop="org" width="120"></el-table-column>
      <el-table-column align="center" label="职工分类" prop="staffType" width="120"></el-table-column>
      <el-table-column align="center" label="岗位" prop="station" width="100"></el-table-column>
      <el-table-column align="center" label="职称" prop="postTitle" width="120"></el-table-column>
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
          postTitle: "助教",
          org:"人事处",
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
          postTitle: "",
          org:"人事处",
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
          postTitle: "",
          org:"人事处",
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
          postTitle: "助教",
          org:"人事处",
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
          postTitle: "助教",
          org:"人事处",
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
          postTitle: "助教",
          org:"人事处",
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
          postTitle: "助教",
          org:"人事处",
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
          postTitle: "助教",
          org:"人事处",
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
          postTitle: "助教",
          org:"人事处",
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
          label: "部门", // label文字
          prop: "org", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "请选择部门", // elementui组件属性
          options: [
            { label: "人事部", value: "1" },
            { label: "校长办公室", value: "2" }
          ]
        }
        ,
        {
          label: "职工分类", // label文字
          prop: "staffType", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "请选择职工分类", // elementui组件属性
          options: [
            { label: "教师类", value: "1" },
            { label: "高级管理类", value: "2" }
          ]
        },
        {
          element:"el-date-picker",
          label:"入职日期",
          type:"daterange",
          prop: "entryDate", // 字段名
        }
      ],
      total: 200,
      pageSize: 10
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleCommand(command) {
        if(command == "addStaff"){
          this.$router.push({ path: "staffAdd" });
        }
        if(command == "importStaff"){
           this.$message('click on item ' + command);
        }
    },
    handleCurrentChange(){
      
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>

</style>