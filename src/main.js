import Vue from 'vue'
import './plugins/axios'
import commonUtil from './commonJs/common'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import "@/assets/css/global.css"
import myCard from "@/components/common/myCard.vue";
import myPageheader from "@/components/common/myPageheader.vue";
import myCollapse from "@/components/common/myCollapse.vue";
import task from "@/components/common/taskList.vue";
import row from "@/components/common/row.vue";
import search from "@/components/common/searchBar.vue";


Vue.component('myCard', myCard)
Vue.component('myPageheader', myPageheader)
Vue.component('myCollapse', myCollapse)
Vue.component('task', task)
Vue.component('row', row)
Vue.component('search', search)

Vue.config.productionTip = false
Vue.prototype.Utils = commonUtil
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')