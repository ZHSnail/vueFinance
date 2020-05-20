import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Finance from '../views/finance.vue'
import PayOnline from '../views/charge/payOnline.vue'
import PayNoticeList from '../views/charge/payNoticeList.vue'
import PayDetail from '../views/charge/payDetail.vue'
import FeeKind from '../views/charge/feeKind.vue'
import PayNoticeReq from '../views/charge/payNoticeReq.vue'
import PayNoticeDetail from '../views/charge/payNoticeDetail.vue'
import PayList from '../views/charge/payList.vue'
import StaffInfo from '../views/salary/staffInfo.vue'
import StaffAdd from '../views/salary/staffAdd.vue'
import StaffDetail from '../views/salary/staffDetail.vue'
import StationInfo from '../views/salary/stationInfo.vue'
import SalaryInfo from '../views/salary/salaryInfo.vue'
import PostWageAdd from '../views/salary/postWageAdd.vue'
import PayStubInfo from '../views/salary/payStubInfo.vue'
import TaxInfo from '../views/salary/taxInfo.vue'
import PayRollSetInfo from '../views/salary/payRollSetInfo.vue'
import SettleWageInfo from '../views/salary/settleWageInfo.vue'
import SalaryRunInfo from '../views/salary/salaryRunInfo.vue'
import SalaryDetail from '../views/salary/salaryDetail.vue'
import AssetsRegList from '../views/assets/assetsRegList.vue'
import AssetsKind from '../views/assets/assetsKind.vue'
import AssetsRegReq from '../views/assets/assetsRegReq.vue'
import AssetsRegDetail from '../views/assets/assetsRegDetail.vue'
import AssetsRegQuery from '../views/assets/assetsRegQuery.vue'
import AssetsChgReq from '../views/assets/assetsChgReq.vue'
import AssetsPurchaseList from '../views/assets/assetsPurchaseList.vue'
import AssetsPurchaseDetail from '../views/assets/assetsPurchaseDetail.vue'
import AssetsPurchaseReq from '../views/assets/assetsPurchaseReq.vue'
import AssetsPurchaseQuery from '../views/assets/assetsPurchaseQuery.vue'
import DepreciatedList from '../views/assets/depreciatedList.vue'
import DepreciatedDetail from '../views/assets/depreciatedDetail.vue'
import DepreciatedReq from '../views/assets/depreciatedReq.vue'
import VoucherList from '../views/voucher/voucherList.vue'
import VoucherDetail from '../views/voucher/voucherDetail.vue'
import VoucherQuery from '../views/voucher/voucherQuery.vue'
import VoucherReq from '../views/voucher/voucherReq.vue'
import VoucherPosting from '../views/voucher/voucherPosting.vue'
import DailyHandle from '../views/cashier/dailyHandle.vue'
import VoucherTick from '../views/cashier/voucherTick.vue'
import SettleAccount from '../views/cashier/settleAccount.vue'
import Test from '../views/system/test.vue'
import AccountInfo from '../views/lender/accountInfo.vue'
import AccountBalance from '../views/lender/accountBalance.vue'
import AccountDetail from '../views/lender/accountDetail.vue'
import AccountThreeCol from '../views/lender/accountThreeCol.vue'
import Design from '../views/activity/design.vue'
import ActivityInfo from '../views/activity/activityInfo.vue'
import RoleInfo from '../views/system/roleInfo.vue'
import DormInfo from '../views/charge/dormInfo.vue'
import ProfessionInfo from '../views/charge/professionInfo.vue'
import StudentInfo from '../views/charge/studentInfo.vue'
import PayNoticeReview from '../views/charge/payNoticeReview.vue'
import PayNoticeApprove from '../views/charge/payNoticeApprove.vue'
import AccountInit from '../views/system/accountInit.vue'
import VoucherReview from '../views/voucher/voucherReview.vue'
import VoucherApprove from '../views/voucher/voucherApprove.vue'
import AssetsRegReview from '../views/assets/assetsRegReview.vue'
import AssetsRegApprove from '../views/assets/assetsRegApprove.vue'
import AssetsPurchaseApprove from '../views/assets/assetsPurchaseApprove.vue'
import AssetsPurchaseReview from '../views/assets/assetsPurchaseReview.vue'
import DepreciatedQuery from '../views/assets/depreciatedQuery.vue'
import DepreciatedReview from '../views/assets/depreciatedReview.vue'
import DepreciatedApprove from '../views/assets/depreciatedApprove.vue'
import AssetsChgDetail from '../views/assets/assetsChgDetail.vue'
import AssetsChgList from '../views/assets/assetsChgList.vue'
import AssetsChgQuery from '../views/assets/assetsChgQuery.vue'
import AssetsChgReview from '../views/assets/assetsChgReview.vue'
import AssetsChgApprove from '../views/assets/assetsChgApprove.vue'
import OrgInfo from '../views/salary/orgInfo.vue'
Vue.use(VueRouter)

