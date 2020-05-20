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
            <el-form-item label="申请日期" prop="reqTime">
              <el-date-picker
                v-model="assetsPurchaseForm.reqTime"
                align="right"
                type="date"
                style="width:220px"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="采购方式" prop="purchaseMethod">
              <el-select
                class="length"
                clearable
                v-model="assetsPurchaseForm.purchaseMethod"
                placeholder="采购方式"
              >
                <el-option
                  v-for="item in purchaseMethodList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="采购说明" prop="memo">
              <el-input class="length" v-model="assetsPurchaseForm.memo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="借方会计科目" prop="debitAccountId">
              <select-account :account-id="assetsPurchaseForm.debitAccountId" v-model="assetsPurchaseForm.debitAccountId" height="32" width="220px"></select-account>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="贷方会计科目" prop="creditAccountId">
              <select-account :account-id="assetsPurchaseForm.creditAccountId" v-model="assetsPurchaseForm.creditAccountId" height="32" width="220px"></select-account>
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
                :prop="'assetsList.' + index + '.assetsKindId'"
                :rules="assetsRules.assetsKindId"
              >
                <el-select
                  class="length"
                  clearable
                  placeholder="请选择资产类别"
                  v-model="assets.assetsKindId"
                >
                  <el-option
                    v-for="item in assetsKindList"
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
                <el-input readonly class="length" v-model.number="assets.totalAmount"></el-input>
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
        reqTime: "",
        purchaseMethod: "",
        memo: "",
        debitAccountId:"",
        creditAccountId:"",
        assetsList: [
          {
            assetsKindId: "", //资产类别
            name: "", //资产名称
            norms: "", //规格
            orival: "", //原价值
            num: "", //数量
            totalAmount: ""
          }
        ]
      },
      reqRules: {
        reqTime: [
          { required: true, message: "请选择申请日期", trigger: "change" }
        ],
        purchaseMethod: [
          { required: true, message: "请选择采购方式", trigger: "change" }
        ],
        memo: [{ required: true, message: "请输入采购说明", trigger: "blur" }]
      },
      pickerOptions: tools.pickerOptionsDay,
      purchaseMethodList: [
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
          value: "E_SHOP"
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
        assetsKindId: [
          { required: true, message: "请选择资产类别", trigger: "change" }
        ]
      },
      assetsKindList: [],
      show:false,
    };
  },
  watch: {},
  computed: {
    total: function() {
      var temp = 0;
      this.assetsPurchaseForm.assetsList.forEach(item => {
        temp += item.totalAmount;
      });
      return temp;
    }
  },
  methods: {
    addAssets() {
      var assets = {
        assetsKindId: "", //资产类别
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
    findAssetsKindList() {
      var url = "/assets/assetsKinds";
      this.axios.get(url).then(res => {
        if (res.success) {
          this.assetsKindList = res.obj;
        }
      });
    },
    arrangeData() {
      var data = {};
      data = this.Utils.copyObj(this.assetsPurchaseForm);
      data.reqTime = this.Utils.timestampToDate(
        this.assetsPurchaseForm.reqTime
      );
      data.totalAmt = this.total;
      return data;
    },
    save() {
      var data = this.arrangeData();
      this.axios.post("/assets/saveAssetsPurchase", data).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg,
            center: true
          });
          this.$router.push({ path: "/finance/assets/assetsPurchaseList" });
        }
      });
    },
    commit(formName) {
      if (this.assetsPurchaseForm.assetsList.length == 0) {
        this.$message({
          type: "error",
          message: "资产清单不能为空！！",
          center: true
        });
      } else {
        var formRefs = [this.$refs["reqForm"],this.$refs["assetsForm"]];
        this.Utils.checkForm(formRefs).then(res => {
          if (res) {
            var data = this.arrangeData();
            this.axios.post("/assets/commitAssetsPurchase", data).then(res => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: res.msg,
                  center: true
                });
                this.$router.push({
                  path: "/finance/assets/assetsPurchaseList"
                });
              }
            });
          }
        });
      }
    },
    initData(id) {
      var url = "/assets/assetsPurchase/" + id;
      this.axios.get(url).then(res => {
        if (res.success) {
          var temp = {};
          temp = this.Utils.copyObj(res.obj);
          temp.assetsList.forEach(item => {
            item.num = parseFloat(item.num);
            item.orival = parseFloat(item.orival);
            item.totalAmount = item.num * item.orival;
          });
          this.assetsPurchaseForm  = this.Utils.copyObj(temp);
          this.$set(this.assetsPurchaseForm,"debitAccountId",res.obj.debitAccountId);
          this.$set(this.assetsPurchaseForm,"creditAccountId",res.obj.creditAccountId);
        }
      });
    }
  },
  created() {
    this.findAssetsKindList();
    if (typeof this.$route.params.id != "undefined") {
      this.showDeleteButton = true;
      this.initData(this.$route.params.id);
    }
  },
  mounted() {},
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
.length {
  width: 220px;
}
</style>