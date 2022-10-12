declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'downloadjs' {
  import download from 'downloadjs';
  export default download;
}

declare module 'uuid' {
  import uuid from 'uuid';
  export default uuid;
}

declare module 'vue-device' {}
declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    count: number;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $refs: any;
    save: any;
    bus: any;
  }
}
