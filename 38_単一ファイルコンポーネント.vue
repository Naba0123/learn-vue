<!--
SFC
https://v3.ja.vuejs.org/api/sfc-spec.html
https://github.com/vuejs/vue-next/tree/master/packages/compiler-sfc
Vite や VueCLI などのビルドツールを統合して、SFC を素早く使い始めることができる
-->


<script>
export default {
  data() {
    return {
      greeting: 'Hello World!'
    }
  }
}
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>


<!--

使うとき

import MyComponent from './MyComponent.vue'

export default {
  components: {
    MyComponent
  }
}

-->