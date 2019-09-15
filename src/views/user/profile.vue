<template>
<div class="profile">
  <van-nav-bar
      title="编辑资料"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
      @click-right="save()"
    />
</div>
</template>

<script>
export default {
  methods: {
    save () {
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style lang='less' scoped>

</style>
