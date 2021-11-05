<template>
  <div>{{ collectionName }}: {{ readersNumber }} {{ book.title }}</div>
</template>

<script lang="js">

import {h, reactive, ref, toRef, toRefs} from "vue"

export default {
  props: {
    title: String,
    collectionName: String,
  },

  // props もリアクティブ
  // 新しい props が渡されたら更新される
  setup(props, context) {  // contextはリアクティブではないので {attrs, slots, emit, expose} にできる
    console.log(props.title)

    // そのままでは分割代入できない（リアクティブが消えてしまうため）
    // toRefs を使うことでリアクティブを保持できる
    const {title} = toRefs(props)

    // title がない場合 toRef を使うことでデフォルト値を指定できる
    const title2 = toRef(props, 'title')

    // context は便利値を色々提供している

    // Attributes (Non-reactive object, equivalent to $attrs)
    console.log(context.attrs)

    // Slots (Non-reactive object, equivalent to $slots)
    console.log(context.slots)

    // Emit events (Function, equivalent to $emit)
    console.log(context.emit)

    // Expose public properties (Function)
    console.log(context.expose)

    // attrs と slots はステートフルなオブジェクトなので、
    // 分割代入せずに attrs.x や slots.x のように参照する必要がある

    // data, computed, methods, refs などはまだ初期化されていないのでアクセスできない

    const readersNumber = ref(0)
    const book = reactive({title: 'Vue 3 Guide'})

    const count = ref(0)
    const increment = () => ++count.value


    // expose を使うことで、外部コンポーネントのインスタンスで利用可能なプロパティを定義したオブジェクトを渡す
    // increment は親コンポーネントでテンプレート参照を介して利用可能になる
    context.expose({
      increment
    })

    // return {
    //   readersNumber,
    //   book
    // }

    // レンダリング関数を返すこともできる
    return () => h('div', [readersNumber.value, book.title])

    // setup から返された refs は、
    // テンプレート内でアクセスされたときに自動的に浅いアンラップされるので、
    // テンプレート内で .value を使用すべきではないことに注意してください。

  },


}

</script>