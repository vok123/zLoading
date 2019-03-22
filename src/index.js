import zLoading from './index.vue';
import { isObject, merge, getStyle } from './utils/utils.js';

let zLoadingInstance = null,
  closeTimers = {};
let defaultOptions = {
  // 进度条高度
  barHeight: '4px',
  // 进度条默认进度 0 ~ 1
  barWidth: 0,
  // 超时时间, 大于0则开启
  timeOut: 0,
  // 主题色
  themeColor: '#f33',
  // youtube bar显示位置
  position: 'top',
  // type = youtubeBar | circle | doubleBounce | stretch
  type: 'youtubeBar',
  // spinner background-color
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  // spinner size
  size: 50,
  //
  showCloseBtn: true,
  zIndex: 999
};

const _setPositionClass = target => {
  const positionValue = getStyle(target, 'position');
  if (['absolute', 'fixed'].indexOf(positionValue) === -1) {
    const className = 'zloading-parent--relative';
    if (target.classList.contains(className) === false) {
      target.classList.add(className);
    }
  }
  if (target !== document.body) {
    zLoadingInstance.$el.classList.remove('z-loading--fixed');
  }
};

const install = Vue => {
  const ZLoading = Vue.extend(zLoading);
  let id = 1;
  const _init = (target, visible, config = {}) => {
    const options = merge({}, defaultOptions, config);
    let instance = null;
    if (target.loadingInstance) {
      merge(target.loadingInstance, options);
      target.loadingInstance.visible = visible;
      instance = target.loadingInstance;
    } else {
      zLoadingInstance = new ZLoading({
        el: document.createElement('div'),
        data: options
      });
      zLoadingInstance.uid = id++;
      if (target.appendChild) {
        zLoadingInstance.visible = visible;
        Vue.nextTick(() => {
          target.appendChild(zLoadingInstance.$el);
          _setPositionClass(target);
        });
      }
      zLoadingInstance.targetEl = target;
      instance = (target.loadingInstance = zLoadingInstance);
    }
    Vue.nextTick(() => {
      if (options.timeOut > 0) {
        zLoadingInstance._setTimeout(options.timeOut);
      }
    });
    return instance;
  };
  ZLoading.prototype._setTimeout = function (time) {
    closeTimers[this.uid] && clearTimeout(closeTimers[this.uid]);
    if (time > 0) {
      closeTimers[this.uid] = setTimeout(() => {
        zLoadingInstance = null;
        delete closeTimers[this.uid];
        this._hide();
      }, Math.max(time, 50));
    }
  };
  ZLoading.prototype._hide = function () {
    if (this.type === 'youtubeBar') {
      return this.complete && this.complete();
    }
    this.visible = false;
  };
  /**
   * closeParams: close loading params
   */
  ZLoading.prototype.close = function(closeParams) {
    let time = 50;
    if (typeof closeParams === 'number') {
      time = closeParams;
    } else if (isObject(closeParams) === true) {
      if (typeof closeParams.color === 'string') {
        this.themeColor = closeParams.color;
      }
      if (typeof closeParams.timeout === 'number') {
        time = closeParams.timeout;
      }
    }
    this._setTimeout(time);
    return this;
  };

  ZLoading.prototype.wait = function(task) {
    // params is Promise
    if (
      !!task &&
      ['object', 'function'].indexOf(typeof task) > -1 &&
      typeof task.then === 'function'
    ) {
      return new Promise((resolve, reject) => {
        var _loading = this;
        task
          .then(function() {
            // resolve
            _loading.close();
            resolve(...arguments);
          })
          .catch(function() {
            _loading.close();
            // eslint-disable-next-line
            reject(...arguments);
          });
      });
    }
    return this;
  };

  ZLoading.prototype.done = function(callback) {
    if (typeof callback === 'function') {
      this._doneCallback = callback;
    }
    return this;
  };

  let _loading = {
    // close loading
    close() {},
    // show loading
    open(config = {}) {
      let target = config.el || null;
      if (typeof config.el === 'string') {
        target = document.querySelector(config.el);
      }
      target = target || document.body;
      let instance = _init(target, true, config);
      instance._doneCallback = null;
      _loading.close = function(closeParams) {
        return instance.close(closeParams);
      };
      return instance;
    }
  };
  window.ZLoading = Vue.prototype.$zLoading = _loading;
  // Vue directive
  Vue.directive('zLoading', (el, { value, oldValue, modifiers, arg = 'circle' }) => {
    if (value === oldValue) return;
    let target = el;
    if (modifiers.fullscreen === true) {
      target = document.body;
    }
    if (value === true) {
      return _init(target, value, { type: arg });
    }
    target.loadingInstance && target.loadingInstance.close();
  });
  // Vue.directive('zloading', {
  //   update(el, { value, oldValue, modifiers, arg = 'circle' }) {
  //     if (value === oldValue) return;
  //     let target = el;
  //     if (modifiers.fullscreen === true) {
  //       target = document.body;
  //     }
  //     if (value === true) {
  //       _init(target, value, { type: arg });
  //     } else {
  //       target.loadingInstance.close();
  //     }
  //   },
  //   bind(el, binding) {
  //     const { value, modifiers, arg = 'circle' } = binding;
  //     if (!value) return;
  //     let target = el;
  //     if (modifiers.fullscreen === true) {
  //       target = document.body;
  //     }
  //     _init(target, value, { type: arg });
  //   }
  // });
};

export const setConfig = function(config = {}) {
  merge(defaultOptions, config);
};

export const zLading = window.ZLoading;

export default {
  install
};
