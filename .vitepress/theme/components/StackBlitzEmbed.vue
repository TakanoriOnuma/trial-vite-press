<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useData } from "vitepress";
import sdk, { type EmbedOptions, type UiViewOption } from "@stackblitz/sdk";

const props = withDefaults(
  defineProps<{
    /** stackblitz.com/edit/<projectId> の projectId */
    projectId: string;
    /** 最初に開くファイル。カンマ区切りで複数可 */
    openFile?: string;
    /** editor / preview / default（両方） */
    view?: UiViewOption;
    /** iframe の高さ */
    height?: number | string;
    /** true なら「Run project」ボタンを押すまで起動しない（WebContainer の起動が重いので既定 true） */
    clickToLoad?: boolean;
    /** プレビュー上部の URL バーを隠す */
    hideNavigation?: boolean;
    /** 左のアクティビティバーを隠す */
    hideExplorer?: boolean;
    /** ターミナルの高さ（%） */
    terminalHeight?: number;
    /** 起動時に実行する npm script。未指定なら dev または start */
    startScript?: string;
  }>(),
  {
    openFile: undefined,
    view: "preview",
    height: 500,
    clickToLoad: true,
    hideNavigation: false,
    hideExplorer: false,
    terminalHeight: undefined,
    startScript: undefined,
  },
);

const { isDark } = useData();
const theme = computed(() => (isDark.value ? "dark" : "light"));

// embedProjectId は渡した要素を iframe に置き換える（置き換え後の DOM は Vue の管理外）。
// Vue が管理するのは外側のラッパーだけにし、プレースホルダーは毎回自前で作って渡す
const container = ref<HTMLDivElement>();

const embed = async () => {
  if (!container.value) return;
  container.value.replaceChildren();
  const placeholder = document.createElement("div");
  container.value.appendChild(placeholder);
  const options: EmbedOptions = {
    openFile: props.openFile,
    view: props.view,
    height: props.height,
    clickToLoad: props.clickToLoad,
    hideNavigation: props.hideNavigation,
    hideExplorer: props.hideExplorer,
    terminalHeight: props.terminalHeight,
    startScript: props.startScript,
    theme: theme.value,
    // 親ページが COOP/COEP で cross-origin isolated になっている前提で、
    // URL に corp=1 を付け、iframe に allow="cross-origin-isolated" を委譲する
    crossOriginIsolated: true,
  };
  await sdk.embedProjectId(placeholder, props.projectId, options);
};

onMounted(embed);

// テーマは URL の theme パラメータで決まるため、切り替え時は iframe を作り直す
watch(theme, embed);
</script>

<template>
  <div ref="container" class="stackblitz-embed" />
</template>

<style scoped>
.stackblitz-embed {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.stackblitz-embed :deep(iframe) {
  display: block;
  border: 0;
}
</style>
