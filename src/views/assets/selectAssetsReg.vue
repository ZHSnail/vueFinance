<template>
  <div class="selectAssetsReg">
    <el-row>
      <el-col :span="24" class="rightAlign">
        <el-button type="primary" @click="addAssets" class="addButton" size="small">添加资产</el-button>
      </el-col>
    </el-row>
    <el-dialog
      title="添加资产清单"
      :visible.sync="dialogFormVisible"
      width="800px"
      :close-on-click-modal="false"
      @open="open"
      center
    >
      <div>
        <searchForm :formOptions="formOptions" btnItems="search"></searchForm>
      </div>
      <el-checkbox-group v-model="checkList">
        <el-checkbox class="checkbox" v-for="item in assetsRegList" v-bind:key="item.id" :label="item">
          <el-card shadow="hover" style="width:750px">
            <row>
              <template slot="left"><span style="font-size: medium;font-weight: bold;">{{item.name}}</span></template>
            </row>
            <row>
              <template slot="left">资产编号：{{item.assetsCode}}</template>
              <template slot="right">资产类别：{{item.kindId}}</template>
            </row>
            <row>
              <template slot="left">原价值：{{item.orival}}</template>
              <template slot="right">备注：{{item.memo}}</template>
            </row>
          </el-card>
        </el-checkbox>
      </el-checkbox-group>
      <el-row>
        <el-col :span="24">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            small
            layout="prev, pager, next, jumper"
            :total="total"
            class="centerAlign"
            :hide-on-single-page="true"
          ></el-pagination>
        </el-col>
      </el-row>
      <div slot="footer" class="rightAlign">
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "selectAssetsReg",
  components: {},
  props: {
    ignoreIds: Array
  },
  data() {
    return {
      dialogFormVisible: false,
      total: 200,
      pageSize: 10,
      formOptions: [
        {
          label: "名称", // label文字
          prop: "name", // 字段名
          element: "el-input", // 指定elementui组件
          placeholder: "请输入名称" // elementui组件属性
        }
      ],
      checkList: [],
      assetsRegList: [
        {
          id: "1",
          name: "资产名称", //资产名称
          assetsCode: "资产编号", //资产编号
          norms: "规格", //规格
          salvage: "12", //残值率
          orival: "500", //原价值
          num: "2", //数量
          cleanCost: "56", //清理费用
          usefulLife: "4", //预计使用年限
          storagePlace: "入库地点", //入库地点
          storageTime: "2016021314", //入库时间
          obtainMeth: "取得方式", //取得方式
          kindId: "资产类别", //资产类别
          memo: "备注", //备注
          depreMeth: "折旧方法" //折旧方法
        },
        {
          id: "2",
          name: "资产名称", //资产名称
          assetsCode: "资产编号", //资产编号
          norms: "规格", //规格
          salvage: "12", //残值率
          orival: "500", //原价值
          num: "2", //数量
          cleanCost: "56", //清理费用
          usefulLife: "4", //预计使用年限
          storagePlace: "入库地点", //入库地点
          storageTime: "2016021314", //入库时间
          obtainMeth: "取得方式", //取得方式
          kindId: "资产类别", //资产类别
          memo: "备注", //备注
          depreMeth: "折旧方法" //折旧方法
        },
        {
          id: "3",
          name: "资产名称", //资产名称
          assetsCode: "资产编号", //资产编号
          norms: "规格", //规格
          salvage: "12", //残值率
          orival: "500", //原价值
          num: "2", //数量
          cleanCost: "56", //清理费用
          usefulLife: "4", //预计使用年限
          storagePlace: "入库地点", //入库地点
          storageTime: "2016021314", //入库时间
          obtainMeth: "取得方式", //取得方式
          kindId: "资产类别", //资产类别
          memo: "备注", //备注
          depreMeth: "折旧方法" //折旧方法
        },
        {
          id: "4",
          name: "资产名称", //资产名称
          assetsCode: "资产编号", //资产编号
          norms: "规格", //规格
          salvage: "12", //残值率
          orival: "500", //原价值
          num: "2", //数量
          cleanCost: "56", //清理费用
          usefulLife: "4", //预计使用年限
          storagePlace: "入库地点", //入库地点
          storageTime: "2016021314", //入库时间
          obtainMeth: "取得方式", //取得方式
          kindId: "资产类别", //资产类别
          memo: "备注", //备注
          depreMeth: "折旧方法" //折旧方法
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    addAssets() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    handleCurrentChange(val){
    },
    save(){
        this.dialogFormVisible = !this.dialogFormVisible;
        this.$emit("getVal",this.checkList);
    },
    open(){
        this.checkList=[]
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.addButton {
  margin-bottom: 10px;
}
.selectAssetsReg >>> .el-checkbox__label {
  display: block;
}
.selectAssetsReg >>> .el-card {
  border-radius: 0px;
}
.checkbox{
    padding-top: 5px
}
</style>