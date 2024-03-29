import Vue from "vue";

import globalConfig from "../config";
import * as types from "../mutation.types";
import { createUrl } from "../utils";

export default ({ endpoint, transportAdapter, getKey }) => {
  const transport = () => transportAdapter || globalConfig.transport;

  return {
    state: {
      entities: null
    },

    getters: {
      isEmpty: ({ entities }) => entities && !Object.keys(entities).length,
      entities: ({ entities }) => entities,
      entity: ({ entities }) => key => entities && entities[key]
    },

    mutations: {
      [types.CREATE](state, payload) {
        const key = getKey(payload);
        Vue.set(state.entities, key, payload);
      },
      [types.UPDATE](state, payload) {
        const key = getKey(payload);
        Vue.set(state.entities, key, payload);
      },
      [types.REMOVE](state, id) {
        Vue.delete(state.entities, id);
      },
      [types.RESET](state) {
        state.entities = null;
      },
      [types.SET](state, payload) {
        const isArray = Array.isArray(payload);

        if (isArray) {
          const collection = payload.reduce((acc, current) => {
            const key = getKey(current);
            return { ...acc, [key]: current };
          }, {});

          state.entities = { ...state.entities, ...collection };
        } else {
          const key = getKey(payload);
          state.entities = {
            ...state.entities,
            ...{ [key]: payload }
          };
        }
      },
    },

    actions: {
      async $create({ commit }, { data }) {
        const response = await transport().post(endpoint, data);
        commit(types.CREATE, response);

        console.info('CREATED ENTITY', response);
        return response;
      },
      async $read({ commit, getters }, { id, params, ...rest } = {}) {
        // eslint-disable-next-line
        const { totalCount, offset, limit, ...cachedMetadata } = getters.metadata;
        const url = createUrl(endpoint, rest);
        const response = await transport().get(
          `${url}${id ? "/" + id : ""}`,
          {
            params: {
              ...(!id && cachedMetadata),
              ...params
            }
          }
        );

        const PREFIX = response.results ? 'LIST' : 'ENTITY';

        commit(types.UPDATE_METADATA, response.totalCount && {
          ...cachedMetadata,
          totalCount: response.totalCount,
        });
        commit(types.SET, response.results || response);

        console.info(`GET ${PREFIX}: `, response.results || response);
        return response.results || response;
      },
      async $update({ commit, state }, { method, id, data }) {
        const response = await transport()[method || 'put'](`${endpoint}/${id}`, data);
        commit(types.UPDATE, {
          ...state.entities[id],
          ...data,
        });

        console.info(`UPDATED ENTITY ${id}`, data);

        return response;
      },
      async $remove({ commit }, id) {
        await transport().delete(`${endpoint}/${id}`);
        commit(types.REMOVE, id);
        console.info(`REMOVED ${id}`);
      },
      $reset({ commit }) {
        commit(types.RESET);
      }
    }
  };
};
