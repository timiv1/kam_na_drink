import jwtDecode, { JwtPayload } from "jwt-decode";
const state = () => ({
    authData: {
        token: null,
        tokenExp: null,
        id: null,
        firstName: null,
        lastName: null,
        email: null,
    },
});

const actions = {
    async login({ commit }: any, loginData: any) {
        if (loginData != null) {
            const token = loginData.token
            const user = loginData.user
            const decoded = jwtDecode<JwtPayload>(token);
            const payload = {
                token: token,
                tokenExp: decoded.exp,
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,

            }
            console.log('In signin')
            console.log('decoded')
            console.log(decoded)
            commit('setLoginData', payload)
        }
    },
    async logout({ commit }: any) {
        commit('setLogoutData')
    }
};

const mutations = {
    setLoginData(state: any, payload: any) {
        state.authData = payload
    },
    setLogoutData(state: any) {
        state.authData = {
            token: null,
            tokenExp: null,
            id: null,
            firstName: null,
            lastName: null,
            email: null,
        }
    }


};
const getters = {
    isAuthenticated(state: any) {
        if (state.authData?.token != null) { return true } else { return false }
    },
    getAuthToken(state: any) {
        return state.authData?.token
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
