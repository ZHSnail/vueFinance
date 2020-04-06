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
      width="400px"
    >
      <div>
        <searchForm style="width:500px" :formOptions="formOptions" btnItems="search"></searchForm>
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
        <el-table-column align="center" prop="code" label="会计科目编码"></el-table-column>
        <el-table-column align="center" prop="name" label="会计科目名称"></el-table-column>
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
    placeholder:String
  },
  data() {
    return {
      accountList: [
        { id: "1", name: "行政收入", code: "4001" },
        { id: "2", name: "现金", code: "1001" },
        { id: "3", name: "行政收入", code: "4001" },
        { id: "4", name: "现金", code: "1001" }
      ],
      account: this.value,
      show: false,
      showList: [], //展示列表
      total: 200,
      pageSize: 10,
      style: {
        height: "40px",
        width:this.width
      },
      formOptions: [
        {
          label: "名称或编码", // label文字
          prop: "name", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入会计科目名称或者会计科目编码" // elementui组件属性
        }
      ]
    };
  },
  watch: {
    showList: function(newVal, oldVal) {
      //说明是添加
      if (newVal.length % 2 == 0) {
        if (newVal.length == 2 || newVal.length == 1) {
          this.style.height = 40 + "px";
        }
        if (newVal.length / 2 != 1) {
          this.style.height = (newVal.length / 2) * 22 + 40 + "px";
        }
      }
    }
  },
  computed: {},
  methods: {
    open() {
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
          this.showList.push(val.name);
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
          var Obj = this.Utils.findObj(this.accountList, "name", item);
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
    handlePageChange(val) {},
    handleSelectionChange(val) {
      if (val.length > 0) {
        this.showList = [];
        this.account = [];
        val.forEach(item => {
          this.account.push(item.id);
          this.showList.push(item.name);
        });
      }
    }
  },
  created() {
    this.showList = [];
    if (this.ismultiple) {
      this.account.forEach(item => {
        var Obj = this.Utils.findObj(this.accountList, "id", item);
        if (Obj) {
          this.showList.push(Obj.name);
        }
      });
    } else {
      var Obj = this.Utils.findObj(this.accountList, "id", this.account);
      if (Obj) {
        this.showList.push(Obj.name);
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>