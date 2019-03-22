
## Install
```shell
npm install z-loading -S
```

## Quick Start
``` javascript
import Vue from 'vue';
import zloading from 'z-loading';
import 'zloading/z-loading.css';

Vue.use(zloading);

```

For more information, please refer to [Quick Start](https://vok123.github.io/zLoading/static/en) [快速开始](https://vok123.github.io/zLoading/static/cn) in documentation.

## Browser Support
Modern browsers and Internet Explorer 10+.

## Usage

### As vue component
``` javascript
  <template>
    <button @click="clickHandle1">Start</button>
  </template>

  <script>
    export default {
      methods: {
        clickHandle1 () {
          this.$zLoading.open();
          setTimeout(() => {
            this.$zLoading.close();
          }, 3000);
        }
      }
    };
  </script>

```

``` javascript
  <template>
    <div v-zLoading="isLoading">
      <button @click="isLoading = true">Start</button>
    </div>
  </template>

  <script>
    export default {
      data () {
        return {
          isLoading: false
        };
      }
    };
  </script>

```

### As not a vue component instance

``` javascript
  let timeout = 3000;
  window.ZLoading.open().close(timeout);
```

