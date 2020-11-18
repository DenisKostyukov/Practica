import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store.js'
import App from './components/App.vue'
import Students from './components/Students.vue'
import StudentInfo from './components/StudentInfo.vue'
import Convertor from './components/Convertor.vue'
import Login from './components/Login.vue'
import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {});
Vue.use(VueAxios, axios)

const routes = [
   { path: '/', component: Students, meta:{requiresAuth: true} },
   { path: '/student-info/:id', component: StudentInfo, props: true, meta:{requiresAuth:true } },
   { path: '/convertor/', component: Convertor},
   { path: '/login/', component: Login},
]
 
const router = new VueRouter({
   routes
})
router.beforeEach((to, from, next)=>{
   if (to.matched.some(record=> record.meta.requiresAuth)){
      if(store.getters.getUser === null){
         next({
            path:'/login',
            query:{redirect: to.fullPath}
         })
      }
      else{
         next()
      }
   }
   else{
      next()
   }
})
 Vue.use(VueRouter)
new Vue({
   render: h => h(App),
   el: '#app',
   router,
   store,
})
