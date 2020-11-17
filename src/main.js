import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store.js'
import App from './components/App.vue'
import Students from './components/Students.vue'
import StudentInfo from './components/StudentInfo.vue'
import Convertor from './components/Convertor.vue'
Vue.use(VueAxios, axios)

const routes = [
   { path: '/', component: Students },
   { path: '/student-info/:id', component: StudentInfo, props: true },
   { path: '/convertor/', component: Convertor},
]
 
const router = new VueRouter({
   routes
})
 Vue.use(VueRouter)




new Vue({
   render: h => h(App),
   el: '#app',
   router,
   store,
})
