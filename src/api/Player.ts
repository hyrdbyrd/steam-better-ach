import type { CreateAxiosDefaults } from 'axios';

import type { ApiResponse, PlayerOwnedGames, PlayerOwnedGames_Data } from '../types';

import { BackendRequester } from './BackendRequester.server';

export class PlayerApi extends BackendRequester {
    constructor(config: CreateAxiosDefaults = {}) {
        super({
            ...config,
            baseURL: 'http://api.steampowered.com/IPlayerService',
        });
    }

    getOwnedGames = (steamid: string) =>
        this.get<PlayerOwnedGames>('/GetOwnedGames/v0001/', {
            params: { steamid, include_appinfo: true, include_extended_appinfo: true, filter: 'achievements' },
        }).then<ApiResponse<PlayerOwnedGames_Data>>((e) => {
            if (this.isRejected(e)) return e;
            return { ...e.response, success: true };
        });
}
