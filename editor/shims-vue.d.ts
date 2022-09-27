declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '*.vue' {
  const entry: any;
  export { entry };
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: any;
    setThemes: any;
  }
}

declare module 'vuex-pathify' {
  // Here should be defined added features to vuex and stores
  // import vuex, { Store } from "vuex";

  // Signatures from https://davestewart.github.io/vuex-pathify/#/api/accessors
  interface sync {
    get: (path: string) => any;
    set: (path: string, value: any) => any | Promise<any>;
  }
}
