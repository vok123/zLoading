export default {
  data () {
    return {
      barWidth: 0,
      position: 'top',
      _doneCallback: null,
      _incrementTimer: null,
      _completeTimer: null,
      _barEl: null,
      _started: false,
      _timerOutTimer: null
    };
  },
  computed: {
    barStyle () {
      let style = {
        width: this.barWidth * 100 + '%',
        height: this.barHeight
      };
      if (this.themeColor) {
        style['background-color'] = this.themeColor;
      }
      return style;
    },
    zLoadingPosition () {
      if (this.position === 'top') {
        return { top: 0 };
      }
      return { bottom: 0 };
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler (val) {
        this._started = true;
        if (val === true && this.type === 'youtubeBar' && !this._barEl) {
          this.$nextTick(() => {
            this._barEl = this.$refs.bar;
            this.increments();
          });
        }
      }
    }
  },
  methods: {
    increments () {
      if (this.barWidth >= 1) {
        return;
      }
      let { barWidth } = this, rnd = 0;
      if (barWidth >= 0 && barWidth < 0.25) {
        rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
      } else if (barWidth >= 0.25 && barWidth < 0.65) {
        rnd = (Math.random() * 3) / 100;
      } else if (barWidth >= 0.65 && barWidth < 0.9) {
        rnd = (Math.random() * 2) / 100;
      } else if (barWidth >= 0.9 && barWidth < 0.99) {
        rnd = 0.005;
      } else {
        rnd = 0;
      }
      this.setWidth(this.barWidth + rnd);
    },
    completeAnimation() {
      this.visible = false;
      this._started = false;
    },
    setWidth(width) {
      if (!this._started) {
        return;
      }
      this.barWidth = width;
      if (width === 1) {
        this._barEl && this._barEl.addEventListener('transitionend', this.completeAnimation, false);
      }
      this.clearTimer(this._incrementTimer);
      this._incrementTimer = setTimeout(this.increments, 250);
    },
    complete() {
      this.clearTimer(this._timerOutTimer);
      this.setWidth(1);
    },
    successComplete (color) {
      this.themeColor = color;
      this.complete();
    },
    errorComplete(color = '#f00') {
      this.themeColor = color;
      this.complete();
    }
  },
  beforeDestroy () {
    // 清空实例对象
    this.targetEl.loadingInstance = null;
    this._barEl && this._barEl.removeEventListener('transitionend', this.completeAnimation, false);
  }
};
