declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: any;
    sync: any;
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
