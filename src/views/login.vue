<template>
  <div class="login">
    <van-nav-bar title="登 录" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-field
        v-model.trim="loginForm.mobile"
        required
        clearable
        label="手机号"
        placeholder="请输入手机号"
        :error-message="errMsg.mobileErr"
        @blur="checkMobie"
      />
      <van-field
        v-model.trim="loginForm.code"
        label="验证码"
        placeholder="请输入验证码"
        :error-message="errMsg.codeErr"
        @blur="checkCode"
        required
      >
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btnbox">
      <van-button class="loginbtn" type="info" round block @click="login()">登录</van-button>
    </div>
  </div>
</template>

<script>
import { loginRes } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      errMsg: {
        mobileErr: '',
        codeErr: ''
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async login () {
      this.checkMobie()
      this.checkCode()
      if (this.errMsg.codeErr || this.errMsg.mobileErr) return false
      // 校验成功之后
      // 成功
      try {
        const data = await loginRes(this.loginForm)
        // 登录成功之后更新本地token,并提示信息跳转
        this.setUser(data)
        this.$toast({ type: 'success', message: '登录成功' })
        // 如果有原地址，返回原地址，否则跳转user
        const url = this.$route.query.redirect || '/user'
        this.$router.push(url)
      } catch (e) {
        this.$toast({ type: 'fail', message: '登录失败' })
      }
    },
    checkMobie () {
      if (!this.loginForm.mobile) {
        this.errMsg.mobileErr = '请输入手机号'
        return false
      }
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errMsg.mobileErr = '手机号格式不正确'
        return false
      }
      this.errMsg.mobileErr = ''
    },
    checkCode () {
      if (!this.loginForm.code) {
        this.errMsg.codeErr = '请输入验证码'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errMsg.codeErr = '请输入六位数字'
        return false
      }
      this.errMsg.codeErr = ''
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  .btnbox {
    padding: 10px;
    .loginbtn {
      height: 32px;
      line-height: 30px;
    }
  }
}
</style>
