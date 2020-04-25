<template>
  <div class="voucherReq">
    <my-pageheader titleContent="凭证录入"></my-pageheader>
    <my-collapse title="凭证信息" class="leftAlign">
      <el-form
        label-width="90px"
        ref="form"
        :rules="rules"
        :model="voucherReqForm"
        :status-icon="true"
        size="small"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="制单人" prop="originator">
              <el-input class="length" readonly v-model="voucherReqForm.originator"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="记账日期" prop="bizDate">
              <el-date-picker
                v-model="voucherReqForm.bizDate"
                align="right"
                type="date"
                style="width:250px"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="摘要" prop="voucherMemo">
              <el-input class="length" v-model="voucherReqForm.voucherMemo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="会计期间" prop="accountPeriod">
              <el-input class="length" v-model="voucherReqForm.accountPeriod"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务类型" prop="bizType">
              <el-input class="length" v-model="voucherReqForm.bizType"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="交易类型">
              <el-radio-group v-model="voucherReqForm.dealType">
                <el-radio label="OTHER">其他业务</el-radio>
                <el-radio label="CASH">现金业务</el-radio>
                <el-radio label="BANK">银行业务</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </my-collapse>
    <my-collapse title="分录信息" class="leftAlign">
      <el-row>
        <el-col :span="24" class="rightAlign">
          <el-button type="primary" @click="addEntry" class="addButton" size="small">新增</el-button>
        </el-col>
      </el-row>
      <el-form
        ref="voucherReqForm"
        label-width="90px"
        :model="voucherReqForm"
        :status-icon="true"
        size="small"
      >
        <div v-for="(entry,index) in voucherReqForm.entryList" :key="entry.id">
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="借方科目"
                :prop="'entryList.' + index + '.debitAccount'"
                :rules="rules.debitAccount"
              >
                <select-account v-model="entry.debitAccount" height="32" width="250px"></select-account>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="借方金额"
                :prop="'entryList.' + index + '.debitAmount'"
                :rules="rules.debitAmount"
              >
                <el-input class="length" v-model.number="entry.debitAmount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="贷方科目"
                :prop="'entryList.' + index + '.creditAccount'"
                :rules="rules.creditAccount"
              >
                <select-account v-model="entry.creditAccount" height="32" width="250px"></select-account>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="贷方金额"
                :prop="'entryList.' + index + '.creditAmount'"
                :rules="rules.creditAmount"
              >
                <el-input class="length" v-model.number="entry.creditAmount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="rightAlign">
            <el-button type="danger" @click="deleteEntry(index)" size="small">删除</el-button>
          </div>
          <el-divider></el-divider>
        </div>
      </el-form>
    </my-collapse>
    <my-collapse title="附件信息" class="leftAlign">
      <el-form :model="voucherReqForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="附件">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
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
  name: "voucherReq",
  components: {},
  props: {},
  data() {
    return {
      voucherReqForm: {
        originator: "",
        postingDate: "",
        voucherMemo: "",
        entryList: [
          {
            debitAccount: "",
            creditAccount: "",
            debitAmount: "",
            creditAmount: ""
          }
        ],
        accountPeriod: "",
        bizType: "",
        dealType: "OTHER",
        bizDate:""
      },
      rules: {
        postingDate: [
          { required: true, message: "请选择记账日期", trigger: "change" }
        ],
        voucherMemo: [
          { required: true, message: "请输入摘要", trigger: "blur" }
        ],
        debitAccount: [
          { required: true, message: "请选择借方科目", trigger: "change" }
        ],
        creditAccount: [
          { required: true, message: "请选择贷方科目", trigger: "change" }
        ],
        debitAmount: [
          { required: true, message: "请输入借方金额", trigger: "blur" },
          { type: "number", message: "借方金额必须为数字值" }
        ],
        creditAmount: [
          { required: true, message: "请输入贷方金额", trigger: "blur" },
          { type: "number", message: "贷方金额必须为数字值" }
        ]
      },
      pickerOptions: tools.pickerOptionsDay,
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    addEntry() {
      var entry = {
        debitAccount: "",
        creditAccount: "",
        debitAmount: "",
        creditAmount: ""
      };
      this.voucherReqForm.entryList.push(entry);
    },
    deleteEntry(index) {
      this.voucherReqForm.entryList.splice(index, 1);
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
</style>