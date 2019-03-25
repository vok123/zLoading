<template>
  <div class="hello-world-box">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <img alt="zloading" src="./assets/img/logo.png">
          </a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><a href="#attributes">__("Attributes")</a></li>
            <li><a href="#api">Api</a></li>
            <li><a href="#methods">__("Methods")</a></li>
            <li><a href="#directive">__("Directive")</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a target="_blank" href="https://github.com/vok123/zLoading/tree/dev">GitHub</a></li>
            <li class="dropdown">
              <a href="javascript:;" class="dropdown-toggle">{{ langArr[lang] }}<span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li v-for="(lang, key) in langArr" @click="to(key)" :key="key"><a href="javascript:;">{{ lang }}</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <transition name="fade">
      <div v-if="visible" class="content">
        <youtube-bar />
        <attributes />
        <api />
        <methods />
        <directive />
      </div>
    </transition>
    <a href="#" class="to-top glyphicon glyphicon-chevron-up"></a>
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
  },
  data () {
    return {
      visible: false,
      langArr: {
        cn: '__("Chinese")',
        en: 'English'
      },
      lang: ''
    };
  },
  methods: {
    to (type) {
      this.lang = type;
      window.location.href = '/zLoading/static/' + type;
    }
  },
  mounted () {
    this.lang = window.location.href.indexOf('static/cn') > -1 ? 'cn' : 'en';
    this.$zLoading.open({ barWidth: 0.1 }).close(1100).done(() => {
      this.visible = true;
    });
  }
};
</script>


<style lang="scss">

.hello-world-box {
  .panel {
    margin-top: 30px;
  }
  .content {
    width: 1280px;
    margin: 80px auto;
  }
  .dropdown:hover {
    .dropdown-menu {
      display: block;
    }
  }
  .dropdown-menu li a {
    padding: 10px 0;
    text-align: center;
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

