import colors from "vuetify/es5/util/colors";
import fs from "fs";
import { messages } from "./utils/translations.js";

// eslint-disable-next-line no-undef
let local = process.env.NUXT_ENV_LOCAL !== undefined;

const baseUrl = ( // eslint-disable-next-line no-undef
  process.env.BASE_URL || "https://www.whatsanalyze.com"
).replace("http:", "https:");

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: "en",
    },

    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // bing indexing
      { name: "msvalidate.01", content: "E04DE33CC93C0FF892248C9E70A9A918" },
      {
        hid: "og:image",
        property: "og:image",
        content: baseUrl + "/sharePreview.png",
      },
    ],
    link: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/favicon.ico" },
    ],
  },
  pwa: {
    manifest: {
      name: "WhatsAnalyze - The WhatsApp Chat Analyzer",
      short_name: "WhatsAnalyze",
      start_url: "/",
      display: "standalone",
      background_color: "#21a68d",
      theme_color: "#000000",
      lang: "en",
      useWebmanifestExtension: true,
      share_target: {
        action: "/pwa-results?share-target=1",
        method: "POST",
        enctype: "multipart/form-data",
        params: {
          title: "name",
          text: "description",
          url: "link",
          files: [
            {
              name: "file",
              accept: ["*/*"],
            },
          ],
        },
      },
    },
    workbox: {
      importScripts: ["custom-sw.js"],
      dev: local,
    },
    icon: {
      source: "/assets",
      fileName: "whatsanalyze-logo-black-PWA.png",
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/gtag",
    {
      src: "~/plugins/amcharts.js",
      ssr: false,
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "nuxt-compress",
  ],
  "nuxt-compress": {
    gzip: {
      cache: true,
    },
    brotli: {
      threshold: 10240,
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxt/content", "@nuxtjs/pwa", "@nuxtjs/gtm", "nuxt-i18n"],
  i18n: {
    seo: true,
    locales: [
      {
        code: "en",
        iso: "en-US",
      },
      {
        code: "de",
        iso: "de-DE",
      },
    ],
    defaultLocale: "en",
    detectBrowserLanguage: {
      alwaysRedirect: false,
      fallbackLocale: "en",
      onlyOnRoot: true,
      useCookie: true,
      cookieCrossOrigin: false,
      cookieKey: "i18n_redirected",
      cookieSecure: false,
    },
    vueI18n: {
      fallbackLocale: "en",
      messages: messages,
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  gtm: {
    id: "GTM-W32PNH3",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev }) {
      // Sets webpack's mode to development if `isDev` is true.
      if (isDev) {
        config.mode = "development";
      }
    },
  },
  server: {
    host: "0.0.0.0",
    https:
      // eslint-disable-next-line no-undef
      process.env.NODE_ENV !== "production" || local
        ? {
            key: fs.readFileSync("./0.0.0.0.key"),
            cert: fs.readFileSync("./0.0.0.0.crt"),
          }
        : {},
  },
  env: {
    paypalClientId: local
      ? "ARYQUp4C_oNjNUNkvSPzLeaiulItDmnHUU226OANt2haCKC2c70ZrKZTmRHCPldcu4SD22LmPEuonfec"
      : "AUMWxSZrtBOA1RicR_3nGijYb8yYxyq2lxBjiwoQKfVc-8jfdPr5N7X5EFUackMCLb_K7HiKswnDBUJ8",
    baseUrl: baseUrl,
  },
};
