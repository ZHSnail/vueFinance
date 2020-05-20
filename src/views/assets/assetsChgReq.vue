<template>
  <div class="assetsChgReq">
    <my-pageheader titleContent="固定资产变动申请"></my-pageheader>
    <my-collapse title="变动申请" class="leftAlign">
      <el-form
        ref="chgReqForm"
        :rules="chgReqRules"
        :model="assetsChgForm"
        :status-icon="true"
        size="small"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请人" prop="createrName">
              <el-input class="length" readonly v-model="assetsChgForm.createrName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="变动说明" prop="memo">
              <el-input class="length" v-model="assetsChgForm.memo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </my-collapse>
    <my-collapse title="资产清单" class="leftAlign">
      <el-row>
        <select-assets-reg @getVal="getVal" :is-change="true"></select-assets-reg>
      </el-row>
      <el-form
        ref="assetsReqForm"
        :rules="assetsRules"
        :model="assetsChgForm"
        :status-icon="true"
        label-width="110px"
        size="small"
      >
        <el-collapse v-model="activeNames">
          <el-collapse-item
            v-for="(assetsReg,index) in assetsChgForm.assetsList"
            :key="assetsReg.id"
            :name="index"
          >
            <template slot="title">
              <div class="title">{{assetsReg.name}}</div>
            </template>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="资产名称"
                  :prop="'assetsList.' + index + '.name'"
                  :rules="assetsRules.name"
                >
                  <el-input class="length" v-model="assetsReg.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="编号"
                  :prop="'assetsList.' + index + '.code'"
                  :rules="assetsRules.code"
                >
                  <el-input class="length" v-model="assetsReg.code"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="规格"
                  :prop="'assetsList.' + index + '.norms'"
                  :rules="assetsRules.norms"
                >
                  <el-input class="length" v-model="assetsReg.norms"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="原价值（元）"
                  :prop="'assetsList.' + index + '.orival'"
                  :rules="assetsRules.orival"
                >
                  <el-input readonly class="length" v-model.number="assetsReg.orival"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="数量"
                  :prop="'assetsList.' + index + '.num'"
                  :rules="assetsRules.num"
                >
                  <el-input readonly class="length" v-model.number="assetsReg.num"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="残值率（%）"
                  :prop="'assetsList.' + index + '.salvage'"
                  :rules="assetsRules.salvage"
                >
                  <el-input readonly class="length" v-model.number="assetsReg.salvage"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="清理费用"
                  :prop="'assetsList.' + index + '.cleanCost'"
                  :rules="assetsRules.cleanCost"
                >
                  <el-input class="length" v-model="assetsReg.cleanCost"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="预计使用年限"
                  :prop="'assetsList.' + index + '.usefulLife'"
                  :rules="assetsRules.usefulLife"
                >
                  <el-input readonly class="length" v-model.number="assetsReg.usefulLife"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="入库地点"
                  :prop="'assetsList.' + index + '.storagePlace'"
                  :rules="assetsRules.storagePlace"
                >
                  <el-input class="length" v-model="assetsReg.storagePlace"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="入库日期"
                  :prop="'assetsList.' + index + '.storageTime'"
                  :rules="assetsRules.storageTime"
                >
                  <el-date-picker
                    v-model="assetsReg.storageTime"
                    align="right"
                    type="date"
                    style="width:220px"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="取得方式"
                  :prop="'assetsList.' + index + '.obtainMethod'"
                  :rules="assetsRules.obtainMethod"
                >
                  <el-select
                    class="length"
                    clearable
                    disabled
                    v-model="assetsReg.obtainMethod"
                    placeholder="请选择取得方式"
                  >
                    <el-option
                      v-for="item in obtainMethodList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="资产类别"
                  :prop="'assetsList.' + index + '.assetsKindId'"
                  :rules="assetsRules.assetsKindId"
                >
                  <el-select
                    class="length"
                    clearable
                    v-model="assetsReg.assetsKindId"
                    placeholder="请选择资产类别"
                    disabled
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
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="折旧方法"
                  :prop="'assetsList.' + index + '.depreMethod'"
                  :rules="assetsRules.depreMethod"
                >
                  <el-input readonly class="length" v-model="assetsReg.depreMethod"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="rightAlign">
              <el-button type="danger" @click="deleteAssetsReg(index)" size="small">删除</el-button>
            </div>
            <el-divider></el-divider>
          </el-collapse-item>
        </el-collapse>
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
import selectAssetsReg from "@/views/assets/selectAssetsReg.vue";
export default {
  name: "assetsChgReq",
  components: {
    selectAssetsReg
  },
  props: {},
  data() {
    return {
      assetsChgForm: {
        createrName: "",
        memo: "",
        assetsList: []
      },
      chgReqRules: {
        memo: [{ required: true, message: "请输入变动说明", trigger: "blur" }]
      },
      pickerOptions: tools.pickerOptionsDay,
      obtainMethodList: [
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
      assetsRules: {
        code: [{ required: true, message: "请输入资产编号", trigger: "blur" }]
      },
      activeNames: [],
      assetsKindList: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    addAssets() {},
    getVal(val) {
      if(typeof this.$route.params.id != "undefined"){
        val.forEach(item=>{
          this.assetsChgForm.assetsList.push(item)
        })
      }else{
        this.assetsChgForm.assetsList = this.Utils.copyObj(val);
      }
      this.assetsChgForm.assetsList.forEach(item => {
        item.salvage = item.salvage * 100;
      });
      this.arrangeActive();
    },
    deleteAssetsReg(index) {
      this.assetsChgForm.assetsList.splice(index, 1);
      this.arrangeActive();
    },
    arrangeActive() {
      this.activeNames = [];
      for (var i = 0; i < this.assetsChgForm.assetsList.length; i++) {
        this.activeNames.push(i);
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
      data = this.Utils.copyObj(this.assetsChgForm);
      data.assetsList.forEach(item => {
        item.salvage = item.salvage / 100;
        item.num = parseFloat(item.num);
        item.usefulLife = parseFloat(item.usefulLife);
        item.storageTime = this.Utils.timestampToDate(item.storageTime);
      });
      return data;
    },
    save() {
      var data = this.arrangeData();
      this.axios.post("/assets/saveAssetsChange", data).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg,
            center: true
          });
          this.$router.push({ path: "/finance/assets/assetsChgList" });
        }
      });
    },
    commit(formName) {
      if (this.assetsChgForm.assetsList.length == 0) {
        this.$message({
          type: "error",
          message: "资产清单不能为空！！",
          center: true
        });
      } else {
        var formRefs = [this.$refs["chgReqForm"], this.$refs["assetsReqForm"]];
        this.Utils.checkForm(formRefs).then(res => {
          if (res) {
            var data = this.arrangeData();
            this.axios.post("/assets/commitAssetsChange", data).then(res => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: res.msg,
                  center: true
                });
                this.$router.push({
                  path: "/finance/assets/assetsChgList"
                });
              }
            });
          }
        });
      }
    },
    initData(id) {
      var url = "/assets/assetsChange/" + id;
      this.axios.get(url).then(res => {
        if (res.success) {
          var temp = {};
          temp = this.Utils.copyObj(res.obj);
          temp.assetsList.forEach(item => {
            item.num = parseFloat(item.num);
            item.orival = parseFloat(item.orival);
          });
          this.assetsChgForm = this.Utils.copyObj(temp);
        }
      });
    }
  },
  created() {
    this.findAssetsKindList();
    if (typeof this.$route.params.id != "undefined") {
      this.showDeleteButton = true;
      this.initData(this.$route.params.id);
    } else {
      this.userInfo = this.Utils.getUser();
      this.assetsChgForm.createrName = this.userInfo.name;
    }
  },
  mounted() {}
};
</script>
<style scoped>
.addButton {
  margin-bottom: 10px;
}
.length {
  width: 220px;
}
.assetsChgReq >>> .el-collapse-item__wrap {
  background-color: #f2f6fc;
}
.title {
  font-size: xx-large;
  text-align: left;
  font-weight: bold;
}
</style>