# Embedded Examples

<script setup>
import counterCode from './examples/Counter.vue?raw'
import helloAppCode from './examples/HelloApp.vue?raw'
import greetingCode from './examples/Greeting.vue?raw'
</script>

## Vue SFC Playground

### Iframe

<iframe
  src="https://play.vuejs.org/#eNp9kUFLAzEQhf/KmMsq1F2l4qFsCyoF9aCiopeAlO10uzWbhGRSC8v+dycprT1Ib5n33ky+TDpxY22+DihGovSVayyBRwp2InXTWuMIOnC4gB4WzrSQcTSTWurKaE/Q+hrG0T/N7lEpA5/GqflJdiZ1WWzH8SAuCFurZoRcAZTLy0nXpea+LwuuktpoGwjW562ZoxpLwb4UULBZFgf9YiDI8/WLps5X3mgm72K/FJVpbaPQPVtqGE+KESQnejOm+3lMGrmAg51eLbH6/kdf+U3UpHhx6NGtUYq9RzNXI23t6dsTbvi8N5k+KE4fMV/RGxUi4zZ2G/ScsQ9yifYh7b/R9bufbgi13z0qgsZkn/JS8J/cHXn6H+4wv0p9Uve8xS/yH+jiVF7hdX6RD0X/CxF7rUQ="
  style="width: 100%; height: 500px; border: 1px solid var(--vp-c-divider); border-radius: 8px;"
></iframe>

### @vue/repl（単一ファイル）

`examples/Counter.vue` を `?raw` で文字列として読み込み、`App.vue` として渡しています。

<VuePlayground :files="{ 'App.vue': counterCode }" />

### @vue/repl（複数ファイル）

`files` に複数のファイルを渡すとタブで切り替えられます。`App.vue` がエントリーポイントになります。

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

| prop                  | 既定値     | 説明                                  |
| --------------------- | ---------- | ------------------------------------- |
| `files`               | 必須       | ファイル名 → コード。`App.vue` が必須 |
| `layout`              | `vertical` | `horizontal` / `vertical`             |
| `layout-reverse`      | `false`    | プレビューを先に配置                  |
| `show-output`         | `true`     | モバイル幅で最初にプレビューを表示    |
| `height`              | `560px`    | 全体の高さ                            |
| `vue-version`         | なし       | サンドボックスで使う Vue のバージョン |
| `show-compile-output` | `false`    | JS / CSS のコンパイル結果タブを表示   |
