import axios, {AxiosResponse} from "axios";

function handleServerError(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> {
  if (response.data && response.data.error) {
    return Promise.reject(response.data);
  }
  return response;
}

const backend = axios.create();

backend.interceptors.response.use(handleServerError);

export default backend;