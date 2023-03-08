import type { CreateAxiosDefaults } from 'axios';

import { STEAM_API_KEY } from '$env/static/private';

import { BaseApiRequest } from './BaseRequest';

export class BackendRequester extends BaseApiRequest {
    constructor(config: CreateAxiosDefaults = {}) {
        super({ ...config, params: { key: STEAM_API_KEY } }, false);
    }
}
