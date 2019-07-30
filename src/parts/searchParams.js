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
        console.log(metadata);
        state.metadata = { ...state.metadata, ...metadata };
      }
    },

    actions: {
      clearMetadata({ commit }) {
        commit(types.UPDATE_METADATA, options);
      }
    }
  };
};
