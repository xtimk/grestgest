import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProblemDetail from "../models/problemDetail";

axios.defaults.baseURL = 'http://localhost:5000/api/'

const requestHeaderCfg : AxiosRequestConfig<{}> = {
    headers: {
        'Content-Type': 'application/json',
    }
}

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(response => {
    return response;
}, (error: AxiosError) => {
    const {data, status} = error.response!;
    switch (status) {
        case 400:
            if(error.response != null) {
                const problem = <ProblemDetail> data
                toast.error(problem.title + "\n" + problem.detail);
            }
            break;
        case 401:
            toast.error("Permessi insufficienti.");
            break;
        case 404:
            toast.error("Funzionalità non trovata.");
            break;
        case 500:
            toast.error("Si e' verificato un errore inatteso.");
            break;
    }
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
    delete: (activityId: number) => requests.delete(`activity/Delete?id=${activityId}`)
}

const Period = {
    list: () => requests.get('period/GetAll')
}

const Interval = {
    list: () => requests.get('interval/GetAll'),
    create: (body : {}) => requests.post('interval/Create', body),
    delete: (intervalId: number) => requests.delete(`interval/Delete?id=${intervalId}`)
}

const agent = {
    Activity,
    Period,
    Interval
}

export default agent;