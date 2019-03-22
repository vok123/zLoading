<template>
  <div class="attributes-box">
    <a name="attributes"></a>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">__("Attributes")</h3>
      </div>
      <div class="panel-body">
        <form @submit.prevent>
          <div class="radio">
            <label>type</label>
            <label>
              <input type="radio" v-model="params.type" value="youtubeBar"> youtubeBar
            </label>
            <label>
              <input type="radio" v-model="params.type" value="circle"> circle
            </label>
            <label>
              <input type="radio" v-model="params.type" value="stretch"> stretch
            </label>
            <label>
              <input type="radio" v-model="params.type" value="doubleBounce"> doubleBounce
            </label>
            <p class="help-block">__("Loading type") ( __("Default"): youtubeBar )</p>
          </div>
          <div class="form-group">
            <label for="timeout">timeOut</label>
            <input
              type="number"
              id="timeout"
              v-model="params.timeOut"
              class="form-control"
              placeholder="timeOut"
            >
            <p class="help-block">__("timeout off").( __("Default"): 0 )</p>
          </div>
          <div class="form-group" v-if="params.type !== 'youtubeBar'">
            <label for="size">size</label>
            <input
              type="number"
              id="size"
              v-model="params.size"
              class="form-control"
              placeholder="spinner size"
            >
            <p class="help-block">__("Spinner size"). (__("Default"): 50px)</p>
          </div>
          <template v-else>
            <div class="form-group">
              <label for="bar-height">barHeight</label>
              <input
                type="number"
                id="bar-height"
                v-model="params.barHeight"
                class="form-control"
                placeholder="height"
              >
              <p class="help-block">Youtube bar __("height") ( __("Default"): 2px )</p>
            </div>
            <div class="form-group">
              <label>barWidth</label>
              <div class="progress" 
                @mousedown="progressMouseDownHandle">
                <div
                  class="progress-bar progress-bar-warning"
                  role="progressbar"
                  :style="{ width: params.barWidth * 100 + '%' }"
                >
                </div>
              </div>
              <p class="help-block">Youtube bar __("start width") ( __("Default"): 0 ).</p>
            </div>
            <div class="radio">
              <label>position</label>
              <label>
                <input type="radio" v-model="params.position" value="top"> top
              </label>
              <label>
                <input type="radio" v-model="params.position" value="bottom"> bottom
              </label>
              <p class="help-block">(__("Default"): top)</p>
            </div>
          </template>
          
          <div class="form-group">
            <label for="background-color">backgroundColor</label>
            <input
              type="color"
              v-model="params.backgroundColor"
              id="background-color"
              class="form-control"
            >
          </div>
          <div class="form-group">
            <label for="theme-color">themeColor</label>
            <input
              v-model="params.themeColor"
              type="color"
              id="theme-color"
              class="form-control"
            >
          </div>
          
          <div class="form-group">
            <label for="z-index">zIndex</label>
            <input
              type="number"
              v-model="params.zIndex"
              id="z-index"
              class="form-control"
              placeholder="z-index"
            >
          </div>
          <button
            type="submit"
            @click="setConfig"
            class="btn btn-default"
          >Submit (__("Set Global Config"))</button>
          <button
            type="submit"
            @click="submit"
            class="btn btn-default"
          >Submit</button>
        </form>

        <transition name="fade">
          <div class="well well-lg" v-if="code">
          <textarea class="code-textarea" rows="20" v-model="code">
          </textarea>
          <div class="hide-code">
            <button @click="code = ''" type="button" class="btn btn-link glyphicon glyphicon-arrow-up">__("Hide")</button>
          </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { setConfig } from '../../src/index.js';
export default {
  data () {
    return {
      params: {
        timeOut: 0,
        type: 'youtubeBar',
        size: 50,
        barHeight: 4,
        barWidth: 0.1,
        themeColor: '#ff0000',
        position: 'top',
        backgroundColor: '#dddddd',
        zIndex: 999
      },
      codeVisible: false,
      code: ''
    };
  },
  methods: {
    filterProps (config) {
      let params = Object.assign({}, config);
      params.barHeight += 'px';
      params.size = Number(params.size);
      if (this.params.type !== 'youtubeBar') {
        ['barHeight', 'barWidth', 'position'].map(key => (delete params[key]));
      } else {
        ['size'].map(key => (delete params[key]));
      }
      return params;
    },
    setConfig () {
      let params = this.filterProps(this.params);
      // eslint-disable-next-line
this.code = `
import { setConfig } from 'zLoading';
// Set at the entrance
setConfig(${JSON.stringify(params, null, 2)});

// Use in vue component
this.$zLoading.open();

// Or, Use in .js
window.ZLoading.open();
`;
      setConfig(params);
      this.$zLoading.open();
    },
    submit () {
      let params = this.filterProps(this.params);
      // eslint-disable-next-line
this.code = `
// Use in vue component
this.$zLoading.open(${JSON.stringify(params, null, 2)});

// Or, Use in .js
window.ZLoading.open(${JSON.stringify(params, null, 2)});
`;
      this.$zLoading.open(params);
    },
    progressMouseDownHandle ({ offsetX }) {
      const { offsetWidth } = this.$el.querySelector('.progress');
      this.params.barWidth = Number((offsetX / offsetWidth).toFixed(2));
    }
  }
};
</script>


<style lang="scss">
.attributes-box {
  .checkbox,
  .radio {
    label {
      &:first-child {
        display: block;
        margin-bottom: 5px;
        font-weight: 700;
        padding-left: 0;
        font-size: 18px;
      }
      margin-right: 15px;
    }
  }
  form {
    width: 600px;
    margin: 0 auto;
  }
  .form-group {
    label {
      font-size: 18px;
    }
  }
  .progress {
    cursor: pointer;
  }
}
</style>
