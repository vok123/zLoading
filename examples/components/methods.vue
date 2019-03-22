<template>
  <div class="methods-box">
    <a name="methods"></a>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">__("Methods")</h3>
      </div>
      <div class="panel-body">
        <ul class="media-list">
          <li class="media">
            <div class="media-body">
              <h4 class="media-heading">.open(?Attributes: object)</h4>
              __("Display loading")
              <div class="code-block">
                <code>
                  this.$zLoading.open();
                </code>
              </div>
            </div>
          </li>
          <li class="media">
            <div class="media-body">
              <h4 class="media-heading">.close(?timeout: number)</h4>
              __("Hidden loading")
              <div class="code-block">
                <code>
                  this.$zLoading.close();
                </code>
              </div>
            </div>
          </li>
          <li class="media">
            <div class="media-body">
              <h4 class="media-heading">.wait(task: Promise)</h4>
              __("Automatically manage loading status, Automatically close loading when Promise resolve or reject").
              <div class="code-block">
                <code>
                  // Promise<br />
                  this.$zLoading.open().wait(promiseTask).then((result) => {}).catch(error => {});<br /><br />
                  // ES7<br />
                  const result = await this.$zLoading.open().wait(promiseTask);
                </code>
              </div>
            </div>
          </li>
          <li class="media">
            <div class="media-body">
              <h4 class="media-heading">.done(callback: function)</h4>
              __("Callback when loading disappears")
              <div class="code-block">
                <code>
                  this.$zLoading.open().done(() => { Do something });
                </code>
              </div>
            </div>
          </li>
          <li class="media">
            <div class="media-body">
              <h4 class="media-heading">__("Chained calls")</h4>
              __("Display Loading and set the 5 second timeout and close the callback.")
              <div class="code-block">
                <code>
                  this.$zLoading<br />
                  .open() // __("Display loading") <br />
                  .close(5000) // __("Set the 5 second timeout") <br />
                  .done(() => { Do something }) // __("Set close callback")<br />
                  .wait(promiseTask) // __("Task hosting");
                </code>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.methods-box {
}
</style>

