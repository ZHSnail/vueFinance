<template>
  <div class="selectPostWage">
    <el-dialog
      :title="title"
      @open="query"
      :visible.sync="show"
      center
      :close-on-click-modal="false"
    >
      <div>
        <searchForm :formOptions="formOptions" btnItems="search"></searchForm>
      </div>
      <el-table
        ref="singleTable"
        cell-class-name="centerAlign"
        highlight-current-row
        :data="tableData"
        @current-change="handleCurrentChange"
        style="width: 100%"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column align="center" label="等级">
                  <template slot-scope="scope">{{scope.row.level}}级</template>
        </el-table-column>
        <el-table-column align="center" prop="amount" label="工资标准">
          <template slot-scope="scope">{{scope.row.amount}}元</template>
        </el-table-column>
      </el-table>
      <el-row>
      <el-col :span="24">
        <el-pagination
          background
          @current-change="handlePageChange"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total"
          class="centerAlign"
          :hide-on-single-page="true"
        ></el-pagination>
      </el-col>
    </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "selectPostWage",
  components: {},
  props: {
    isShow: Boolean,
    staffId: String,
    title:String,
    type:String,
  },
  data() {
    return {
      show: false,
      tableData: [
        {
          id: 1,
          level: "1",
          amount: 220,
          
        },
        {
          id: 2,
          level: "2",
          amount: 220,
        },
        {
          id: 3,
          level: "3",
          amount: 220,
        },
        {
          id: 4,
          level: "4",
          amount: 220,
        }
      ],
      formOptions: [
        {
          label: "名称", // label文字
          prop: "name", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入名称" // elementui组件属性
        }
      ],
      total: 200,
      pageSize: 10
    };
  },
  watch: {
    show: function(newValue, oldValue) {
      //每当show的值改变则发送事件update:word , 并且把值传过去
      this.$emit("update:isShow", newValue);
    }
  },
  computed: {},
  methods: {
    setCurrent(row) {},
    query() {
      //TODO 根据类别查找工资单
      this.$nextTick(() => {
        this.$refs.singleTable.setCurrentRow();
      });
      console.log(this.staffId);
    },
    handleCurrentChange(val) {
      //TODO 存到数据库里面
      if (val) {
        this.show = !this.show;
      }
    },
    handlePageChange(page){

    }
  },
  created() {
  },
  mounted() {
    this.$watch("isShow", function(newVal, oldVal) {
      this.show = newVal;
    });
  }
};
</script>
<style scoped>
</style>