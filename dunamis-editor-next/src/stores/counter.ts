import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return { count: 1234123 };
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
