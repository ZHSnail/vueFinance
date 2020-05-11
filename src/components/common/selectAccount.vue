<template>
  <div class="selectAccount">
    <div class="el-select">
      <div class="el-select__tags">
        <span>
          <span
            v-for="item in showList"
            v-bind:key="item"
            class="el-tag el-tag--info el-tag--small el-tag--light"
          >
            <span class="el-select__tags-text">{{item}}</span>
            <i class="el-tag__close el-icon-close" @click="closeItem(item)"></i>
          </span>
        </span>
      </div>
      <div class="el-input el-input--suffix">
        <input
          @click="open"
          class="el-input__inner"
          readonly
          :style="style"
          :placeholder="placeholder"
        />
        <span class="el-input__suffix">
            <span class="el-input__suffix-inner">
              <i class="el-input__icon el-icon-fin-waihuishuju"></i>
            </span>
        </span>
      </div>
    </div>
    <el-dialog
      title="选择会计科目"
      @open="query"
      :visible.sync="show"
      center
      append-to-body
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <div>
        <searchForm :formOptions="formOptions"  @onSearch="search" btnItems="search"></searchForm>
      </div>
      <el-table
        ref="singleTable"
        cell-class-name="centerAlign"
        highlight-current-row
        :data="accountList"
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" v-if="ismultiple" width="55"></el-table-column>
        <el-table-column align="center" prop="type" label="科目类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 'ASSETS'">资产类</span>
          <span v-if="scope.row.type == 'COST'">成本类</span>
          <span v-if="scope.row.type == 'EXPENSES'">费用类</span>
          <span v-if="scope.row.type == 'LIABILITIES'">负债类</span>
          <span v-if="scope.row.type == 'OWNER'">所有者权益类</span>
          <span v-if="scope.row.type == 'INCOME'">收入类</span>
        </template>
      </el-table-column>
        <el-table-column align="center" prop="code" label="会计科目编码"></el-table-column>
        <el-table-column align="center" prop="accountName" label="会计科目名称"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer" v-if="ismultiple">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="save()">确 定</el-button>
      </div>
      <el-col :span="24">
        <el-pagination
          background
          @current-change="handlePageChange"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total"
          class="centerAlign"
          :current-page.sync="pageNum"
          small
          :hide-on-single-page="true"
        ></el-pagination>
      </el-col>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "selectAccount",
  components: {},
  props: {
    ismultiple: Boolean,
    value: {
      type: [Array, String]
    },
    width:String,
    placeholder:String,
    height:String,
  },
  data() {
    return {
      accountList: [],
      account: this.value,
      show: false,
      showList: [], //展示列表
      style: {
        height:(this.height ? this.height : 40)+'px' ,
        width:this.width
      },
      formOptions: [
        {
          label: "科目名称", // label文字
          prop: "accountName", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入科目名称" // elementui组件属性
        },
        {
          label: "科目编码", // label文字
          prop: "code", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入科目编码" // elementui组件属性
        },
        {
          label: "科目类型", // label文字
          prop: "type", // 字段名
          element: "el-select", // 指定elementui组件
          placeholder: "请选择科目类型", // elementui组件属性
          options: [
            {label:"资产类",value:"ASSETS"},
            {label:"成本类",value:"COST"},
            {label:"费用类",value:"EXPENSES"},
            {label:"负债类",value:"LIABILITIES"},
            {label:"所有者权益类",value:"OWNER"},
            {label:"收入类",value:"INCOME"},
          ],
        }
      ],
      pageSize: 10,
      total: 0,
      pageNum:1,
      searchVal:{
        accountName: "",
        code: "",
        type:""
      },
    };
  },
  watch: {
    showList: function(newVal, oldVal) {
      //说明是添加
      if (newVal.length % 2 == 0) {
        if (newVal.length == 2 || newVal.length == 1) {
          this.style.height = (this.height ? this.height : 40) + "px";
        }
        if (newVal.length / 2 != 1) {
          if((newVal.length / 2) * 22 == 0){
            this.style.height =  (this.height ? this.height : 40) + "px";
          }else{
            this.style.height = (newVal.length / 2) * 22 + (this.height ? this.height : 40) + "px";
          }
        }
      }
    }
  },
  computed: {},
  methods: {
    open() {
      this.search();
      this.show = !this.show;
    },
    query() {
      if (this.ismultiple) {
        this.$nextTick(() => {
          this.$refs.singleTable.clearSelection();
        });
      } else {
        this.$nextTick(() => {
          this.$refs.singleTable.setCurrentRow();
        });
      }
    },
    handleCurrentChange(val) {
      if (val) {
        if (this.ismultiple) {
          this.$refs.singleTable.toggleRowSelection(val);
        } else {
          this.showList = [];
          this.showList.push(val.accountName);
          this.account = val.id;
          this.$emit("input", this.account);
          this.show = !this.show;
        }
      }
    },
    closeItem(item) {
      this.showList.pop(item);
      if (this.ismultiple) {
        this.account = [];
        this.showList.forEach(item => {
          var Obj = this.Utils.findObj(this.accountList, "accountName", item);
          this.account.push(Obj.id);
        });
        this.$emit("input", this.account);
      } else {
        this.account = "";
        this.$emit("input", this.account);
      }
      this.show = false;
    },
    save() {
      this.$emit("input", this.account);
      this.show = !this.show;
    },
    handleSelectionChange(val) {
      if (val.length > 0) {
        this.showList = [];
        this.account = [];
        val.forEach(item => {
          this.account.push(item.id);
          this.showList.push(item.accountName);
        });
      }
    },
    search(val) {
      var url = "/lender/allAccount";
      var data = val ? JSON.stringify(val) : "";
      if(val){
        this.searchVal = this.Utils.copyObj(val);
      }
      this.axios.get(url, { params: { params: data } }).then(res => {
        if (res.success) {
          this.accountList = res.obj.list;
          this.pageNum = res.obj.pageNum;
          this.total = res.obj.total;
        }
      });
    },
    handlePageChange(val) {
      this.pageNum = val;
      var data = this.Utils.copyObj(this.searchVal);
      data.pageNum = val;
      this.search(data);
    },
  },
  created() {
    this.showList = [];
    if (this.ismultiple) {
      this.account.forEach(item => {
        var Obj = this.Utils.findObj(this.accountList, "id", item);
        if (Obj) {
          this.showList.push(Obj.accountName);
        }
      });
    } else {
      var Obj = this.Utils.findObj(this.accountList, "id", this.account);
      if (Obj) {
        this.showList.push(Obj.accountName);
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>

</style>