import axios from 'axios'
import JSONBIG from 'json-bigint'
import router from '@/router'

import store from '@/store'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 处理最大安全值的问题
  transformResponse: [data => {
    try {
      return JSONBIG.parse(data)
    } catch (e) {
      return data
    }
  }]
})

// 请求拦截器
instance.interceptors.request.use(config => {
  if (store.state.user.token) {
    config.headers.Auhorization = `Bearer ${store.state.user.token}`
  }
  return config
}, err => Promise.reject(err))
// 响应拦截器
instance.interceptors.response.use(res => {
  // 处理返回数据，解构之后可以直接使用的值
  // try {
  //   return res.data.data
  // } catch (e) {
  //   return res.data
  // }
  return res.data && res.data.data
}, async err => {
  // 判断token是否失效:如果失效，向后台发送刷新token请求，获得refresh_token
  if (err.response && err.response.status === 401) {
    const user = store.state.user
    // 保证用户登录后跳转到当前所在页面
    const login = { path: '/login', query: { redirect: router.currentRoute.path } }
    // 没有token表示没有登录
    if (!user.token || !user.refresh_token) {
      return router.push(login)
    }

    try {
      // 有token的时候说明已经登录并且token失效，请求后台返回新的token
      const { data: { data } } = await axios({
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        method: 'put',
        headers: {
          Auhorization: 'Bearer ' + user.refresh_token
        }
      })
      // 成功之后更新store.state中的数据,修改数据触发mutation
      store.commit('setUser', {
        token: data.token,
        refresh_token: user.refresh_token

      })
      // 继续请求
      return instance(err.config)
    } catch (e) {
      // 清除token
      store.commit('delUser')
      return router.push('/login')
    }
  }
  return Promise.reject(err)
})

// 导出一个调用接口的函数
export default (url, method, reqParams) => {
  const config = {
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: reqParams
  }
  return instance(config)
}
