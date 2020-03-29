import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

function appendBackendUrlPrefix(config: AxiosRequestConfig): AxiosRequestConfig {
  const API_URL = "/pjp-api";
  config.url = API_URL + config.url;
  return config;
}

function handleServerError(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> {
  if (response.data && response.data.error) {
    return Promise.reject(response.data);
  }
  return response;
}

const backend = axios.create();

backend.interceptors.request.use(appendBackendUrlPrefix)
backend.interceptors.response.use(handleServerError);

export default backend;