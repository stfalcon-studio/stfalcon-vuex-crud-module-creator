import * as types from "../mutation.types";

const BASIC_METADATA = {
  limit: 10,
  offset: 0,
  total: 0
};

const POINTER_METADATA = {
  before: 0,
  after: 50
};

function getDefaultSettings(type) {
  return type === "basic" ? BASIC_METADATA : POINTER_METADATA;
}

export default strategy => {
  return {
    state: {
      metadata: { ...(strategy.options || getDefaultSettings(strategy.type)) }
    },

    getters: {
      total: ({ metadata }) => (!metadata.total ? 0 : metadata.total)
    },

    mutations: {
      [types.UPDATE_METADATA](state, metadata) {
        state.metadata = metadata;
      }
    },

    actions: {
      clearMetadata({ commit }) {
        commit(
          types.UPDATE_METADATA,
          strategy.options || getDefaultSettings(strategy.type)
        );
      }
    }
  };
};
