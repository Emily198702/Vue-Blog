import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Vuex from 'vuex'

 
import BlogPost from './components/BlogPost'
import Huangyijie from './components/Huangyijie1'
import ManageList from './components/ManageList'
import NewBlog from './components/NewBlog.vue'
import Index from './components/Index.vue'


Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(iView)
Vue.use(Vuex)

const routes = [
  {path:"/blogList",component:Huangyijie},
  {path:"/detail/:id",component:BlogPost},
  {path:"/manageList",component:ManageList},
  {path:"/newBlog",component:NewBlog},
  {path:"/newBlog/:id",component:NewBlog},
  {path:"/index",component:Index},
]

const router = new VueRouter({
  routes
})

const store = new Vuex.Store({
  state:{
    count:0,
    currentUser:null,
    isLogin:false,
     
  },
  getters:{},
  mutations:{
    increment (state){
      state.count++
    }
  },
  actions:{}
})

store.commit('increment')
console.log("count",store.state.count) 
 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


