import axios, {AxiosRequestConfig, AxiosResponse} from "axios"

const baseURL = "http://localhost:8082/api/v1/"
const instance = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json"
	}
})

instance.interceptors.request.use(function (config) {

	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
	const {data} = response
	return data;
}, function (error) {
	// Any status codes that falls outside the range of 2xx cause this function to trigger
	// Do something with response error
	const {response} = error
	return Promise.reject(response?.data);
})

const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
	const conf = config;
	return new Promise((resolve, reject) => {
		instance.request<any, AxiosResponse<any>>(conf).then((res: AxiosResponse<any>) => {
			resolve(res as T);
		}).catch((error) => {
			reject(error)
		});
	});
};

export function get<T = any>(config: AxiosRequestConfig): Promise<T> {
	return request({...config, method: 'GET'});
}

export function post<T = any>(config: AxiosRequestConfig): Promise<T> {
	return request({...config, method: 'POST'});
}

export function patch<T = any>(config: AxiosRequestConfig): Promise<T> {
	return request({...config, method: 'PATCH'});
}

export function put<T = any>(config: AxiosRequestConfig): Promise<T> {
	return request({...config, method: 'put'});
}

export function del<T = any>(config: AxiosRequestConfig): Promise<T> {
	return request({...config, method: 'delete'});
}


export default instance