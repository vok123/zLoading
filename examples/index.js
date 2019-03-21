import Vue from 'vue';
import zLoading, { setConfig } from '../src/index.js';
import helloWorld from './hello-world.vue';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './scss/style.scss';

setConfig({
  backgroundColor: 'rgba(0, 0, 0, 0.2)'
});
Vue.use(zLoading);

new Vue({
  el: '#app',
  components: {
    helloWorld
  }
});
