<template>

</template>

<script>

import {computed, watchEffect} from "vue"
// 値のディープコピーをすることが必要になることもある
import _ from 'lodash'

const count = ref(1)
// computed: getter 関数を引数に受け取り、関数の返り値に対して、イミュータブルでリアクティブな ref オブジェクトを返却する
const plusOne = computed(() => count.value + 1)
console.log(plusOne.value) // 2
// 読み込み専用
plusOne.value++ // error

// get と set を用意することで、書き込み可能にすることもできる
const count2 = ref(1)
const plusOne2 = computed({
  get: () => count2.value + 1,
  set: val => {
    count2.value = val - 1
  }
})
plusOne.value = 1
console.log(count.value) // 0

// 第２引数 onTrack: リアクティブプロパティかrefが依存関係として追跡されるときに呼ばれる
// 第３引数 onTrigger: watcher コールバックが依存関係の変更によってトリガーされるときに呼ばれる
const plusOne3 = computed(() => count.value + 1, {
  // 両方、デバッガー用イベントを受け取る
  onTrack(e) {
    // triggered when count.value is tracked as a dependency
    debugger
  },
  onTrigger(e) {
    // triggered when count.value is mutated
    debugger
  }
})
consol.log(plusOne.value)  // onTrack が呼ばれる
count.value++  // onTrigger が呼ばれる


// watchEffect: 依存関係をリアクティブにトラッキングし、変更されるたびに即座に再実行する
// setup() またはライフサイクルフック内で実行すると、アンマウント時に自動的に監視が停止する
const count3 = ref(0)

const stop3 = watchEffect(() => console.log(count3.value))
// -> logs 0

setTimeout(() => {
  count3.value++
  // -> logs 1
}, 100)

// 手動で監視を停止させることも可能
stop3()

// 作用実行中に更に状態が変化したとき（実行中を無効化したいとき）
// 第一引数に onInvalidate（コールバックを無効化する関数）を受け取ることができ、以下のタイミングで実行される
// ・該当の作業が再度実行された場合
// ・ウォッチャが停止した場合（対象のコンポーネントがアンマウントされたとき）
watchEffect(onInvalidate => {
  const token = performAsyncOperation(id.value)
  onInvalidate(() => {
    // ID が変更されたまたはウォッチャが停止した
    // 以前に pending となった非同期の処理を無効にする
    token.cancel()
  })
})

const data = ref(null)
watchEffect(async onInvalidate => {
  // Promise が resolve される前にクリーンアップ関数を登録する必要があります。
  // Vue は、 Promise チェーンにおける潜在的なエラーを自動的に処理するため、
  // 返却される Promise に依存しています。
  onInvalidate(() => {
    /* ... */
  }) // Promise の解決前にクリーンアップする関数を登録
  data.value = await fetchData(props.id)
})

// 作用フラッシュのタイミングは、非同期に処理をしている
// 複数の状態変換に対して、不要な重複の呼び出しを避けることができる
export default {
  setup() {
    const count = ref(0)

    // ユーザーによる作用がキューに入っている場合、デフォルトではすべてのコンポーネントの更新の前に呼び出される
    watchEffect(() => {
        // コンポーネントの変更前に呼ばれる
        console.log(count.value)
      },
      // 第２引数で flush:'post' を渡すことでコンポーネントの更新後にウォッチャの作用を再実行する
      {
        flush: 'post',  // default は pre | sync もあるけどほとんど使わない
        // ↓開発モードのみで動作
        onTrigger(e) {  // 依存関係の変更によって、ウォッチャコールバック関数がトリガーされているときに実行
          debugger
        },
        onTrack(e) {  // リアクティブプロパティもしくはrefが依存関係として追跡されているときに実行
          debugger
        }
      })

    return {
      count
    }
  }
}


// watch

// getter 関数を渡すパターン
const state = reactive({count: 0})
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

// 直接 ref を渡すパターン
const count4 = ref(0)
watch(
  count,
  (count, prevCount) => {
    /* ... */
  }
)


const firstName = ref('')
const lastName = ref('')
// 配列を使うことで、複数のデータソースを同時に監視できる
watch([firstName, lastName], (newValues, prevValues) => {
  console.log(newValues, prevValues)
})

firstName.value = 'John' // logs: ["John", ""] ["", ""]
lastName.value = 'Smith' // logs: ["John", "Smith"] ["John", ""]


export default {
  setup() {
    const firstName = ref('')
    const lastName = ref('')

    watch([firstName, lastName], (newValues, prevValues) => {
      console.log(newValues, prevValues)
    })

    // 監視しているソースの両方を同時に変更している場合は、ウォッチャーは1度だけ実行される
    const changeValues = () => {
      firstName.value = 'John'
      lastName.value = 'Smith'
      // logs: ["John", "Smith"] ["", ""]
    }

    // nextTick をすることで、明示的にウォッチャーの実行を待つことができる
    const changeValues2 = async () => {
      firstName.value = 'John' // logs: ["John", ""] ["", ""]
      await nextTick()
      lastName.value = 'Smith' // logs: ["John", "Smith"] ["John", ""]
    }

    return {changeValues}
  }
}


// リアクティブな配列やオブジェクトの値を比較するには、値だけのコピーを作っておく必要がある
const numbers = reactive([1, 2, 3, 4])

watch(
  () => [...numbers],  // ただ配列だけを渡すと、配列自体の変更は検知するが、中身の変更は検知してくれない
  (numbers, prevNumbers) => {
    console.log(numbers, prevNumbers)
  }
)

numbers.push(5) // logs: [1,2,3,4,5] [1,2,3,4]


// 深くネストした配列やオブジェクトの場合は、 deep: true にすることで中身の変更のチェックがでいるようになる
const state = reactive({
  id: 1,
  attributes: {
    name: ''
  }
})

// これは中身の変更は検知しない
watch(
  () => state,
  (state, prevState) => {
    console.log('not deep', state.attributes.name, prevState.attributes.name)
  }
)

// これは中身の変更も検知する
watch(
  () => state,
  (state, prevState) => {
    console.log('deep', state.attributes.name, prevState.attributes.name)
  },
  {deep: true}
)

state.attributes.name = 'Alex' // Logs: "deep" "Alex" "Alex"

const state = reactive({
  id: 1,
  attributes: {
    name: ''
  }
})

watch(
  () => _.cloneDeep(state),
  (state, prevState) => {
    console.log(state.attributes.name, prevState.attributes.name)
  }
)

state.attributes.name = 'Alex'; // Logs: "Alex" ""


</script>
