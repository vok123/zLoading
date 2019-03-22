<template>
  <div class="api-box">
    <a name="api"></a>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Api</h3>
      </div>
      <div class="panel-body">
        <ul class="media-list">
          <li class="media">
            <div class="media-body">
              <h4 class="media-heading">setConfig</h4>
              __("Set the global loading configuration")
              <div class="code-block">
                <code>
                  import { setConfig } from 'zLoading';
                  <br /><br />
                  setConfig({
                    type: 'circle',
                    size: 100,
                    timeOut: 3000
                  }); 
                </code>
              </div>
            </div>
          </li>
        </ul>
        <button
          type="submit"
          @click="submit"
          class="btn btn-default"
        >Test Loading</button>
        <button
          type="submit"
          @click="setGlobalConfig"
          class="btn btn-default"
        >__("Set Global Config")</button>
        
        <transition name="fade">
          <div class="well well-lg" v-if="code">
          <textarea class="code-textarea" rows="10" v-model="code">
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
      code: ''
    };
  },
  methods: {
    setGlobalConfig () {
      setConfig({
        type: 'circle',
        size: 100,
        timeOut: 3000
      });
      this.code =
      `
      import { setConfig } from 'zLoading';

      setConfig({
        type: 'circle',
        size: 100,
        timeOut: 3000
      });
      `;
    },
    submit () {
      this.code =
      `
      this.$zLoading.open();
      `;
      this.$zLoading.open();
    }
  }
};
</script>
