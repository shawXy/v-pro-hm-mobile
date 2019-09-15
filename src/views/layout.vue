<template>
  <div class="container">
    <van-nav-bar
      fixed
      v-if="$route.path!=='/user'"
      title="黑马头条"
      right-text="搜索"
      @click-right="$router.push('/search')"
    />
    <div class="wrapper" :class="{noTop:$route.path==='/user'}">
      <router-view></router-view>
    </div>

    <van-tabbar v-model="active" route>
      <van-tabbar-item replace name="/" to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace name="/question" to="/question" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item replace name="/video" to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item replace name="/user" to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  // 使用data属性时，切换二级路由不会改变，只有使用computed属性才能变化，或者使用$route.path
  // data () {
  //   return {
  //     active: '/'
  //   }
  // }
}
</script>

<style lang='less'>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  .wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }
}
</style>
