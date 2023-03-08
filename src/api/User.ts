import type { CreateAxiosDefaults } from 'axios';

import type {
    ApiResponse,
    PlayerSummaries,
    PlayerSummaries_Data,
    ResolveVanityUrlResponse,
    ResolveVanityUrl_Data,
} from '../types';

import { BackendRequester } from './BackendRequester.server';

export class UserApi extends BackendRequester {
    constructor(config: CreateAxiosDefaults = {}) {
        super({
            ...config,
            baseURL: 'http://api.steampowered.com/ISteamUser',
        });
    }

    getPlayerSummaries = (steamid: string) =>
        this.get<PlayerSummaries>('/GetPlayerSummaries/v0002/', {
            params: { steamids: [steamid].join(',') },
        }).then<ApiResponse<PlayerSummaries_Data>>((e) => {
            if (this.isRejected(e)) return e;
            return { ...e.response, success: true };
        });

    resolveVanityUrl = (vanityurl: string) =>
        this.get<ResolveVanityUrlResponse>('/ResolveVanityURL/v0001/', {
            params: { vanityurl },
        }).then<ApiResponse<ResolveVanityUrl_Data>>((e) => {
            if (this.isRejected(e)) return e;
            if (e.response.success === 1) return { ...e.response, success: true };
            return { success: false, error: 'Invalid' };
        });
}
