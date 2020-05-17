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
      :file-list="viewFileList"
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
      uploadData: {},
      viewFileList: []
    };
  },
  watch: {
    fileIds: function(newValue, oldValue) {
      //每当fileIds的值改变则发送事件update:word , 并且把值传过去
      this.$emit("update:fileIds", newValue);
      if(oldValue.length==0){
        this.viewFile();
      }
    }
  },
  computed: {},
  methods: {
    uploadSuccess(response, file, fileList) {
      if (response.success) {
        this.fileIds.push(response.obj.id);
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
      var url = "/system/file/";
      if (file.response) {
        url = url + file.response.obj.id;
      } else {
        url = url + file.id;
      }
      this.axios.delete(url).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg,
            center: true
          });
          if (file.response) {
            this.fileIds.splice(this.fileIds.indexOf(file.response.obj.id), 1);
          } else {
            this.fileIds.splice(this.fileIds.indexOf(file.id), 1);
          }
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
        this.Utils.downloadFile(url, { id: file.response?file.response.obj.id: file.id});
      }
    },
    viewFile(){
      var url = "/system/viewFile";
      var data = {
        fileIds: this.fileIds
      };
      this.axios.post(url, data).then(res => {
        this.viewFileList = res.obj;
      });
    }
  },
  created() {
    this.uploadUrl = this.Utils.getUrl();
    this.uploadData.module = this.module;
    if (this.fileIds.length > 0) {
      this.viewFile();
    }
  },
  mounted() {
  }
};
</script>
<style scoped>
</style>