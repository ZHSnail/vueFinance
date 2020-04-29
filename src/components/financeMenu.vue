<template>
  <div class="financeMenu">
    <el-menu :collapse="isCollapse" :unique-opened="false">
      <el-row>
        <el-col :span="24" class="centerAlign">
          <el-tooltip effect="light" :content="foldMsg" placement="right">
            <el-button
              style="margin-top: 10px"
              @click="changeCollapse"
              :icon="foldIcon"
              circle
              type="info"
            ></el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-postcard"></i>
          <span slot="title">收费管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/finance/charge/payOnline" tag="div">
            <el-menu-item index="1-1">
              <template slot="title">
                <i class="el-icon-money"></i>
                <span slot="title">在线缴费</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/charge/payNoticeList" tag="div">
            <el-menu-item index="1-2">
              <template slot="title">
                <i class="el-icon-search"></i>
                <span slot="title">收费查询</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/charge/feeKind" tag="div">
            <el-menu-item index="1-3">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">类别管理</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/charge/dormInfo" tag="div">
            <el-menu-item index="1-4">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">宿舍管理</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/charge/professionInfo" tag="div">
            <el-menu-item index="1-5">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">专业管理</span>
              </template>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-coin"></i>
          <span slot="title">工资管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/finance/salary/settleWageInfo" tag="div">
            <el-menu-item index="2-1">
              <template slot="title">
                <i class="el-icon-wallet"></i>
                <span slot="title">结算工资</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/salary/taxInfo" tag="div">
            <el-menu-item index="2-2">
              <template slot="title">
                <i class="el-icon-set-up"></i>
                <!-- 税率也写到工资设置里面 -->
                <span slot="title">税金表查看</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/salary/payStubInfo" tag="div">
            <el-menu-item index="2-3">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <!-- 税率也写到工资设置里面 -->
                <span slot="title">工资单管理</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/salary/staffInfo" tag="div">
            <el-menu-item index="2-4">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <!-- 税率也写到工资设置里面 -->
                <span slot="title">职工管理</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/salary/stationInfo" tag="div">
            <el-menu-item index="2-5">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <!-- 税率也写到工资设置里面 -->
                <span slot="title">岗位管理</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/salary/salaryInfo" tag="div">
            <el-menu-item index="2-6">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <!-- 税率也写到工资设置里面 -->
                <span slot="title">工资项管理</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/salary/payRollSetInfo" tag="div">
            <el-menu-item index="2-7">
              <template slot="title">
                <i class="el-icon-fin-office-supplies-fill"></i>
                <!-- 税率也写到工资设置里面 -->
                <span slot="title">职工工资配置</span>
              </template>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-office-building"></i>
          <span slot="title">固定资产管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/finance/assets/assetsRegList" tag="div">
            <el-menu-item index="3-1">
              <template slot="title">
                <i class="el-icon-document-add"></i>
                <span slot="title">资产登记</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/assets/assetsChgReq" tag="div">
            <el-menu-item index="3-2">
              <template slot="title">
                <i class="el-icon-document-copy"></i>
                <span slot="title">资产变动</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/assets/depreciatedList" tag="div">
            <el-menu-item index="3-3">
              <template slot="title">
                <i class="el-icon-sold-out"></i>
                <span slot="title">计提折旧</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/assets/assetsKind" tag="div">
            <el-menu-item index="3-4">
              <template slot="title">
                <i class="el-icon-document-add"></i>
                <span slot="title">资产类别</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/assets/assetsRegQuery" tag="div">
            <el-menu-item index="3-5">
              <template slot="title">
                <i class="el-icon-document-add"></i>
                <span slot="title">资产登记综合查询</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/assets/assetsPurchaseList" tag="div">
            <el-menu-item index="3-6">
              <template slot="title">
                <i class="el-icon-document-add"></i>
                <span slot="title">资产采购</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/assets/assetsPurchaseQuery" tag="div">
            <el-menu-item index="3-7">
              <template slot="title">
                <i class="el-icon-document-add"></i>
                <span slot="title">资产采购综合查询</span>
              </template>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-notebook-1"></i>
          <span slot="title">凭证管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/finance/voucher/voucherQuery" tag="div">
            <el-menu-item index="4-1">
              <template slot="title">
                <i class="el-icon-collection"></i>
                <span slot="title">凭证查询</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/voucher/voucherPosting" tag="div">
            <el-menu-item index="4-2">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span slot="title">凭证过账</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/voucher/voucherList" tag="div">
            <el-menu-item index="4-3">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span slot="title">凭证录入</span>
              </template>
            </el-menu-item>
          </router-link>
          <el-menu-item index="4-4">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span slot="title">凭证审核</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-check"></i>
          <span slot="title">出纳管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/finance/cashier/dailyHandle" tag="div">
            <el-menu-item index="5-1">
              <template slot="title">
                <i class="el-icon-view"></i>
                <span slot="title">日常处理</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/cashier/settleAccount" tag="div">
            <el-menu-item index="5-2">
              <template slot="title">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">出纳扎账</span>
              </template>
            </el-menu-item>
          </router-link>
          <el-menu-item index="5-3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">初始设置</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-connection"></i>
          <span slot="title">总账管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/finance/lender/accountBalance" tag="div">
            <el-menu-item index="6-1">
              <template slot="title">
                <i class="el-icon-thumb"></i>
                <span slot="title">会计科目余额表</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/lender/accountDetail" tag="div">
            <el-menu-item index="6-2">
              <template slot="title">
                <i class="el-icon-box"></i>
                <!-- 查询分析也里面 -->
                <span slot="title">会计科目明细账</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/lender/accountThreeCol" tag="div">
            <el-menu-item index="6-3">
              <template slot="title">
                <i class="el-icon-box"></i>
                <!-- 查询分析也里面 -->
                <span slot="title">科目三栏式明细账</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/lender/accountInfo" tag="div">
            <el-menu-item index="6-4">
              <template slot="title">
                <i class="el-icon-box"></i>
                <!-- 查询分析也里面 -->
                <span slot="title">会计科目</span>
              </template>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span slot="title">报表管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="7-1">
            <template slot="title">
              <i class="el-icon-data-analysis"></i>
              <span slot="title">年度报表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="67-2">
            <template slot="title">
              <i class="el-icon-data-board"></i>
              <span slot="title">报表查询</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="8-1">
            <template slot="title">
              <i class="el-icon-s-operation"></i>
              <span slot="title">初始设置</span>
            </template>
          </el-menu-item>
          <router-link to="/finance/system/test" tag="div">
            <el-menu-item index="8-2">
              <template slot="title">
                <i class="el-icon-date"></i>
                <span slot="title">日志管理</span>
              </template>
            </el-menu-item>
          </router-link>
          <el-menu-item index="8-3">
            <template slot="title">
              <i class="el-icon-data-line"></i>
              <span slot="title">系统监控</span>
            </template>
          </el-menu-item>
          <el-menu-item index="8-4">
            <template slot="title">
              <i class="el-icon-set-up"></i>
              <span slot="title">权限管理</span>
            </template>
          </el-menu-item>
          <router-link to="/finance/activity/design" tag="div">
            <el-menu-item index="8-5">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span slot="title">流程设计</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/activity/activityInfo" tag="div">
            <el-menu-item index="8-6">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span slot="title">流程管理</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/finance/system/roleInfo" tag="div">
            <el-menu-item index="8-7">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span slot="title">角色管理</span>
              </template>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "financeMenu",
  components: {},
  props: {},
  data() {
    return {
      isCollapse: false,
      foldMsg: "折叠菜单",
      foldIcon: "el-icon-s-fold"
    };
  },
  watch: {},
  computed: {},
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
      //如果是折叠菜单
      if (this.isCollapse) {
        this.foldMsg = "展开菜单";
        this.foldIcon = "el-icon-s-unfold";
      } else {
        this.foldMsg = "折叠菜单";
        this.foldIcon = "el-icon-s-fold";
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>