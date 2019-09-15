// 封装axios请求
import request from './index'

export const loginRes = ({ mobile, code }) => {
  return request('/app/v1_0/authorizations', 'post', { mobile, code })
}
