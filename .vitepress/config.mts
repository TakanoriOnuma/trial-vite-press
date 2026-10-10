import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Trial VitePress",
  description: "A VitePress Site",
  vite: {
    // @vue/repl の README で指示されている設定
    optimizeDeps: {
      exclude: ["@vue/repl"],
    },
    plugins: [
      {
        // StackBlitz 埋め込み（WebContainers）に必要な cross-origin isolation 用ヘッダーを
        // dev サーバーの全レスポンスに付ける。
        // Vite の `server.headers` は VitePress が HTML を返す独自ミドルウェアには効かないため、
        // プラグインのミドルウェアとして先頭に差し込む。
        // `vitepress preview` は Vite ではなく独自サーバー（polka + sirv）なのでこの設定は効かない。
        // 本番（Cloudflare Pages）では public/_headers で同じヘッダーを付ける。
        name: "cross-origin-isolation-headers",
        configureServer(server) {
          server.middlewares.use((_req, res, next) => {
            res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
            res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
            next();
          });
        },
      },
    ],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
          { text: "Embedded Examples", link: "/embedded-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
