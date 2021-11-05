import {computed, ref} from 'vue'

export default function useRepositoryNameSearch(repositories) {
    const searchQuery = ref('')
    const repositoriesMatchingSearchQuery = computed(() => {
        return repositories.value.filter(repository => {
            return repository.name.includes(searchQuery.value)
        })
    })

    // ここで返されるものはコンポーネントの他のオプションで使用可能
    return {
        searchQuery,
        repositoriesMatchingSearchQuery
    }
}