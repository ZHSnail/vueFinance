<template>
  <div class="assetsRegReq">
    <my-pageheader titleContent="固定资产登记申请"></my-pageheader>
    <my-collapse title="资产信息" class="leftAlign">
      <el-form
        ref="assetsRegForm"
        :rules="rules"
        :model="assetsRegForm"
        label-width="110px"
        :status-icon="true"
        size="small"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="资产名称" prop="name">
              <el-input class="length" v-model="assetsRegForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="编号" prop="assetsCode">
              <el-input class="length" v-model="assetsRegForm.assetsCode"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="规格" prop="norms">
              <el-input class="length" v-model="assetsRegForm.norms"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="原价值（元）" prop="orival">
              <el-input class="length" v-model.number="assetsRegForm.orival"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数量" prop="num">
              <el-input class="length" v-model.number="assetsRegForm.num"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="残值率（%）" prop="salvage">
              <el-input class="length" v-model.number="assetsRegForm.salvage"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="清理费用" prop="cleanCost">
              <el-input class="length" v-model="assetsRegForm.cleanCost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预计使用年限" prop="usefulLife">
              <el-input class="length" v-model.number="assetsRegForm.usefulLife"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入库地点" prop="storagePlace">
              <el-input class="length" v-model="assetsRegForm.storagePlace"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="入库日期" prop="storageTime">
              <el-date-picker
                v-model="assetsRegForm.storageTime"
                align="right"
                type="date"
                style="width:220px"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="取得方式" prop="obtainMeth">
              <el-select class="length" clearable v-model="assetsRegForm.obtainMeth" placeholder="请选择取得方式">
                <el-option
                  v-for="item in obtainMethList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产类别" prop="kindId">
             <el-select class="length" clearable v-model="assetsRegForm.kindId" placeholder="请选择资产类别">
                <el-option
                  v-for="item in obtainMethList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="折旧方法" prop="depreMeth">
              <el-input class="length" v-model="assetsRegForm.depreMeth"></el-input>
            </el-form-item> 
          </el-col>
           <el-col :span="8">
            <el-form-item label="备注" prop="memo">
              <el-input class="length" v-model="assetsRegForm.memo"></el-input>
            </el-form-item>      
          </el-col>       
        </el-row>
      </el-form>
    </my-collapse>
    <div class="rightAlign">
      <el-button type="primary" @click="save()">暂存</el-button>
      <el-button type="primary" @click="commit('staffForm')">提交</el-button>
    </div>
  </div>
</template>

<script>
import tools from "@/commonJs/searchTools.js";
export default {
  name: "assetsRegReq",
  components: {},
  props: {},
  data() {
    return {
      assetsRegForm: {
        name: "",//资产名称
        assetsCode: "",//资产编号
        norms: "", //规格
        salvage:"",//残值率
        orival: "", //原价值
        num: "", //数量
        cleanCost: "", //清理费用
        usefulLife: "", //预计使用年限
        storagePlace: "", //入库地点
        storageTime: "", //入库时间
        obtainMeth: "", //取得方式
        kindId:"",//资产类别
        memo:"",//备注
        depreMeth:"",//折旧方法
      },
      pickerOptions: tools.pickerOptionsDay,
      obtainMethList: [
        {
          id: "1",
          name: "采购",
          value: "PURCHASE"
        },
        {
          id: "2",
          name: "租赁",
          value: "LEASE"
        },
        {
          id: "3",
          name: "研制转入",
          value: "DEVELOPMENT"
        },
        {
          id: "4",
          name: "基建转入",
          value: "INFRASTRUCTURE"
        },
        {
          id: "5",
          name: "接受捐赠",
          value: "DONATIONS"
        },
        {
          id: "6",
          name: "外部调入",
          value: "EXTERNAL"
        },
        {
          id: "7",
          name: "盘盈",
          value: "INVENTORY"
        },
        {
          id: "8",
          name: "合作建所方投入",
          value: "COOPERATIVE"
        },
        {
          id: "9",
          name: "融资租入",
          value: "FINANCING"
        },
        {
          id: "10",
          name: "其他",
          value: "OTHER"
        }
      ],
      rules:{
        name: [
          { required: true, message: "请输入资产名称", trigger: "blur" }
        ],
        assetsCode: [
          { required: true, message: "请输入资产编号", trigger: "blur" }
        ],
        orival: [
          { required: true, message: "请输入原价值", trigger: "blur" },
          { type: "number", message: "原价值必须为数字值" }
        ],
        num: [
          { required: true, message: "请输入数量", trigger: "blur" },
          { type: "number", message: "数量必须为数字值" }
        ],
        usefulLife: [
          { required: true, message: "请输入预计使用年限", trigger: "blur" },
          { type: "number", message: "预计使用年限必须为数字值" }
        ],
        salvage: [
          { required: true, message: "请输入残值率", trigger: "blur" },
          { type: "number", message: "残值率必须为数字值" }
        ],
        depreMeth:[
          { required: true, message: "请选择折旧方法", trigger: "change" }
        ],
        kindId:[
          { required: true, message: "请选择资产类别", trigger: "change" }
        ],
        obtainMeth:[
          { required: true, message: "请选择取得方式", trigger: "change" }
        ],
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    save(formName) {
      var formRefs = [this.$refs["assetsRegForm"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          alert("submit");
        } else {
          alert("error");
        }
      });
    },
    commit(formName) {},
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.length {
  width: 220px;
}
</style>