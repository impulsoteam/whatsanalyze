import Vue from "vue";
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: {
    id: "G-VRC5VJW3PB",
    // eslint-disable-next-line no-undef
    enabled: process.env.NUXT_ENV_LOCAL === undefined,
  },
});
