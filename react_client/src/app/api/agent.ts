import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/'

const requestHeaderCfg : AxiosRequestConfig<{}> = {
    headers: {
        'Content-Type': 'application/json',
    }
}

const responseBody = (response: AxiosResponse) => response.data;

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
    list: () => requests.get('interval/GetAll')
}

const agent = {
    Activity,
    Period,
    Interval
}

export default agent;