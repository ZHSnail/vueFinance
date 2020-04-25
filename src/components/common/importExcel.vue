<template>
  <div class="importExcel">
    <el-dialog
      :title="title"
      :visible.sync="show"
      center
      :close-on-click-modal="false"
      width="35%"
      @close="handleClose()"
    >
      <el-row>
        <el-col :span="24" style="margin-bottom: 10px;">
          <el-button size="small" type="primary" @click="downLoad">下载模板文件</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-upload
            ref="upload"
            :action="uploadUrl+'/system/easyUpload'"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-error="handError"
            :headers="headers"
            :limit="1"
            :on-exceed="exceed"
            :on-success="uploadSuccess"
            :with-credentials="true"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              :disabled="!canImport"
              @click="importFile"
            >导入</el-button>
            <div slot="tip" class="el-upload__tip">请先下载模板文件</div>
          </el-upload>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "importExcel",
  components: {},
  props: {
    isShow: Boolean,
    title: String,
    templateName: String,
  },
  data() {
    return {
      show: false,
      uploadUrl: "",
      headers: {
        Authorization: window.sessionStorage.getItem("token")
      },
      canImport: false,
      fileId: "",
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
    handleClose() {
        this.$refs['upload'].clearFiles();
    },
    downLoad() {
      var url = "/system/downloadTemplate";
      this.Utils.downloadFile(url, { name: this.templateName });
    },
    exceed() {
      this.$message({
        type: "error",
        message: "只允许上传一个文件！！",
        center: true
      });
    },
    importFile() {
        this.$emit('importFile',this.fileId);
    },
    uploadSuccess(response, file, fileList) {
      if (response.success) {
        this.fileId = response.obj.id;
        this.canImport = true;
        this.$message({
          type: "success",
          message: "上传文件成功",
          center: true
        });
      } else {
        this.$message({
          type: "error",
          message: "上传文件失败,原因:" + response.msg,
          center: true
        });
      }
    },
    handError(err, file, fileList) {
      this.$message({
        type: "error",
        message: err,
        center: true
      });
    },
    handleRemove(file, fileList) {
      this.canImport = false;
      if (
        this.fileId != "" &&
        this.fileId != undefined &&
        this.fileId != null
      ) {
        var url = "/system/file/" + this.fileId;
        this.axios.delete(url).then(res => {
          if (res.success) {
            this.$message({
              type: "success",
              message: res.msg,
              center: true
            });
          } else {
            this.$message({
              type: "error",
              message: res.msg,
              center: true
            });
          }
        });
        this.fileId ="";
      }
    },
    handlePreview(file) {
      var url = "/system/download";
      this.Utils.downloadFile(url, { id: this.fileId });
    }
  },
  created() {
    this.uploadUrl = this.Utils.getUrl();
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