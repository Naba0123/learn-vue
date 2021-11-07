<template>
  <!--
  count が setup() によって返されるオブジェクトであり、
  テンプレート内でアクセスされる場合は .value はいらない。（浅くアンラップされるので）
  ネストされたものは必要
  -->
  <div>
    <span>{{ count }}</span>
    <button @click="count ++">Increment count</button>
    <button @click="nested.count.value ++">Nested Increment count</button>
  </div>
</template>

<script>

// 独立したリアクティブな値
// リアクティブオブジェクトの変更を防ぐ
import {reactive, readonly, ref, toRefs} from 'vue'

// リアクティブな状態
// リアクティブの変換はディープに行われる
const state = reactive({
  count: 0
})

const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1


export default {
  setup() {
    const count = ref(0)
    const state = reactive({
      count
    })

    console.log(state.count) // 0

    state.count = 1
    console.log(count.value) // 1


    const otherCount = ref(2)

    // 別の ref とリンクしているプロパティに置き換えた場合、そっちに置き換わる
    state.count = otherCount
    console.log(state.count) // 2
    console.log(count.value) // 1

    // Array や Map は庵ラップはされないので、.value が必要
    const books = reactive([ref('Vue 3 Guide')])
    // ここでは .value が必要です
    console.log(books[0].value)

    const map = reactive(new Map([['count', ref(0)]]))
    // ここでは .value が必要です
    console.log(map.get('count').value)


    return {
      count,

      // template 側で値を取得したいときは nested.count.value にする必要がある
      // アプリ内の場合は nested.count でOK
      nested: {
        count
      }
    }
  }
}

// リアクティブな状態の分割代入
const book = reactive({
  author: 'Vue Team',
  year: '2020',
  title: 'Vue 3 Guide',
  description: 'You are reading this book right now ;)',
  price: 'free'
})

// toRefs を使わないとリアクティブが失われてしまう
let {author, title} = toRefs(book)

// ここで title は ref であるため .value を用いる必要があります
title.value = 'Vue 3 Detailed Guide'
console.log(book.title) // 'Vue 3 Detailed Guide'

const original = reactive({count: 0})

const copy = readonly(original)

// original を変更すると copy 側の依存ウォッチャが発動します
original.count++

// copy を変更しようとすると失敗し、警告が表示されます
copy.count++ // warning: "Set operation on key 'count' failed: target is readonly."


</script>
