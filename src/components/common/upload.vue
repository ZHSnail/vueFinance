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
    needUpload:Boolean,
  },
  data() {
    return {
      uploadUrl: "",
      headers: {
        Authorization: window.sessionStorage.getItem("token")
      },
      uploadData: {},
      fileId: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
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
     handleRemove(file, fileList) {
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