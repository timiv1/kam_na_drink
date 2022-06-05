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
    const result = ref<any>(null)
    const loading = ref(false)
    const error = ref(null)

    const get = async (path: string) => {
        loading.value = true
        await serverClient.get(path).then((res) => {
            result.value = res.data
        }).catch((err) => {
            error.value = err
            console.log(err)
        }).finally(() => {
            loading.value = false
        })


    }
    const post = async (path: string, payload: any) => {
        loading.value = true
        await serverClient.post(path, payload).then((res) => {
            result.value = res.data
        }).catch((err) => {
            error.value = err
            console.log(err)
        }).finally(() => { loading.value = false })
    }
    const put = async (path: string, payload: any) => {
        loading.value = true
        await serverClient.put(path, payload).then((res) => {
            result.value = res.data
        }).catch((err) => {
            error.value = err
            console.log(err)
        }).finally(() => { loading.value = false })
    }
    const remove = async (path: string) => {
        loading.value = true
        await serverClient.delete(path).then((res) => {
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

