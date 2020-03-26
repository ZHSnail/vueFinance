<template>
  <div class="payStubAdd">
    <my-pageheader :titleContent="title"></my-pageheader>
    <my-collapse title="基本信息" class="leftAlign">
      <el-form ref="payStubForm" :rules="rules" :model="payStubForm" :status-icon="true">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model.number="payStubForm.name" class="length"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="适用范围" prop="scope">
              <el-select class="length" clearable placeholder="请选择适用范围" v-model="payStubForm.scope">
                <el-option
                  v-for="item in staffkind"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </my-collapse>
    <my-collapse title="工资项设置" class="leftAlign">
      <el-row>
        <el-col :span="12">
           <div class="el-form-item">
          <label for="username" class="el-form-item__label">基本工资设置</label>
           <el-input v-model="name" class="length"></el-input>
          </div> 
        </el-col>
        <el-col :span="12"><el-button type="primary">设置计算项</el-button></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
           <div class="el-form-item">
          <label for="username" class="el-form-item__label">浮动工资设置</label>
           <el-input v-model="name" class="length"></el-input>
          </div> 
        </el-col>
        <el-col :span="12"><el-button type="primary">设置计算项</el-button></el-col>
      </el-row>
    </my-collapse>
    <div class="rightAlign">
      <el-button type="primary" @click="save()">暂存</el-button>
      <el-button type="primary" @click="commit('staffForm')">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "payStubAdd",
  components: {},
  props: {},
  data() {
    return {
      title: "",
      payStubForm: {
        name: "",
        scope: ""
      },
      staffkind: [
        {
          id: "1",
          name: "高级管理类"
        },
        {
          id: "2",
          name: "教师类"
        },
        {
          id: "3",
          name: "职能管理类"
        },
        {
          id: "4",
          name: "其它类"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    if (this.$route.params.id != undefined) {
      this.title = "编辑工资单";
    } else {
      this.title = "添加工资单";
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>