import axios, { AxiosInstance } from 'axios'
import { ref } from "vue";

const serverClient: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/",
    timeout: 10000,
    headers: {
        //'Authorization': 'token <your-token-here> -- https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
    },
});

export default function useAxios() {
    const result = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const get = async (path: string) => {
        loading.value = true
        await serverClient.get(path).then((res) => {
            console.log(typeof (res.data))
            result.value = res.data
        }).catch((err) => {
            error.value = err
            console.log(err)
        }).finally(() => {
            loading.value = false
        })


    }
    const post = (path: string, payload: any) => {
        loading.value = true
        serverClient.post(path, payload).then((res) => {
            result.value = res.data
        }).catch((err) => {
            error.value = err
            console.log(err)
        }).finally(() => { loading.value = false })
    }
    const put = (path: string, payload: any) => {
        loading.value = true
        serverClient.put(path, payload).then((res) => {
            result.value = res.data
        }).catch((err) => {
            error.value = err
            console.log(err)
        }).finally(() => { loading.value = false })
    }
    const remove = (path: string) => {
        loading.value = true
        serverClient.delete(path).then((res) => {
            result.value = res.data
        }).catch((err) => {
            error.value = err
            console.log(err)
        }).finally(() => { loading.value = false })
    }



    return {
        get, post, put, remove, result, loading, error
    }
}

