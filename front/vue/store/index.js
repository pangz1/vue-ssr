'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

let apiHost = 'http://localhost:3000';

/**
 * actions 与后台api交互
 * actions -> commit -> mutations -> mutate -> state
 */

const store = new Vuex.Store({
    state: {
        alias: '',
        ztData: {},
        courseListItems: [],
        courseListCount: 0,
        courseDetail: {},
        articleItems: [],
        articleDetail: {}
    },
    actions: {
        FETCH_ZT: ({ commit, dispatch, state }, { alias }) => {
            commit('SET_ALIAS', { alias });
            if(!state.ztData.siteID) {
                return axios.get(`${apiHost}/api/zt`)
                            .then(response => {
                                let data = response.data || {};
                                commit('SET_ZT_DATA', data);
                                return data;
                            })
            }
            return Promise.resolve();
        },
        FETCH_COURSE_ITEMS: ({ commit, dispatch, state }) => {
            if(!state.courseListItems.length) {
                return axios.get(`${apiHost}/api/course_items`).then(response => {
                    let data = response.data;
                    commit('SET_COURSE_ITEMS', data);
                    return data;
                });
            }
            return Promise.resolve();
        },
        FETCH_ARTICLE_ITEMS: ({ commit, dispatch, state }) => {
            if(!state.articleItems.length) {
                return axios.get(`${apiHost}/api/article_items`)
                            .then(response => {
                                let data = response.data;
                                commit('SET_ARTICLE_ITEMS', data);
                                return response.data;
                            })

            }
            return Promise.resolve();
        },
        FETCH_ARTICLE_DETAIL: ({ commit, dispatch, state }, { id }) => {
            if(state.articleDetail.contentId != id) {
                return axios.get(`${apiHost}/api/article/${id}`)
                            .then(response => {
                                let [data] = response.data;
                                commit('SET_ARTICLE_DETAIL', data);
                            })
            }
            return Promise.resolve();
        }
    },
    mutations: {
        SET_COURSE_ITEMS: (state, data) => {
            state.courseListItems = data;
        },
        SET_ALIAS: (state, { alias }) => {
            state.alias = alias;
        },
        SET_ZT_DATA: (state, { ztData }) => {
            state.ztData = ztData;
        },
        SET_ARTICLE_ITEMS: (state, items) => {
            state.articleItems = items;
        },
        SET_ARTICLE_DETAIL: (state, data) => {
            state.articleDetail = data;
        }
    }
})

export default store
