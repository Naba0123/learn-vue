<template>
  <MyMarker/>
</template>

<script>
import {provide, reactive, readonly, ref} from 'vue'
import MyMarker from './MyMarker.vue'

export default {
  components: {
    MyMarker
  },
  setup() {
    // 値をリアクティブで指定
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    // 親コンポーネントの値を、子コンポーネント側で更新する必要がある場合、
    // 親側で更新関数を作成し、provide経由で子コンポーネントに渡すのが定石
    const updateLocation = () => {
      location.value = 'South Pole'
    }

    // 子コンポーネントへの受け渡し
    // readonly にすることで、子コンポーネント側では更新できなくなる
    provide('location', readonly(location))
    provide('geolocation', readonly(geolocation))
    provide('updateLocation', updateLocation)
  },
  // 普通に書くと以下のような書き方
  // provide: {
  //   location: 'North Pole',
  //   geolocation: {
  //     longitude: 90,
  //     latitude: 135
  //   }
  // }
}
</script>