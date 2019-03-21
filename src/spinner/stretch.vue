<template>
  <div :style="style" class="stretch-spinner">
    <div :style="rectStyle" class="rect rect-1"></div>
    <div :style="rectStyle" class="rect rect-2"></div>
    <div :style="rectStyle" class="rect rect-3"></div>
    <div :style="rectStyle" class="rect rect-4"></div>
    <div :style="rectStyle" class="rect rect-5"></div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 50
    },
    themeColor: [String]
  },
  computed: {
    style () {
      return {
        width: this.size + 'px',
        height: this.size + 'px'
      };
    },
    rectStyle () {
      return {
        'background-color': this.themeColor
      };
    }
  }
};
</script>

<style lang="scss">
.stretch-spinner {
  display: inline-block;
  text-align: center;
  font-size: 10px;
  .rect{
    animation: sk-stretchdelay 1.2s ease-in-out infinite;
    height: 100%;
    width: 10%;
    display: inline-block;
    line-height: 0;
    box-sizing: border-box;
  }
  .rect-2 {
    animation-delay: -1.1s;
  }
  .rect-3 {
    animation-delay: -1.0s;
  }
  .rect-4 {
    animation-delay: -0.9s;
  }
  .rect-5 {
    animation-delay: -0.8s;
  }
}

@keyframes sk-stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1.0);
  }
}
</style>