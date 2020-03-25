import { AxiosPromise } from 'axios';

export async function handleResponse<T>(responsePromise: AxiosPromise): Promise<T> {
  const { data } = await responsePromise;
  return data;
}