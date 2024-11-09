# docsify-search-highlighter

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Docsify](https://img.shields.io/badge/docsify-32C855?logo=docsify&logoColor=white)

## Overview

これは、[docsify](https://docsify.js.org/#/) の検索機能関連のカスタムプラグインです。
具体的には、指定されている検索キーワードのハイライト処理を行います。

## Demo

![demo](/docs/demo.gif)

## Usage

このプラグインは、docsifyの検索機能を前提としているため、[docsifyの検索機能を有効化](https://docsify.js.org/#/plugins?id=full-text-search)する必要があります。<br>
`search.placeholder` を必ず設定してください。

`searchHighlightColor` はこのプラグイン専用の設定値になります。
このプロパティで、ハイライト色を指定できます。<br>
このプロパティは必須ではありません。もし設定しない場合はデフォルト値（`yellow`）が設定されます。

```
window.$docsify = {
    ...,
    ...,
    search: {
        maxAge: 1,
        depth: 2,
        hideOtherSidebarContent: false,
        placeholder: 'Type to search',
        noData: 'No Results!',
    },
    searchHighlightColor: 'orange',
}
```

## References

https://docsify.js.org/#/write-a-plugin
