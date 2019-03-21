<template>
  <div class="hello-world-box">
    <youtube-bar />
    <attributes />
    <api />
    <methods />
    <directive />
  </div>
</template>

<script>
import youtubeBar from './components/youtube-bar.vue';
import attributes from './components/attributes.vue';
import methods from './components/methods.vue';
import directive from './components/directive.vue';
import api from './components/api.vue';
export default {
  components: {
    youtubeBar,
    attributes,
    methods,
    directive,
    api
  }
};
</script>


<style lang="scss">

.hello-world-box {
  width: 1280px;
  margin: 80px auto;
  .panel {
    margin-top: 30px;
  }
  
  .code-textarea {
    border: none;
    color: #7278bf;
    outline: none;
    width: 100%;
    height: 100%;
    background: transparent;
    resize:none;
    letter-spacing: 0.5px;
  }
  .btn {
    margin-right: 15px;
  }
  .well {
    margin: 15px 0;
    transition: all 0.5s;
    position: relative;
    .hide-code {
      position: absolute;
      text-align: center;
      display: none;
      bottom: 5px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:hover {
      .hide-code {
        display: block;
      }
    }
    
  }
  .code-block {
    padding: 10px 0;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
    height: 0px;
    overflow: hidden;
  }
}
</style>

