import {fetchUserRepositories} from '@/api/repositories'
import {onMounted, ref, watch} from 'vue'


export default function useUserRepositories(user) {

    let repositories = ref([])  // リファレンス
    const getUserRepositories = async () => {
        repositories.value = await fetchUserRepositories(user.value)
    }

    // mounted 実行時に呼ばれる
    onMounted(getUserRepositories)


    // watch
    //  第1引数 リアクティブな参照 または 監視するゲッター関数
    //  第2引数 コールバック
    //  第3引数 任意の設定オプション
    watch(user, getUserRepositories)  // user に変更があれば getUserRepositories が呼ばれる

    // ここで返されるものはコンポーネントの他のオプションで使用可能
    return {
        repositories,
        getUserRepositories,  // 関数を返すと、methods と同じ振る舞いをする
    }
}