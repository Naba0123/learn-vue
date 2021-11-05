<script lang="js">

// MyBook.vue

export default {
  setup() {
    // mounted
    onMounted(() => {
      console.log('Component is mounted!')
    })

    // beforeMount
    onBeforeMount(() => {
      console.log('Component is beforeMount!')
    })

    // mounted
    onMounted(() => {
      console.log('Component is mounted!')
    })

    // beforeUpdate
    onBeforeUpdate(() => {
      console.log('Component is beforeUpdate!')
    })

    // updated
    onUpdated(() => {
      console.log('Component is updated!')
    })

    // beforeUnmount
    onBeforeUnmount(() => {
      console.log('Component is beforeUnmount!')
    })

    // unmounted
    onUnmounted(() => {
      console.log('Component is unmounted!')
    })

    // errorCaptured
    onErrorCaptured(() => {
      console.log('Component is errorCaptured!')
    })

    // renderTracked
    onRenderTracked(() => {
      console.log('Component is renderTracked!')
    })

    // renderTriggered
    onRenderTriggered(() => {
      console.log('Component is renderTrigger!')
    })

    // activated
    onActivated(() => {
      console.log('Component is activated!')
    })

    // deactivated
    onDeactivated(() => {
      console.log('Component is deactivated!')
    })
  }
}

</script>