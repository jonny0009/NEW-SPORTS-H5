// src/store/index.ts
import { createStore, StoreOptions, CommitOptions, MutationTree } from 'vuex';
import * as types from './mutation-types';
import { TabsNamePc } from '@/model'
// 定义 state 类型
interface State {
  currentTab: TabsNamePc;
}
// 定义 mutations 类型
type Mutations<S = State> = {
  [types.PC_ON_CHANGE_TAB](state: S, payload?: TabsNamePc): void;
};
// 定义 store 选项
const storeOptions: StoreOptions<State> = {
  state: {
    currentTab: TabsNamePc.Sport
  },
  mutations: {
    [types.PC_ON_CHANGE_TAB](state, value) {
      state.currentTab = value;
    }
  } as MutationTree<State>,
  actions: {
    increment({ commit }, payload?: TabsNamePc) {
      commit(types.PC_ON_CHANGE_TAB, payload);
    }
  }
};
const store = createStore(storeOptions);
// 提供类型化的 commit 方法
const commit = <K extends keyof Mutations>(
  key: K,
  payload?: Parameters<Mutations[K]>[1],
  options?: CommitOptions
) => {
  store.commit(key, payload, options);
};
export default store;
export { commit };