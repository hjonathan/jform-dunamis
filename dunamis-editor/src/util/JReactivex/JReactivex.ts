//@ts-nocheck
import Vue from 'vue';
import _ from 'lodash';
export default class JReactivex {
  bus: any;
  joinForkArray: any[];
  events: any[];
  channels: any;
  topics: any[];
  constructor() {
    this.bus = new Vue();
    this.joinForkArray = [];
    this.events = [];
    this.channels = {};
    this.topics = [];
  }
  emit(event: any, payload: any) {
    this.bus.$emit(event, payload);
  }
  diffEvents(newArrayEvents: any) {
    const dif = _.difference(newArrayEvents, this.events);
    this.events = this.events.concat(dif);
    return dif;
  }
  unregister(arrJoin: any, arrEvents: any) {
    if (arrJoin.length != 0) {
      arrJoin.forEach((el: string) => {
        _.remove(this.joinForkArray, (n) => {
          return n.id === el;
        });
      });
    }
    if (arrEvents.length != 0) {
      arrEvents.forEach((el: string) => {
        _.remove(this.events, (n) => {
          return n === el;
        });
      });
    }
  }
  joinFork(arr: any, handler: any, id: any) {
    const evs = this.diffEvents(arr);
    if (evs.length != 0 && !_.find(this.joinForkArray, { id: id })) {
      this.joinForkArray.push({
        id: id || '',
        events: arr,
        payload: {},
        handler: handler || new Function(),
      });
      _.forEach(evs, (el) => {
        this.bus.$on(el, (d: any) => {
          let inter;
          _.forEach(this.joinForkArray, function (o) {
            if (!(_.indexOf(o.events, el) == -1)) {
              o.payload[el] = d;
              inter = _.intersection(_.keys(o.payload), o.events);
              if (inter.length == o.events.length) {
                Vue.nextTick(function () {
                  o.handler(o.payload);
                });
              }
            }
          });
        });
      });
    }
    return () => {
      this.unregister([id], arr);
    };
  }
}
