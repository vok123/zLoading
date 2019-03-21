<template>
  <transition name="z-loading" @after-leave="afterLeaveHandler">
    <div class="z-loading-box z-loading--fixed"
      :class="loadingClass"
      :style="[ zLoadingPosition, boxStyle ]"
      v-if="visible">
      <div class="z-loading-bar"
        ref="bar"
        v-if="type === 'youtubeBar'"
        :style="barStyle">
        <div class="z-loading-head"></div>
      </div>
      <div class="z-loading-spinner" v-else>
        <div @click="closeHandler" v-if="showCloseBtn && closeBtnVisible" :style="closeStyle" class="spinner-close">
          <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1400">
            <path d="M621.714286 512 1002.057143 131.657143c29.257143-29.257143 29.257143-80.457143 0-109.714286-29.257143-29.257143-80.457143-29.257143-109.714286 0L512 402.285714 131.657143 21.942857c-29.257143-29.257143-80.457143-29.257143-109.714286 0-29.257143 29.257143-29.257143 80.457143 0 109.714286L402.285714 512 21.942857 892.342857c-29.257143 29.257143-29.257143 80.457143 0 109.714286 29.257143 29.257143 80.457143 29.257143 109.714286 0L512 621.714286l380.342857 380.342857c29.257143 29.257143 80.457143 29.257143 109.714286 0 29.257143-29.257143 29.257143-80.457143 0-109.714286L621.714286 512z" p-id="1401"></path>
          </svg>
        </div>
        <div class="spinner-content">
          <component :size="size" :theme-color="themeColor" :is="loader"></component>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import youtubeBarMixins from './spinner/youtube-bar.js';
import circle from './spinner/circle.vue';
import doubleBounce from './spinner/double-bounce.vue';
import stretch from './spinner/stretch.vue';

export default {
  name: 'z-loading',
  mixins: [youtubeBarMixins],
  data () {
    return {
      visible: false,
      timeOut: 3 * 1000,
      themeColor: '',
      type: 'youtubeBar',
      loader: null,
      closeBtnVisible: false
    };
  },
  computed: {
    loadingClass () {
      return this.type === 'youtubeBar' ? 'z-loading-type--youtube' : 'z-loading-type--spinner';
    },
    closeStyle () {
      return { color: this.themeColor };
    },
    boxStyle () {
      return {
        'background-color': this.backgroundColor,
        'z-index': this.zIndex
      };
    }
  },
  watch: {
    type: {
      immediate: true,
      handler () {
        this.loader = {
          doubleBounce,
          circle,
          stretch
        }[this.type];
      }
    }
  },
  methods: {
    closeHandler () {
      // eslint-disable-next-line
      this.close.call(this);
    },
    afterLeaveHandler () {
      if (this.$el.parentNode) {
        this.$el.parentNode.classList.remove('zloading-parent--relative');
        this.$el.parentNode.removeChild(this.$el);
      }
      this.$destroy();
      typeof this._doneCallback === 'function' && this._doneCallback();
    },
    clearTimer (id) {
      id && clearTimeout(id);
    }
  }
};
</script>

<style lang="scss">
.z-loading-enter, .z-loading-leave-active {
  opacity: 0;
  transform: translateY(-1px);
}
.zloading-parent--relative {
  position: relative;
}
.z-loading-box {
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 555;
  transition: all .3s;
  .z-loading-spinner {
    height: 100%;
    width: 100%;
    position: relative;
  }
  .spinner-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .spinner-close {
    font-size: 20px;
    position: absolute;
    z-index: 1001;
    right: 30px;
    top: 30px;
    cursor: pointer;
    transition: ease-in-out;
    user-select: none;
  }
  &.z-loading-type--spinner {
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  }

  &.z-loading--fixed {
    position: fixed;
  }

  $theme-color: rgb(158, 17, 24);
  &.z-loading-type--youtube {
    height: auto;
    .z-loading-bar {
      height: 2px;
      background: $theme-color;
      position: relative;
      width: 20%;
      transition: width .3s ease-out;
      border-top-right-radius: 1px;
      border-bottom-right-radius: 1px;
    }
    .z-loading-head {
      box-shadow: 0 0 10px rgba($color: $theme-color, $alpha: .5), 0 0 5px rgba($color: $theme-color, $alpha: .5);
      position: absolute;
      width: 70px;
      right: 0;
      top: 0;
      height: 100%;
      opacity: 0.45;
    }
  }
}
</style>
