<script>

// プライベートべソッドを外部から利用できないようにする
const myGreatMixin = {
  // ...
  methods: {
    publicMethod() {
      // ...
      myPrivateFunction()
    }
  }
}

function myPrivateFunction() {
  // ...
}

export default myGreatMixin

</script>