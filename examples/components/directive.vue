<template>
  <div class="directive-box" v-zloading:stretch="isLoading">
    <a name="directive"></a>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Directive (v-zloading)</h3>
      </div>
      <div class="panel-body">
        <ul class="media-list">
          <li class="media">
            <div class="media-body">
              <h4 class="media-heading">?arg (youtubeBar | circle | doubleBounce | stretch)</h4>
              Load type
              <p>Default: circle</p>
              <p><a target="_blank" href="https://cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0">Instruction arg description</a></p>
              <div class="code-block">
                <code>
                  v-zloading:circle="isLoading"
                </code>
              </div>
            </div>
          </li>
          <li class="media">
            <div class="media-body">
              <h4 class="media-heading">?modifiers (fullscreen)</h4>
              Whether full screen display
              <p>Default: false</p>
              <p><a target="_blank" href="https://cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0">Instruction modifiers description</a></p>
              <div class="code-block">
                <code>
                  v-zloading.fullscreen="isLoading"
                </code>
              </div>
            </div>
          </li>
        </ul>
        <button @click="clickHandle1" type="button" class="btn btn-success">Loading</button>
        <transition name="fade">
          <div class="well well-lg" v-if="code">
          <textarea class="code-textarea" rows="15" readonly v-model="code">
          </textarea>
          <div class="hide-code">
            <button @click="code = ''" type="button" class="btn btn-link glyphicon glyphicon-arrow-up">Hide</button>
          </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      code: ''
    };
  },
  methods: {
    clickHandle1 () {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 5000);
      this.code =
      `
      <template>
        <div class="directive-box" v-zloading:stretch="isLoading">
          ...
          <button @click="clickHandle1" type="button" class="btn btn-success">Loading</button>
        </div>
      </template>

      <script>
        export default {
          data () {
            return {
              isLoading: false
            };
          },
          methods: {
            clickHandle1 () {
              this.isLoading = true;
              setTimeout(() => {
                this.isLoading = false;
              }, 5000);
            }
          }
        };
      <\/script>
      `;
    },
    clickHandle2 () {
    }
  }
};
</script>


<style lang="scss">

</style>
