import Vue, { ComponentOptions } from 'vue'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    store?: object;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $store: object;
  }
}
