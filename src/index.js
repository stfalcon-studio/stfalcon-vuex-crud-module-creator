import globalConfig from "./config";
import crud from "./parts/crud";
import searchParams from "./parts/searchParams";

const defaultOptions = {
  strategy: {
    type: "basic"
  },
  getKey: () => "id"
};

export const createModule = (
  moduleName,
  { endpoint, getKey, transportAdapter, paginationStrategy },
  { namespaced, state, getters, mutations, actions, modules } = {}
) => {
  const options = {
    transportAdapter,
    getKey: getKey || defaultOptions.getKey,
    strategy: paginationStrategy || defaultOptions.strategy
  };

  return {
    moduleName,
    namespaced: namespaced || true,

    modules: {
      searchParams: searchParams(options.strategy),
      crud: crud({
        endpoint: endpoint || moduleName,
        ...options
      }),
      ...modules
    },

    state,
    getters,
    mutations,
    actions
  };
};

createModule.configure = (...params) => {
  Object.assign(globalConfig, ...params);
};
