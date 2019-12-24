<template>
  <div class="flex flex-col w-full items-center">
    <div class="loading-blocks">
      <div />
      <div />
      <div />
    </div>
    <span :class="textSizeClass" class="py-4 text-gray-800">
      {{ text }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default () {
        return 'Loading...'
      }
    },
    textSize: {
      type: String,
      default () {
        return 'base'
      }
    }
  },
  computed: {
    textSizeClass () {
      return 'text-' + this.textSize
    }
  }
}
</script>

<style lang="css" scoped>
.loading-blocks {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.loading-blocks div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #4c51bf;
  animation: loading-blocks 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.loading-blocks div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.loading-blocks div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.loading-blocks div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes loading-blocks {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}
</style>
