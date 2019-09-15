// 认证信息，操作本地存储
const KEY = 'shawXy'

export default {
  getUser () {
    return JSON.parse(window.localStorage.getItem(KEY) || '{}')
  },
  setUser (user) {
    window.localStorage.setItem(KEY, JSON.stringify(user))
  },
  delUser () {
    window.localStorage.removeItem(KEY)
  }
}
