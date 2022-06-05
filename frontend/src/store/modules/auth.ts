import jwtDecode, { JwtPayload } from "jwt-decode";
const state = () => ({
    authData: {
        token: "",
        tokenExp: "",
        id: "",
        firstName: "",
        lastName: "",
        email: "",
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
    }
};

const mutations = {
    setLoginData(state: any, payload: any) {
        state.authData = payload
    }
};
const getters = {
    isAuthenticated(state: any) {
        if (state.authData?.token) { return true } else { return false }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
