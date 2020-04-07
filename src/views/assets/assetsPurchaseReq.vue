<template>
  <div class="assetsPurchaseReq">
    <my-pageheader titleContent="固定资产采购申请"></my-pageheader>
    <my-collapse title="申请信息" class="leftAlign">
      <el-form
        ref="reqForm"
        :rules="reqRules"
        :model="assetsPurchaseForm"
        :status-icon="true"
        label-width="120px"
        size="small"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请日期" prop="reqDate">
              <el-date-picker
                v-model="assetsPurchaseForm.reqDate"
                align="right"
                type="date"
                style="width:250px"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="采购方式" prop="purchaseMeth">
              <el-select
                class="length"
                clearable
                v-model="assetsPurchaseForm.purchaseMeth"
                placeholder="采购方式"
              >
                <el-option
                  v-for="item in purchaseMethList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="采购说明" prop="purchaseMemo">
              <el-input class="length" v-model="assetsPurchaseForm.purchaseMemo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </my-collapse>
    <my-collapse title="资产清单" :total="total+''" totalTitle="申请金额合计" class="leftAlign">
      <el-row>
        <el-col :span="24" class="rightAlign">
          <el-button type="primary" @click="addAssets" class="addButton" size="small">新增</el-button>
        </el-col>
      </el-row>
      <el-form
        ref="assetsForm"
        label-width="120px"
        :model="assetsPurchaseForm"
        :status-icon="true"
        size="small"
      >
        <div v-for="(assets,index) in assetsPurchaseForm.assetsList" :key="assets.id">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="资产类别"
                :prop="'assetsList.' + index + '.kindId'"
                :rules="assetsRules.kindId"
              >
                <el-select class="length" clearable placeholder="请选择资产类别" v-model="assets.kindId">
                  <el-option
                    v-for="item in purchaseMethList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="资产名称"
                :prop="'assetsList.' + index + '.name'"
                :rules="assetsRules.name"
              >
                <el-input class="length" v-model="assets.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="规格" :prop="'assetsList.' + index + '.norms'">
                <el-input class="length" v-model="assets.norms"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="数量"
                :prop="'assetsList.' + index + '.num'"
                :rules="assetsRules.num"
              >
                <el-input
                  class="length"
                  @change="getTotalAmount(index,'num')"
                  v-model.number="assets.num"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="单价（元）"
                :prop="'assetsList.' + index + '.orival'"
                :rules="assetsRules.orival"
              >
                <el-input
                  class="length"
                  @change="getTotalAmount(index,'orival')"
                  v-model.number="assets.orival"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="预计金额（元）"
                :prop="'assetsList.' + index + '.totalAmount'"
                :rules="assetsRules.totalAmount"
              >
                <el-input class="length" v-model.number="assets.totalAmount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="rightAlign">
            <el-button type="danger" @click="deleteAssets(index)" size="small">删除</el-button>
          </div>
          <el-divider></el-divider>
        </div>
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
  name: "assetsPurchaseReq",
  components: {},
  props: {},
  data() {
    return {
      assetsPurchaseForm: {
        reqDate: "",
        purchaseMeth: "",
        purchaseMemo: "",
        assetsList: [
          {
            kindId: "", //资产类别
            name: "", //资产名称
            norms: "", //规格
            orival: "", //原价值
            num: "", //数量
            totalAmount: ""
          }
        ]
      },
      reqRules: {
        reqDate: [
          { required: true, message: "请选择申请日期", trigger: "change" }
        ],
        purchaseMeth: [
          { required: true, message: "请选择采购方式", trigger: "change" }
        ],
        purchaseMemo: [
          { required: true, message: "请输入采购说明", trigger: "blur" }
        ]
      },
      pickerOptions: tools.pickerOptionsDay,
      purchaseMethList: [
        {
          id: "1",
          name: "公开招标",
          value: "OPEN_TENDER"
        },
        {
          id: "2",
          name: "定点采购",
          value: "FIXED_PURCHASE"
        },
        {
          id: "3",
          name: "院内招标",
          value: "HOSPITAL_TENDER"
        },
        {
          id: "4",
          name: "协议供货",
          value: "PROTOCOL_SUPPLY"
        },
        {
          id: "5",
          name: "网上竞价",
          value: "ONLINE_AUCTION"
        },
        {
          id: "6",
          name: "网上商城",
          value: "E-SHOP"
        }
      ],
      assetsRules: {
        name: [{ required: true, message: "请输入资产名称", trigger: "blur" }],
        orival: [
          { required: true, message: "请输入单价", trigger: "blur" },
          { type: "number", message: "单价必须为数字值" }
        ],
        num: [
          { required: true, message: "请输入数量", trigger: "blur" },
          { type: "number", message: "数量必须为数字值" }
        ],
        kindId: [
          { required: true, message: "请选择资产类别", trigger: "change" }
        ],
        totalAmount: [
          { required: true, message: "请输入预计金额（元）", trigger: "blur" },
          { type: "number", message: "预计金额（元）必须为数字值" }
        ]
      },
    };
  },
  watch: {
    tempAmount: function(newVal, oldVal) {
      console.log(newVal);
      console.log(oldVal);
    }
  },
  computed: {
    total:function(){
      var temp = 0;
      this.assetsPurchaseForm.assetsList.forEach(item=>{
        temp +=item.totalAmount
      })
      return temp;
    }
  },
  methods: {
    addAssets() {
      var assets = {
        kindId: "", //资产类别
        name: "", //资产名称
        norms: "", //规格
        orival: "", //原价值
        num: "", //数量
        totalAmount: ""
      };
      this.assetsPurchaseForm.assetsList.push(assets);
    },
    deleteAssets(index) {
      if (this.total != 0) {
        this.total -= this.assetsPurchaseForm.assetsList[index].totalAmount;
      }
      this.assetsPurchaseForm.assetsList.splice(index, 1);
    },
    getTotalAmount(index, arg) {
      if (typeof this.assetsPurchaseForm.assetsList[index][arg] == "number") {
        this.assetsPurchaseForm.assetsList[index].totalAmount =
          this.assetsPurchaseForm.assetsList[index].num *
          this.assetsPurchaseForm.assetsList[index].orival;
      } else {
        this.assetsPurchaseForm.assetsList[index][arg] = 0;
        this.assetsPurchaseForm.assetsList[index].totalAmount = 0;
      }
    },
   
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.addButton {
  margin-bottom: 10px;
}
.totalArea {
  font-weight: bold;
  font-size: large;
}
.money {
  margin-left: 5px;
}
</style>