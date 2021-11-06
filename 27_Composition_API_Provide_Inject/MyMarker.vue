<script>

import {inject} from 'vue'


export default {
  setup() {
    // 親コンポーネントからの受け渡し
    const userLocation = inject('location', 'The Universe')  // 第2引数はデフォルト値
    const userGeolocation = inject('geolocation')
    const updateUserLocation = inject('updateLocation')

    return {
      userLocation,
      userGeolocation,
      updateUserLocation,
    }
  }
}
</script>