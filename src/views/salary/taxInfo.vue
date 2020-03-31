<template>
  <div class="taxInfo">
       <my-pageheader titleContent="个人所得税税率表"></my-pageheader>
      <el-table
        cell-class-name="centerAlign"
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column align="center" prop="stage" label="级数"></el-table-column>
        <el-table-column align="center" prop="cate" label="累计预扣预缴应纳税所得额"></el-table-column>
        <el-table-column align="center" prop="prededuRate" label="预扣率（%）"></el-table-column>
        <el-table-column align="center" label="速算扣除数">
          <template slot-scope="scope">
            <span>{{scope.row.quickAmount}}元</span>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  name:'taxInfo',
  components:{},
  props:{},
  data(){
    return {
        tableData:[
            {
                id:"1",
                stage:"1",
                cate:"不超过36,000元的部分",
                prededuRate:"3",//预扣率
                quickAmount:0,
            },
            {
                id:"2",
                stage:"2",
                cate:"超过36,000元至144,000元的部分",
                prededuRate:"10",//预扣率
                quickAmount:2520,
            },
            {
                id:"3",
                stage:"3",
                cate:"超过144,000元至300,000元的部分",
                prededuRate:"20",//预扣率
                quickAmount:16920,
            },
            {
                id:"4",
                stage:"4",
                cate:"超过300,000元至420,000元的部分",
                prededuRate:"25",//预扣率
                quickAmount:31920,
            },
            {
                id:"5",
                stage:"5",
                cate:"超过420,000元至660,000元的部分",
                prededuRate:"30",//预扣率
                quickAmount:52920,
            },
            {
                id:"6",
                stage:"6",
                cate:"超过660,000元至960,000元的部分",
                prededuRate:"35",//预扣率
                quickAmount:85920,
            },
            {
                id:"7",
                stage:"7",
                cate:"超过960,000元的部分",
                prededuRate:"45",//预扣率
                quickAmount:181920,
            },
        ]
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style scoped>
</style>