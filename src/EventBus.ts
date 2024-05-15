// 创建一个 EventBus 实例用于发布-订阅
export const EventBus = {
  // 用于存储事件和对应的回调函数
  callbacks: {},

  // 发布事件的方法
  emit(event, ...args) {
    if (this.callbacks[event]) {
      // 如果有对应的事件回调函数，则依次执行
      this.callbacks[event].forEach(callback => callback(...args));
    }
  },

  // 订阅事件的方法
  on(event:any, callback:any) {
    if (!this.callbacks[event]) {
      // 如果没有该事件的回调函数数组，则初始化一个空数组
      this.callbacks[event] = [];
    }
    // 将回调函数推入数组
    this.callbacks[event].push(callback);
  }
};