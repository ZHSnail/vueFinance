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
    },
];

routes[2].children = routes[2].children.concat(charge);
routes[2].children = routes[2].children.concat(salary);
console.log(routes[2].children)
const router = new VueRouter({
    routes
})

export default router