<template>
  <div class="selectPayStub">
    <el-dialog
      title="选择工资单"
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
        <el-table-column align="center" prop="name" label="名称"></el-table-column>
        <el-table-column align="center" prop="deduct" label="扣减项"></el-table-column>
        <el-table-column align="center" prop="shouldPaid" label="应发项"></el-table-column>
        <el-table-column align="center" prop="unitPay" label="单位缴纳"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "selectPayStub",
  components: {},
  props: {
    isShow: Boolean,
    scope: String
  },
  data() {
    return {
      show: false,
      tableData: [
        {
          id: 1,
          name: "教师类工资单",
          deduct: ["餐费补贴"],
          shouldPaid: ["住房补贴"],
          unitPay: ["交通补贴", "交通补贴"]
        },
        {
          id: 2,
          deduct: ["餐费补贴"],
          shouldPaid: ["住房补贴"],
          unitPay: ["交通补贴", "交通补贴"],
          name: "高级管理类工资单"
        },
        {
          id: 3,
          deduct: ["餐费补贴"],
          shouldPaid: ["住房补贴"],
          unitPay: ["交通补贴", "交通补贴"],
          name: "职能管理类工资单"
        },
        {
          id: 4,
          deduct: ["餐费补贴"],
          shouldPaid: ["住房补贴"],
          unitPay: ["交通补贴", "交通补贴"],
          name: "其他类工资单"
        }
      ],
      formOptions: [
        {
          label: "名称", // label文字
          prop: "name", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入名称" // elementui组件属性
        }
      ]
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
      console.log(this.scope);
    },
    handleCurrentChange(val) {
      //TODO 存到数据库里面
      if (val) {
        this.show = !this.show;
      }
    }
  },
  created() {
    console.log(this.$refs.singleTable);
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