import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载
const Layout = () =>
  import('@/views/layout.vue')
const Home = () =>
  import('@/views/home.vue')
const Search = () =>
  import('@/views/search')
const Question = () =>
  import('@/views/question.vue')
const User = () =>
  import('@/views/user')
const Video = () =>
  import('@/views/video.vue')
const Profile = () =>
  import('@/views/user/profile.vue')
const Chat = () =>
  import('@/views/user/chat.vue')
const Login = () =>
  import('@/views/login.vue')
const result = () =>
  import('@/views/search/result.vue')

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Layout,
    children: [
      { path: '/', name: 'home', component: Home },
      { path: '/question', name: 'question', component: Question },
      { path: '/video', name: 'video', component: Video },
      { path: '/user', name: 'user', component: User }
    ]
  },
  { path: '/user/profile', component: Profile },
  { path: '/user/chat', component: Chat },
  { path: '/login', component: Login },
  { path: '/search', component: Search },
  { path: '/search/result', component: result }
  ]
})
