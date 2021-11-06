export default {

    // プラグインがアプリケーションに導入されるとき、
    // install メソッドがあればこれが、
    // function そのものであれば function が呼ばれる
    install: (app, options) => {
        // createApp から生じる app と、ユーザーから受け取るオプション

        // キーを変換する機能をアプリケーション全体で利用可能にするため、
        // app.config.globalProperties を利用する
        app.config.globalProperties.$translate = key => {
            // key 文字列を受け取り、ユーザーから与えられたオプションに従って
            // 翻訳された文字列を引き当てます。
            return key.split('.').reduce((o, i) => {
                if (o) return o[i]
            }, options)
        }
        // $translate('greetings.hello', {greetings:{hello:'Bonjour!'}})
        // -> 'Bonjour!' が返る

        // app にアクセスできるので、 mixin や directive の機能が使える
        app.directive('my-directive', {
            mounted(el, binding, vnode, oldVnode) {
                // 何らかのロジック ...
            }
        })

        app.mixin({
            created() {
                // 何らかのロジック ...
            }
        })

        // options パラメーターへのアクセスを許可する
        app.provide('i18n', options)
    }
}