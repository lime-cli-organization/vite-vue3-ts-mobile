import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { Notify } from 'vant';
import { getCookie } from '@/utils/storage';

const config: AxiosRequestConfig = {
  baseURL: '', //http://114.55.115.86:8001
  timeout: 5000,
  withCredentials: true,
};

class HttpRequest {
  service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    this.service.interceptors.request.use((config: AxiosRequestConfig) => {
      if (config.headers) {
        config.headers.Authorization = 'Bearer' + ' ' + getCookie('token');
      }
      return config;
    });

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;
        // #TODO download 获取文件名时可能需要response header
        return data;
      },
      (error: AxiosError) => {
        const { response } = error;
        if (response) {
          this.handleCode(response.status);
        }
        // 网络连接失败
        if (!window.navigator.onLine) {
          Notify('网络连接失败!');
        }
      },
    );
  }

  public get<T>(url: string, params?: object): Promise<IResultData<T>> {
    return this.service.get(url, { params });
  }
  public post<T>(url: string, data?: object): Promise<IResultData<T>> {
    return this.service.post(url, { data });
  }

  private handleCode(code: number): void {}
}

export default new HttpRequest(config);
