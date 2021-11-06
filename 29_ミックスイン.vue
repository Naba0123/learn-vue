<script lang="js">

// ミックスインの機能によって、別のコンポーネントに混ぜることができる

// ミックスインオブジェクトを定義
const myMixin = {
  data() {
    return {
      message: 'hello',
      foo: 'abc'
    }
  },
  created() {
    this.hello()
  },
  methods: {
    hello() {
      console.log(this.$data)
    }
  },
}

// このミックスインを使用する app を定義
const app = Vue.createApp({
  mixins: [myMixin],
  data() {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  myOption: 'hello!',
  custom: 'hello!',
})

// `myOption` カスタムオプションにハンドラを注入する
// グローバルミックスインを使用すると、これ以降に作成される全てのVueコンポーネントインスタンス
// （例えば子コンポーネント）に影響する
app.mixin({
  created() {
    const myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  },
  custom: 'goodbye!',
})

// マージストラテジ
// カスタムオプションがマージされるとき、そのマージのされ方を指定できる
app.config.optionMergeStrategies.custom = (toVal, fromVal) => {
  console.log(fromVal, toVal)
  // => "goodbye!", undefined  | mixin 側から
  // => "hello", "goodbye!"  | app 側から
  return fromVal || toVal  // fromVal が優先
}

// いい感じに混ざる。ミックスインされる側が優先される
app.mount('#mixins-basic') // => { message: "goodbye", foo: "abc", bar: "def" }

</script>