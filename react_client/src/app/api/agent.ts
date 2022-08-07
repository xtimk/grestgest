import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'http://localhost:5000/api/'

const requestHeaderCfg : AxiosRequestConfig<{}> = {
    headers: {
        'Content-Type': 'application/json',
    }
}

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(response => {
    console.log("Intercepted");
    return response;
}, (error: AxiosError) => {
    console.log('caught by interceptor');
    const {status} = error.response!;
    toast.error("Errore durante l'operazione. Stato " + status);
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body, requestHeaderCfg).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Activity = {
    list: () => requests.get('activity/GetAll'),
    create: (body : {}) => requests.post('activity/Create', body),
    delete: (activityId: number) => requests.delete(`activity/Delete?activityId=${activityId}`)
}

const Period = {
    list: () => requests.get('period/GetAll')
}

const Interval = {
    list: () => requests.get('interval/GetAll'),
    create: (body : {}) => requests.post('interval/Create', body),
}

const agent = {
    Activity,
    Period,
    Interval
}

export default agent;