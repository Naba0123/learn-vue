<template>

</template>

<script>

import {computed, ref, toRefs} from 'vue'
import useUserRepositories from './useUserRepositories'
import useRepositoryNameSearch from './useRepositoryNameSearch'
import useRepositoryFilters from './useRepositoryFilters'

export default {
  components: {RepositoriesFilters, RepositoriesSortBy, RepositoriesList},
  props: {
    user: {
      type: String,
      required: true,
    }
  },
  // setup は data, computed, methods が解決される前に呼ばれる
  setup(props) {
    console.log(props)  // { user: '' }

    // props の `user` プロパティへのリアクティブな参照を作成するために `toRefs` を使用します
    const {user} = toRefs(props)

    const {repositories, getUserRepositories} = useUserRepositories(user)

    const {
      searchQuery,
      repositoriesMatchingSearchQuery
    } = useRepositoryNameSearch(repositories)

    const {
      filters,
      updateFilters,
      filteredRepositories
    } = useRepositoryFilters(repositoriesMatchingSearchQuery)

    // ここで返されるものはコンポーネントの他のオプションで使用可能
    return {
      // 絞り込まれていないリポジトリはあまり考慮しないので、
      // 絞り込んだ結果を `repositories` という名前で返して良いでしょう
      repositories: filteredRepositories,
      getUserRepositories,
      searchQuery,
      filters,
      updateFilters
    }
  }
}

// 0という値のリファレンスが counter に入る
// なぜこういう事をするかというと、JavaScriptが値はプリミティブだから。
const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2)  // 読み取り専用のリアクティブな参照
counter.value  // 0
counter.value++
counter.value  // 1
twiceTheCounter.value  // 2


</script>

<style scoped>

</style>