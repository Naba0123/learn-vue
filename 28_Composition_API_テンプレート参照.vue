<template>
  <!-- ref="root" により、setup で root 変数名で公開したものと束縛される -->
  <div ref="root">This is a root element</div>

  <!-- Composition API のテンプレート参照を v-for 内部で使う場合、特別な処理はされません。
       代わりに、関数を使って ref に独自処理を行うようにします。 -->
  <div v-for="(item, i) in list" :ref="el => { if (el) divs[i] = el }">
    {{ item }}
  </div>
</template>

<script>

import {onBeforeUpdate, onMounted, reactive, ref, watchEffect} from 'vue'

export default {
  setup() {
    const root = ref(null)

    onMounted(() => {
      // DOM 要素は初期描画の後に ref に代入されます
      console.log(root.value) // <div>This is a root element</div>
    })

    // DOM の更新を watch する
    // 第2引数に flush: 'post' を指定することで、DOM が更新されたあとに作用が実行され、
    // テンプレート参照が DOM と同期して、正しい要素を参照するようになります。
    watchEffect(() => {
        console.log(root.value) // => <div>This is a root element</div>
      },
      {
        flush: 'post'
      })

    return {
      root
    }

    // このようにも返せる
    return () =>
      h('div', {
        ref: root
      })

    // JSX 記法
    return () => <div ref={root}/>


    const list = reactive([1, 2, 3])
    const divs = ref([])

    // ref が各更新の前に必ずリセットされるようにしてください
    // :ref で使っているから。
    onBeforeUpdate(() => {
      divs.value = []
    })


    return {
      list,
      divs
    }
  }
}


</script>