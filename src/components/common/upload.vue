<template>
  <div class="upload">
    <el-upload
      ref="upload"
      :action="uploadUrl+'/system/upload'"
      :headers="headers"
      :with-credentials="true"
      :data="uploadData"
      :on-success="uploadSuccess"
      :on-remove="handleRemove"
      :file-list="fileIds"
      :on-preview="handlePreview"
    >
      <el-button v-if="needUpload" size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "upload",
  components: {},
  props: {
    module: String, //模块
    needUpload: Boolean,
    fileIds: Array,
    needDownload: Boolean
  },
  data() {
    return {
      uploadUrl: "",
      headers: {
        Authorization: window.sessionStorage.getItem("token")
      },
      uploadData: {}
    };
  },
  watch: {
    fileIds: function(newValue, oldValue) {
      //每当fileIds的值改变则发送事件update:word , 并且把值传过去
      this.$emit("update:fileIds", newValue);
    }
  },
  computed: {},
  methods: {
    uploadSuccess(response, file, fileList) {
      if (response.success) {
        this.fileIds.push(response.obj.id);
        console.log(file);
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
    handleRemove(file, fileList) {
      var url = "/system/file/" + file.response.obj.id;
      this.axios.delete(url).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg,
            center: true
          });
          this.fileIds.splice(this.fileIds.indexOf(file.response.obj.id), 1);
        } else {
          this.$message({
            type: "error",
            message: res.msg,
            center: true
          });
        }
      });
    },
    handlePreview(file) {
      var url = "/system/download";
      if (this.needDownload) {
        this.Utils.downloadFile(url, { id: this.fileId });
      }
    }
  },
  created() {
    this.uploadUrl = this.Utils.getUrl();
    this.uploadData.module = this.module;
  },
  mounted() {}
};
</script>
<style scoped>
</style>