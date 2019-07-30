import * as types from "../mutation.types";

export default (options) => {
  return {
    state: {
      metadata: { ...options },
    },

    getters: {
      metadata: ({ metadata }) => metadata,
    },

    mutations: {
      [types.UPDATE_METADATA](state, metadata) {
        state.metadata = { ...state.metadata, ...metadata };
      }
    },

    actions: {
      updateMetadata({ commit }, params = options) {
        commit(types.UPDATE_METADATA, params);
      }
    }
  };
};
