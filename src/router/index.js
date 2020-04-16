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
    }
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
        path: 'assets/assetsChgReq',
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
}];
const lender = [{
    path: 'lender/accountInfo',
    name: 'accountInfo',
    component: AccountInfo
}];
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


const router = new VueRouter({
    routes
})

export default router