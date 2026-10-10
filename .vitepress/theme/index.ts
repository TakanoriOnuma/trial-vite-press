import DefaultTheme from "vitepress/theme";
import { defineClientComponent } from "vitepress";
import type { Theme } from "vitepress";

// @vue/repl はブラウザ API に依存するため、SSR 時には読み込まず
// クライアント側でのみ遅延読み込みする
const VuePlayground = defineClientComponent(
  () => import("./components/VuePlayground.vue"),
);

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("VuePlayground", VuePlayground);
  },
} satisfies Theme;
