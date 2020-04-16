import Vue from 'vue'
import './plugins/axios'
import commonUtil from './commonJs/common'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import "@/assets/css/global.css"
import "@/assets/iconfont/iconfont.css"
import myCard from "@/components/common/myCard.vue";
import myPageheader from "@/components/common/myPageheader.vue";
import myCollapse from "@/components/common/myCollapse.vue";
import task from "@/components/common/taskList.vue";
import row from "@/components/common/row.vue";
import searchForm from "@/components/common/searchForm.vue";
import selectPayStub from "@/components/common/selectPayStub.vue";
import selectPostWage from "@/components/common/selectPostWage.vue";
import selectAccount from "@/components/common/selectAccount.vue";

Vue.component('myCard', myCard)
Vue.component('myPageheader', myPageheader)
Vue.component('myCollapse', myCollapse)
Vue.component('task', task)
Vue.component('row', row)
Vue.component('searchForm', searchForm)
Vue.component('selectPayStub', selectPayStub)
Vue.component('selectPostWage', selectPostWage)
Vue.component('selectAccount', selectAccount)

router.beforeEach((to, from, next) => {
    to.matched.some(item => {
        console.log(item.meta.requireAuth)
    })
    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
        if (sessionStorage.token != undefined && sessionStorage.token != '' && sessionStorage.token != null) { // 判断缓存里面是否有 userName  //在登录的时候设置它的值
            console.log(sessionStorage.token)
            next();
        } else {
            next({
                path: '/',
                query: {
                    redirect: to.fullPath
                } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
});

Vue.config.productionTip = false
Vue.prototype.Utils = commonUtil
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')