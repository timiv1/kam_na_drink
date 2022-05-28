const state = () => ({
    borovnicke: 0
});

const actions = {
    async naZdravje({ commit }: any, payload: number) {
        commit('pristejBorovnicke', payload)
    }
};

const mutations = {
    pristejBorovnicke(state: any, payload: number) {
        state.borovnicke = state.borovnicke + 1
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
