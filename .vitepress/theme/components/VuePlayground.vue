<script setup lang="ts">
import { ref, shallowRef, computed, onMounted } from "vue";
import { useData } from "vitepress";
import { Repl, useStore, type ReplProps } from "@vue/repl";

const props = withDefaults(
  defineProps<{
    /** ファイル名 → コード。`App.vue` が必須（エントリーポイント） */
    files: Record<string, string>;
    /**
     * エディタの種類。
     * - codemirror: 軽量。1 ページに複数配置しても安全（既定）
     * - monaco: 補完・型推論付き。Monaco のモデルがページ全体で
     *   `file:///src/App.vue` のような URI で共有されるため、1 ページに 1 つまで
     */
    editor?: "codemirror" | "monaco";
    /** エディタとプレビューの並び。コンテンツ幅が狭いので縦が既定 */
    layout?: "horizontal" | "vertical";
    /** true でプレビューを上（または左）に配置 */
    layoutReverse?: boolean;
    /** モバイル幅（721px 未満）で最初にプレビューを表示するか */
    showOutput?: boolean;
    /** 全体の高さ */
    height?: string;
    /** サンドボックスで使う Vue のバージョン。未指定なら @vue/repl 既定 */
    vueVersion?: string;
    /** 右ペインに JS / CSS / SSR のコンパイル結果タブを出すか */
    showCompileOutput?: boolean;
  }>(),
  {
    editor: "codemirror",
    layout: "vertical",
    layoutReverse: false,
    showOutput: true,
    height: "560px",
    vueVersion: undefined,
    showCompileOutput: false,
  },
);

const { isDark } = useData();
const theme = computed(() => (isDark.value ? "dark" : "light"));

const store = useStore({
  showOutput: ref(props.showOutput),
  outputMode: ref("preview"),
  vueVersion: ref(props.vueVersion ?? null),
});

// useStore は serializedState を渡さないと App.vue をウェルカムコードで上書きするため、
// 初期化後に setFiles() で差し替える（ファイル名の src/ プレフィックス付与も任せる）
store.setFiles(props.files, "App.vue");

// エディタは使うものだけ遅延読み込みする（Monaco はバンドルが大きい）
const editorComponent = shallowRef<ReplProps["editor"]>();
onMounted(async () => {
  const mod =
    props.editor === "monaco"
      ? await import("@vue/repl/monaco-editor")
      : await import("@vue/repl/codemirror-editor");
  editorComponent.value = mod.default;
});
</script>

<template>
  <div class="vue-playground" :style="{ height }">
    <Repl
      v-if="editorComponent"
      :store="store"
      :editor="editorComponent"
      :theme="theme"
      :preview-theme="true"
      :layout="layout"
      :layout-reverse="layoutReverse"
      :show-compile-output="showCompileOutput"
      :show-import-map="false"
      :show-ts-config="false"
      :clear-console="false"
      :auto-resize="true"
    />
  </div>
</template>

<style scoped>
.vue-playground {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.vue-playground :deep(.vue-repl) {
  height: 100%;
}
</style>
