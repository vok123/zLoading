<template>
  <div class="youtube-bar-box" @click.stop>
    <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">Youtube Bar</h3>
    </div>
    <div class="panel-body">
      <button @click="clickHandle1" type="button" class="btn btn-success">__("Start")</button>
      <button @click="clickHandle2" type="button" class="btn btn-danger">__("Close")</button>
      <button @click="clickHandle3" type="button" class="btn btn-success">__("Delay 5 seconds off")</button>

    <transition name="fade">
      <div class="well well-lg" v-if="index > -1">
      <textarea class="code-textarea" rows="15" readonly v-model="arr[index]">
      </textarea>
      <div class="hide-code">
        <button @click="index = -1" type="button" class="btn btn-link glyphicon glyphicon-arrow-up">__("Hide")</button>
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
      index: -1,
      arr: ['',
        `
          <template>
            <button @click="clickHandle1" type="button" class="btn btn-success">Start</button>
          </template>

          <script>
            export default {
              methods: {
                clickHandle1 () {
                  this.$zLoading.open();
                }
              }
            };
          <\/script>
        `,
        `
          <template>
            <button @click="clickHandle2" type="button" class="btn btn-danger">Close</button>
          </template>

          <script>
            export default {
              methods: {
                clickHandle2 () {
                  this.$zLoading.close();
                }
              }
            };
          <\/script>
        `,
        `
          <template>
            <button @click="clickHandle3" type="button" class="btn btn-success">__("Delay 5 seconds off")</button>
          </template>
          
          <script>
            export default {
              methods: {
                clickHandle3 () {
                  this.$zLoading.open().close(5000);
                }
              }
            };
          <\/script>
      `
      ]
    };
  },
  methods: {
    clickHandle1 () {
      this.index = 1;
      this.$zLoading.open();
    },
    clickHandle2 () {
      this.index = 2;
      this.$zLoading.close();
    },
    clickHandle3 () {
      this.index = 3;
      this.$zLoading.open().close(5000);
    }
  }
};
</script>


<style lang="scss">
.youtube-bar-box {
  
}
</style>

