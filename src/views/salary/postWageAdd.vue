<template>
  <div class="postWageAdd">
    <my-pageheader :titleContent="titleContent"></my-pageheader>
    <my-collapse title="基本信息" class="leftAlign">
      <el-form ref="postWageForm" :rules="rules" :model="postWageForm" :status-icon="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="岗位工资标准" prop="stationAmount">
              <el-input v-model.number="postWageForm.stationAmount" class="length"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="岗位工资级数" prop="stationStage">
              <el-input v-model.number="postWageForm.stationStage" class="length"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="岗位工资级差" prop="stationGrad">
              <el-input v-model.number="postWageForm.stationGrad" class="length"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="薪级工资标准" prop="scaleAmount">
              <el-input v-model.number="postWageForm.scaleAmount" class="length"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="薪级工资级数" prop="scaleStage">
              <el-input v-model.number="postWageForm.scaleStage" class="length"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="薪级工资级差" prop="scaleGrad">
              <el-input v-model.number="postWageForm.scaleGrad" class="length"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </my-collapse>
    <my-collapse title="岗位工资" v-if="activeStation">
      <el-table cell-class-name="centerAlign" size="mini" :data="stationSalaryData" border  style="width: 100%">
        <el-table-column align="center" prop="type" label="类别"></el-table-column>
        <el-table-column align="center" prop="level" label="等级"></el-table-column>
        <el-table-column align="center" label="工资标准">
          <template slot-scope="scope">
            <span>{{scope.row.amount+"元"}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
      <el-col :span="24">
        <el-pagination
          background
          @current-change="handleStationChange"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="postWageForm.stationStage"
          class="centerAlign"
          :hide-on-single-page="true"
        ></el-pagination>
      </el-col>
    </el-row>
    </my-collapse>
    <my-collapse title="薪级工资" v-if="activeScale">
      <el-table cell-class-name="centerAlign" size="mini" :data="scaleSalaryData" border  style="width: 100%">
        <el-table-column align="center" prop="type" label="类别"></el-table-column>
        <el-table-column align="center" prop="level" label="等级"></el-table-column>
        <el-table-column align="center" label="工资标准">
          <template slot-scope="scope">
            <span>{{scope.row.amount+"元"}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          background
          @current-change="handleScaleChange"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="postWageForm.scaleStage"
          class="centerAlign"
          :hide-on-single-page="true"
        ></el-pagination>
    </my-collapse>
    <div class="rightAlign">
      <el-button type="primary" @click="save()">预览工资标准表</el-button>
      <el-button type="primary" @click="commit('postWageForm')">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "postWageAdd",
  components: {},
  props: {},
  data() {
    return {
      activeStation:false,
      postWageForm: {
        type: "",
        stationAmount: "", //岗位工资标准
        stationStage: "", //岗位工资级数
        stationGrad: "", //岗位工资级差
        scaleAmount: "", //薪级工资标准
        scaleStage: "", //薪级工资级数
        scaleGrad: "", //薪级工资级差
        status: "TRUE"
      },
      titleContent: "",
      rules: {
        stationAmount: [
          { required: true, message: "请输入岗位工资标准", trigger: "blur" },
          { type: "number", message: "岗位工资标准必须为数字值" }
        ],
        stationStage: [
          { required: true, message: "请输入岗位工资级数", trigger: "blur" },
          { type: "number", message: "岗位工资级数必须为数字值" }
        ],
        stationGrad: [
          { required: true, message: "请输入岗位工资级差", trigger: "blur" },
          { type: "number", message: "岗位工资级差必须为数字值" }
        ],
        scaleAmount: [
          { required: true, message: "请输入薪级工资标准", trigger: "blur" },
          { type: "number", message: "薪级工资标准必须为数字值" }
        ],
        scaleStage: [
          { required: true, message: "请输入薪级工资级数", trigger: "blur" },
          { type: "number", message: "薪级工资级数必须为数字值" }
        ],
        scaleGrad: [
          { required: true, message: "请输入薪级工资级差", trigger: "blur" },
          { type: "number", message: "薪级工资级差必须为数字值" }
        ]
      },
      stationSalaryData: [
      ],
      scaleSalaryData:[],
      activeScale:false,
      pageSize:10,
      totalStationSalary:[],
      totalScaleSalary:[],
    };
  },
  watch: {},
  computed: {},
  methods: {
    save() {
      var formRefs = [this.$refs["postWageForm"]];
      this.Utils.checkForm(formRefs).then(res => {
        if (res) {
          this.scaleSalaryData = [];
          this.stationSalaryData = []; 
          this.totalScaleSalary = [];
          this.totalStationSalary = [];
          for(var i=0;i<this.postWageForm.stationStage;i++){
            var obj = {
              type:this.$route.params.obj.type,
            }
            obj.level = i+1;
            obj.amount = this.postWageForm.stationAmount+i*this.postWageForm.stationGrad;
            if(i<10){
              this.stationSalaryData.push(obj);
            }
            this.totalStationSalary.push(obj);
          }
          for(var j=0;j<this.postWageForm.scaleStage;j++){
            var scale = {
              type:this.$route.params.obj.type,
            }
            scale.level = j+1;
            scale.amount = this.postWageForm.scaleAmount+j*this.postWageForm.scaleGrad;
            if(j<10){
              this.scaleSalaryData.push(scale);
            }
            this.totalScaleSalary.push(scale);  
          }
          this.activeStation = true;
          this.activeScale = true;
        }
      });
    },
    handleStationChange(page){
      var pageSize = this.pageSize;
      var start = (page-1)*pageSize;
      var end = start+pageSize;
      this.stationSalaryData = this.totalStationSalary.slice(start,end);
    },
    handleScaleChange(page){
      var pageSize = this.pageSize;
      var start = (page-1)*pageSize;
      var end = start+pageSize;
      this.scaleSalaryData = this.totalScaleSalary.slice(start,end);
    },
  },
  created() {
    this.titleContent = this.$route.params.obj.type + "岗位工资管理";
    this.postWageForm = this.$route.params.obj;
  },
  mounted() {}
};
</script>
<style scoped>
.length {
  width: 200px;
}
</style>