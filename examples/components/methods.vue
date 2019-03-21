<template>
  <div class="methods-box">
    <a name="methods"></a>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Methods</h3>
      </div>
      <div class="panel-body">
        <ul class="media-list">
          <li class="media">
            <div class="media-body">
              <h4 class="media-heading">.open(?Attributes: object)</h4>
              Display loading 
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
              Hidden loading
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
              Automatically manage loading status, Automatically close loading when Promise resolve or reject.
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
              Callback when loading disappears
              <div class="code-block">
                <code>
                  this.$zLoading.open().done(() => { Do something });
                </code>
              </div>
            </div>
          </li>
          <li class="media">
            <div class="media-body">
              <h4 class="media-heading">Chained calls</h4>
              Display Loading and set the 5 second timeout and close the callback.
              <div class="code-block">
                <code>
                  this.$zLoading<br />
                  .open() // Display loading <br />
                  .close(5000) // Set the 5 second timeout <br />
                  .done(() => { Do something }) // Set close callback<br />
                  .wait(promiseTask) // Task hosting;
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

