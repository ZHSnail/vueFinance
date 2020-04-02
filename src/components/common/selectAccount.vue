<template>
  <div class="selectAccount">
    <el-popover v-model="show" @show="open" width="400" trigger="click">
      <h3 class="centerAlign">选择会计科目</h3>
      <el-table
        ref="singleTable"
        cell-class-name="centerAlign"
        highlight-current-row
        :data="accountList"
        @current-change="handleCurrentChange"
        style="width: 100%"
      >
        <el-table-column align="center" prop="code" label="会计科目编码"></el-table-column>
        <el-table-column align="center" prop="name" label="会计科目名称"></el-table-column>
      </el-table>
      <div class="el-select" slot="reference">
        <div class="el-select__tags">
          <span>
            <span class="el-tag el-tag--info el-tag--small el-tag--light">
              <span class="el-select__tags-text">564</span>
            </span>
          </span>
        </div>
        <div class="el-input el-input--suffix">
          <el-input clearable></el-input>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "selectAccount",
  components: {},
  props: {
    ismultiple: Boolean
  },
  data() {
    return {
      accountList: [
        { id: "1", name: "行政收入", code: "4001" },
        { id: "2", name: "现金", code: "1001" }
      ],
      account: "",
      show: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    test() {
      this.show = !this.show;
    },
    open() {
      this.$refs.singleTable.setCurrentRow();
    },
    handleCurrentChange(val) {
      if (val) {
        this.show = !this.show;
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>