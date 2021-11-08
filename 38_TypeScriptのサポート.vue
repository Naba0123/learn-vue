<script lang="ts">

// props にアノテーションを付ける場合は、 PropType を伴うコンストラクタをキャストする必要がある
import {computed, defineComponent, PropType, ref} from 'vue'
// globalProperties オブジェクトにパラメーターを追加するために、
// Module Augmentation を使って TypeScript にパラメーターの型を伝える
// 本来は src/typings/*.d.ts ファイルに記載する
import axios from 'axios'


// defineComponent グローバルメソッドを使用することで、
// Vueコンポーネントの中で適切に型を推論させる
interface Book {
  title: string
  author: string
  year: number
}

const Component = defineComponent({
  data() {
    return {
      book: {
        title: 'Vue 3 Guide',
        author: 'Vue Team',
        year: 2020
      } as Book
    }
  }
})

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $http: typeof axios
    $validate: (data: object, rule: object) => boolean
  }
}

const app = Vue.createApp({})
app.config.globalProperties.$http = axios

const Component2 = defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    // アノテーションが必要です
    greeting(): string {
      return this.message + '!'
    },

    // セッターを持つ算出プロパティのでは、ゲッターにアノテーションが必要です
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase()
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase()
      }
    }
  }
})

const Component3 = defineComponent({
  props: {
    name: String,
    id: [Number, String],
    success: {type: String},
    callback: {
      type: Function as PropType<() => void>
    },
    book: {
      type: Object as PropType<Book>,
      required: true
    },
    metadata: {
      type: null // metadata is typed as any
    },
    bookA: {
      type: Object as PropType<Book>,
      // 必ずアロー関数を使うこと
      default: () => ({
        title: 'Arrow Function Expression'
      }),
      validator: (book: Book) => !!book.title
    },
    bookB: {
      type: Object as PropType<Book>,
      // または明示的にこのパラメータを提供する
      default(this: void) {
        return {
          title: 'Function Expression'
        }
      },
      validator(this: void, book: Book) {
        return !!book.title
      }
    }
  }
})


const Component4 = defineComponent({
  props: {
    message: {
      type: String,
      required: true
    }
  },

  // ここの props は上の props から型を勝手に推論してくれるので型を書かなくてOK
  setup(props) {
    const result = props.message.split('') // 正しいです, 'message' は文字列 (string) として型づけされます
    const filtered = props.message.filter(p => p.value) // エラーが起こります: Property 'filter' does not exist on type 'string'

    // ref から型を推論する
    const year = ref(2020)
    const result2 = year.value.split('') // => Property 'split' does not exist on type 'number'

  }
})


const MyModal = defineComponent({
  setup() {
    const isContentShown = ref(false)
    const open = () => (isContentShown.value = true)

    return {
      isContentShown,
      open
    }
  }
})

defineComponent({
  components: {
    MyModal
  },
  template: `
    <button @click="openModal">Open from parent</button>
    <my-modal ref="modal"/>
  `,
  setup() {
    // InstanceType を使って、modal の型を指定する
    const modal = ref<InstanceType<typeof MyModal>>()
    const openModal = () => {
      modal.value?.open()
    }

    return {modal, openModal}
  }
})

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const book1 = reactive<Book>({title: 'Vue 3 Guide'})
    // もしくは
    const book2: Book = reactive({title: 'Vue 3 Guide'})
    // もしくは
    const book3 = reactive({title: 'Vue 3 Guide'}) as Book
  }
})

defineComponent({
  name: 'CounterButton',
  setup() {
    let count = ref(0)

    // 読み取り専用 computed は勝手に型を推論してくれる
    const doubleCount = computed(() => count.value * 2)

    const result = doubleCount.value.split('') // Property 'split' does not exist on type 'number'
  }
})

defineComponent({
  setup() {
    // evt に型を指定してあげないと、anyになってしまい、TypeScriptがエラーになる
    const handleChange = (evt: Event) => {
      console.log(evt.target.value)
    }

    return {handleChange}
  }
})


</script>