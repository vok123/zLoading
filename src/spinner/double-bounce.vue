<template>
  <div :style="style" class="double-bounce-spinner">
    <div :style="bounceStyle" class="double-bounce1"></div>
    <div :style="bounceStyle" class="double-bounce2"></div>
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
    bounceStyle () {
      return {
        'background-color': this.themeColor
      };
    }
  }
};
</script>

<style lang="scss">
.double-bounce-spinner {
  position: relative;
  display: inline-block;
  .double-bounce1, .double-bounce2 {
    line-height: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    animation: double-bounce 2.0s ease-in-out infinite;
  }
  .double-bounce2 {
    animation-delay: -1.0s;
  }
}
  
@keyframes double-bounce {
  0%, 100% {
    transform: scale(0.0);
  }
  50% {
    transform: scale(1.0);
  }
}
</style>