//收费管理的路由
const charge = [{
        path: 'charge/payOnline',
        name: 'chargepayOnline',
        component: PayOnline
    },
    {
        path: 'charge/payNoticeList',
        name: 'payNoticeList',
        component: PayNoticeList
    },
    {
        path: 'charge/detail/:id',
        name: 'payDetail',
        component: PayDetail
    },
    {
        path: 'charge/feeKind',
        name: 'feeKind',
        component: FeeKind
    },
    {
        path: 'charge/payNoticeReq/:id?',
        name: 'payNoticeReq',
        component: PayNoticeReq
    },
    {
        path: 'charge/payNoticeDetail/:id',
        name: 'payNoticeDetail',
        component: PayNoticeDetail
    },
    {
        path: 'charge/payList/:id',
        name: 'payList',
        component: PayList
    },
    {
        path: 'charge/dormInfo',
        name: 'dormInfo',
        component: DormInfo
    },
    {
        path: 'charge/professionInfo',
        name: 'professionInfo',
        component: ProfessionInfo
    },
    {
        path: 'charge/studentInfo',
        name: 'studentInfo',
        component: StudentInfo
    },
    {
        path: 'charge/payNoticeReview',
        name: 'payNoticeReview',
        component: PayNoticeReview
    },
    {
        path: 'charge/payNoticeApprove/:id',
        name: 'payNoticeApprove',
        component: PayNoticeApprove
    },
];
const salary = [{
        path: 'salary/staffInfo',
        name: 'staffInfo',
        component: StaffInfo
    },
    {
        path: 'salary/staffAdd/:id?',
        name: 'staffAdd',
        component: StaffAdd
    },
    {
        path: 'salary/staffDetail/:id',
        name: 'staffDetail',
        component: StaffDetail
    },
    {
        path: 'salary/stationInfo',
        name: 'stationInfo',
        component: StationInfo
    },
    {
        path: 'salary/salaryInfo',
        name: 'salaryInfo',
        component: SalaryInfo
    },
    {
        path: 'salary/postWageAdd/:id',
        name: 'postWageAdd',
        component: PostWageAdd
    },
    {
        path: 'salary/payStubInfo',
        name: 'payStubInfo',
        component: PayStubInfo
    },
    {
        path: 'salary/taxInfo',
        name: 'taxInfo',
        component: TaxInfo
    },
    {
        path: 'salary/payRollSetInfo',
        name: 'payRollSetInfo',
        component: PayRollSetInfo
    },
    {
        path: 'salary/settleWageInfo',
        name: 'settleWageInfo',
        component: SettleWageInfo
    },
    {
        path: 'salary/salaryRunInfo/:id',
        name: 'salaryRunInfo',
        component: SalaryRunInfo
    },
    {
        path: 'salary/salaryDetail/:id',
        name: 'salaryDetail',
        component: SalaryDetail
    },
    {
        path: 'salary/orgInfo',
        name: 'orgInfo',
        component: OrgInfo
    },
];
const assets = [{
        path: 'assets/assetsRegList',
        name: 'assetsRegList',
        component: AssetsRegList
    },
    {
        path: 'assets/assetsKind',
        name: 'assetsKind',
        component: AssetsKind
    },
    {
        path: 'assets/assetsRegReq/:id?',
        name: 'assetsRegReq',
        component: AssetsRegReq
    },
    {
        path: 'assets/assetsRegDetail/:id',
        name: 'assetsRegDetail',
        component: AssetsRegDetail
    },
    {
        path: 'assets/assetsRegQuery',
        name: 'assetsRegQuery',
        component: AssetsRegQuery
    },
    {
        path: 'assets/assetsChgReq/:id?',
        name: 'assetsChgReq',
        component: AssetsChgReq
    },
    {
        path: 'assets/assetsPurchaseList',
        name: 'assetsPurchaseList',
        component: AssetsPurchaseList
    },
    {
        path: 'assets/assetsPurchaseDetail/:id',
        name: 'assetsPurchaseDetail',
        component: AssetsPurchaseDetail
    },
    {
        path: 'assets/assetsPurchaseReq/:id?',
        name: 'assetsPurchaseReq',
        component: AssetsPurchaseReq
    },
    {
        path: 'assets/assetsPurchaseQuery',
        name: 'assetsPurchaseQuery',
        component: AssetsPurchaseQuery
    },
    {
        path: 'assets/depreciatedList',
        name: 'depreciatedList',
        component: DepreciatedList
    },
    {
        path: 'assets/depreciatedDetail/:id',
        name: 'depreciatedDetail',
        component: DepreciatedDetail
    },
    {
        path: 'assets/depreciatedReq/:id?',
        name: 'depreciatedReq',
        component: DepreciatedReq
    },
    {
        path: 'assets/assetsRegReview',
        name: 'assetsRegReview',
        component: AssetsRegReview
    },
    {
        path: 'assets/assetsRegApprove/:id',
        name: 'assetsRegApprove',
        component: AssetsRegApprove
    },
    {
        path: 'assets/assetsPurchaseApprove/:id',
        name: 'assetsPurchaseApprove',
        component: AssetsPurchaseApprove
    },
    {
        path: 'assets/assetsPurchaseReview',
        name: 'assetsPurchaseReview',
        component: AssetsPurchaseReview
    },
    {
        path: 'assets/depreciatedQuery',
        name: 'depreciatedQuery',
        component: DepreciatedQuery
    },
    {
        path: 'assets/depreciatedReview',
        name: 'depreciatedReview',
        component: DepreciatedReview
    },
    {
        path: 'assets/depreciatedApprove/:id',
        name: 'depreciatedApprove',
        component: DepreciatedApprove
    },
    {
        path: 'assets/assetsChgDetail/:id',
        name: 'assetsChgDetail',
        component: AssetsChgDetail
    },
    {
        path: 'assets/assetsChgList',
        name: 'assetsChgList',
        component: AssetsChgList
    },
    {
        path: 'assets/assetsChgQuery',
        name: 'assetsChgQuery',
        component: AssetsChgQuery
    },
    {
        path: 'assets/assetsChgReview',
        name: 'assetsChgReview',
        component: AssetsChgReview
    },
    {
        path: 'assets/assetsChgApprove/:id',
        name: 'assetsChgApprove',
        component: AssetsChgApprove
    },
]
const voucher = [{
        path: 'voucher/voucherList',
        name: 'voucherList',
        component: VoucherList
    },
    {
        path: 'voucher/voucherDetail/:id',
        name: 'voucherDetail',
        component: VoucherDetail
    },
    {
        path: 'voucher/voucherQuery',
        name: 'voucherQuery',
        component: VoucherQuery
    },
    {
        path: 'voucher/voucherReq/:id?',
        name: 'voucherReq',
        component: VoucherReq
    },
    {
        path: 'voucher/voucherPosting',
        name: 'voucherPosting',
        component: VoucherPosting
    },
    {
        path: 'voucher/voucherReview',
        name: 'voucherReview',
        component: VoucherReview
    },
    {
        path: 'voucher/voucherApprove/:id',
        name: 'voucherApprove',
        component: VoucherApprove
    },
];
const cashier = [{
        path: 'cashier/dailyHandle',
        name: 'dailyHandle',
        component: DailyHandle
    },
    {
        path: 'cashier/voucherTick',
        name: 'voucherTick',
        component: VoucherTick
    },
    {
        path: 'cashier/settleAccount',
        name: 'settleAccount',
        component: SettleAccount
    },
];
const system = [{
        path: 'system/test',
        name: 'test',
        component: Test
    },
    {
        path: 'system/roleInfo',
        name: 'roleInfo',
        component: RoleInfo
    },
    {
        path: 'system/accountInit',
        name: 'accountInit',
        component: AccountInit
    },
];
const activity = [{
        path: 'activity/design',
        name: 'design',
        component: Design
    },
    {
        path: 'activity/activityInfo',
        name: 'activityInfo',
        component: ActivityInfo
    }
];
const lender = [{
        path: 'lender/accountInfo',
        name: 'accountInfo',
        component: AccountInfo
    },
    {
        path: 'lender/accountBalance',
        name: 'accountBalance',
        component: AccountBalance
    },
    {
        path: 'lender/accountDetail',
        name: 'accountDetail',
        component: AccountDetail
    },
    {
        path: 'lender/accountThreeCol',
        name: 'accountThreeCol',
        component: AccountThreeCol
    },
];
const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/finance',
        name: 'finance',
        component: Finance,
        children: [],
        meta: { requireAuth: true }
    },
];

routes[2].children = routes[2].children.concat(charge);
routes[2].children = routes[2].children.concat(salary);
routes[2].children = routes[2].children.concat(assets);
routes[2].children = routes[2].children.concat(voucher);
routes[2].children = routes[2].children.concat(cashier);
routes[2].children = routes[2].children.concat(system);
routes[2].children = routes[2].children.concat(lender);
routes[2].children = routes[2].children.concat(activity);


const router = new VueRouter({
    routes
})

export default router