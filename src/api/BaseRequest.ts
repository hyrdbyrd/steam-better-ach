import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios';

import type { ApiResponse, RejectedResponse, SuccessResponse } from '../types';

export class BaseApiRequest {
    #instance: AxiosInstance = axios.create();
    #config: CreateAxiosDefaults = {
        baseURL: 'http://api.steampowered.com',
    };

    constructor(config: CreateAxiosDefaults = {}, protected skipAutoSuccess: boolean = true) {
        this.config = config;
    }

    set config(config: CreateAxiosDefaults) {
        Object.assign(this.#config, config);

        const fetcher = axios.create(this.#config);
        fetcher.interceptors.request.use((config) => {
            Object.assign(config.params, this.#config.params || {});
            return config;
        });

        this.#instance = fetcher;
    }

    get<T = {}, R = T>(...args: Parameters<AxiosInstance['get']>): Promise<ApiResponse<R>> {
        return this.#instance
            .get<T>(...args)
            .then((e) => ({ ...e.data, ...(this.skipAutoSuccess ? {} : { success: true }) } as ApiResponse<T>))
            .catch((e) => ({ success: false, error: e.message as string } as ApiResponse));
    }

    isRejected<T>(e: ApiResponse<T>): e is RejectedResponse {
        return !e.success;
    }

    isSucceed<T>(e: ApiResponse<T>): e is SuccessResponse<T> {
        return e.success;
    }
}
