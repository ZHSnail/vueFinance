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
            <el-form-item label="申请人" prop="reqStaff">
              <el-input class="length" readonly v-model="assetsChgForm.reqStaff"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="变动说明" prop="changeMemo">
              <el-input class="length" v-model="assetsChgForm.changeMemo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </my-collapse>
    <my-collapse title="资产清单" class="leftAlign">
      <el-row>
        <select-assets-reg @getVal="getVal"></select-assets-reg>
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
            v-for="(assetsReg,index) in assetsChgForm.assetsRegList"
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
                  :prop="'assetsRegList.' + index + '.name'"
                  :rules="assetsRules.name"
                >
                  <el-input class="length" v-model="assetsReg.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="编号"
                  :prop="'assetsRegList.' + index + '.assetsCode'"
                  :rules="assetsRules.assetsCode"
                >
                  <el-input class="length" v-model="assetsReg.assetsCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="规格"
                  :prop="'assetsRegList.' + index + '.norms'"
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
                  :prop="'assetsRegList.' + index + '.orival'"
                  :rules="assetsRules.orival"
                >
                  <el-input class="length" v-model.number="assetsReg.orival"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="数量"
                  :prop="'assetsRegList.' + index + '.num'"
                  :rules="assetsRules.num"
                >
                  <el-input class="length" v-model.number="assetsReg.num"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="残值率（%）"
                  :prop="'assetsRegList.' + index + '.salvage'"
                  :rules="assetsRules.salvage"
                >
                  <el-input class="length" v-model.number="assetsReg.salvage"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="清理费用"
                  :prop="'assetsRegList.' + index + '.cleanCost'"
                  :rules="assetsRules.cleanCost"
                >
                  <el-input class="length" v-model="assetsReg.cleanCost"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="预计使用年限"
                  :prop="'assetsRegList.' + index + '.usefulLife'"
                  :rules="assetsRules.usefulLife"
                >
                  <el-input class="length" v-model.number="assetsReg.usefulLife"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="入库地点"
                  :prop="'assetsRegList.' + index + '.storagePlace'"
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
                  :prop="'assetsRegList.' + index + '.storageTime'"
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
                  :prop="'assetsRegList.' + index + '.obtainMeth'"
                  :rules="assetsRules.obtainMeth"
                >
                  <el-select
                    class="length"
                    clearable
                    v-model="assetsReg.obtainMeth"
                    placeholder="请选择取得方式"
                  >
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
                <el-form-item
                  label="资产类别"
                  :prop="'assetsRegList.' + index + '.kindId'"
                  :rules="assetsRules.kindId"
                >
                  <el-select
                    class="length"
                    clearable
                    v-model="assetsReg.kindId"
                    placeholder="请选择资产类别"
                  >
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
                <el-form-item
                  label="折旧方法"
                  :prop="'assetsRegList.' + index + '.depreMeth'"
                  :rules="assetsRules.depreMeth"
                >
                  <el-input class="length" v-model="assetsReg.depreMeth"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="备注"
                  :prop="'assetsRegList.' + index + '.memo'"
                  :rules="assetsRules.memo"
                >
                  <el-input class="length" v-model="assetsReg.memo"></el-input>
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
        reqStaff: "",
        changeMemo: "",
        assetsRegList: []
      },
      chgReqRules: {
          changeMemo:[{ required: true, message: "请输入变动说明", trigger: "blur" }],
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
      assetsRules: {
        name: [{ required: true, message: "请输入资产名称", trigger: "blur" }],
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
        depreMeth: [
          { required: true, message: "请选择折旧方法", trigger: "change" }
        ],
        kindId: [
          { required: true, message: "请选择资产类别", trigger: "change" }
        ],
        obtainMeth: [
          { required: true, message: "请选择取得方式", trigger: "change" }
        ]
      },
      activeNames: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    addAssets() {},
    getVal(val) {
      this.assetsChgForm.assetsRegList = this.Utils.copyObj(val);
      this.arrangeActive();
    },
    deleteAssetsReg(index) {
      this.assetsChgForm.assetsRegList.splice(index, 1);
      this.arrangeActive();
    },
    arrangeActive() {
      this.activeNames = [];
      for (var i = 0; i < this.assetsChgForm.assetsRegList.length; i++) {
        this.activeNames.push(i);
      }
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