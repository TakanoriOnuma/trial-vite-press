# Embedded Examples

## StackBlitz

### Iframe

<iframe
  src="https://stackblitz.com/edit/vitejs-vite-g9mvnye1?ctl=1&embed=1&file=src%2FApp.tsx&view=preview&corp=1"
  allow="cross-origin-isolated"
  style="width: 100%; height: 500px; border: 1px solid var(--vp-c-divider); border-radius: 8px;"
></iframe>

### @stackblitz/sdk

`embedProjectId` に `crossOriginIsolated: true` を渡すと、URL への `corp=1` 付与と `allow="cross-origin-isolated"` の委譲を SDK がやってくれます。`theme` は VitePress のダークモードに追従します。

<StackBlitzEmbed project-id="vitejs-vite-g9mvnye1" open-file="src/App.tsx" />

```md
<StackBlitzEmbed project-id="vitejs-vite-g9mvnye1" open-file="src/App.tsx" />
```

| prop              | 既定値    | 説明                                                         |
| ----------------- | --------- | ------------------------------------------------------------ |
| `project-id`      | 必須      | `stackblitz.com/edit/<projectId>` の projectId               |
| `open-file`       | なし      | 最初に開くファイル。カンマ区切りで複数可                     |
| `view`            | `preview` | `editor` / `preview` / `default`（両方）                     |
| `height`          | `500`     | iframe の高さ                                                |
| `click-to-load`   | `true`    | 「Run project」を押すまで WebContainer を起動しない          |
| `hide-navigation` | `false`   | プレビュー上部の URL バーを隠す                              |
| `hide-explorer`   | `false`   | 左のアクティビティバーを隠す                                 |
| `terminal-height` | なし      | ターミナルの高さ（%）                                        |
| `start-script`    | なし      | 起動時に実行する npm script。未指定なら `dev` または `start` |

## Vue SFC Playground

<script setup>
import counterCode from './examples/Counter.vue?raw'
import helloAppCode from './examples/HelloApp.vue?raw'
import greetingCode from './examples/Greeting.vue?raw'
</script>

### Iframe

<iframe
  src="https://play.vuejs.org/#eNp9kUFLAzEQhf/KmMsq1F2l4qFsCyoF9aCiopeAlO10uzWbhGRSC8v+dycprT1Ib5n33ky+TDpxY22+DihGovSVayyBRwp2InXTWuMIOnC4gB4WzrSQcTSTWurKaE/Q+hrG0T/N7lEpA5/GqflJdiZ1WWzH8SAuCFurZoRcAZTLy0nXpea+LwuuktpoGwjW562ZoxpLwb4UULBZFgf9YiDI8/WLps5X3mgm72K/FJVpbaPQPVtqGE+KESQnejOm+3lMGrmAg51eLbH6/kdf+U3UpHhx6NGtUYq9RzNXI23t6dsTbvi8N5k+KE4fMV/RGxUi4zZ2G/ScsQ9yifYh7b/R9bufbgi13z0qgsZkn/JS8J/cHXn6H+4wv0p9Uve8xS/yH+jiVF7hdX6RD0X/CxF7rUQ="
  style="width: 100%; height: 500px; border: 1px solid var(--vp-c-divider); border-radius: 8px;"
></iframe>

### @vue/repl（単一ファイル・Monaco エディタ）

`examples/Counter.vue` を `?raw` で文字列として読み込み、`App.vue` として渡しています。`editor="monaco"` で補完・型推論付きの Monaco エディタになります。

<VuePlayground :files="{ 'App.vue': counterCode }" editor="monaco" />

### @vue/repl（複数ファイル・CodeMirror エディタ）

`files` に複数のファイルを渡すとタブで切り替えられます。`App.vue` がエントリーポイントになります。エディタは既定の CodeMirror です。

<VuePlayground
  :files="{ 'App.vue': helloAppCode, 'Greeting.vue': greetingCode }"
  height="640px"
/>

### @vue/repl の使い方

```md
<script setup>
import counterCode from './examples/Counter.vue?raw'
</script>

<VuePlayground :files="{ 'App.vue': counterCode }" />
```

| prop                  | 既定値       | 説明                                                                                               |
| --------------------- | ------------ | -------------------------------------------------------------------------------------------------- |
| `files`               | 必須         | ファイル名 → コード。`App.vue` が必須                                                              |
| `editor`              | `codemirror` | `codemirror` / `monaco`。Monaco はエディタのモデルがページ全体で共有されるため 1 ページに 1 つまで |
| `layout`              | `vertical`   | `horizontal` / `vertical`                                                                          |
| `layout-reverse`      | `false`      | プレビューを先に配置                                                                               |
| `show-output`         | `true`       | モバイル幅で最初にプレビューを表示                                                                 |
| `height`              | `560px`      | 全体の高さ                                                                                         |
| `vue-version`         | なし         | サンドボックスで使う Vue のバージョン                                                              |
| `show-compile-output` | `false`      | JS / CSS のコンパイル結果タブを表示                                                                |
