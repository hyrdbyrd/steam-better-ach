import type { CreateAxiosDefaults } from 'axios';

import type { AchivementsPlayerStats, AchivenetsPercentage, UserStatsForGame, SchemaForGame } from '../types';

import { BackendRequester } from './BackendRequester.server';

export class UserStatsApi extends BackendRequester {
    constructor(config: CreateAxiosDefaults = {}) {
        super({
            ...config,
            baseURL: 'http://api.steampowered.com/ISteamUserStats',
            params: { key: process.env.STEAM_API_KEY },
        });
    }

    getPlayerAchivements = (steamid: string, appid: string) =>
        this.get<AchivementsPlayerStats>('/GetPlayerAchievements/v0001/', {
            params: { steamid, appid, include_appinfo: true, include_extended_appinfo: true },
        });

    getAchivementsPercentage = (gameid: string) =>
        this.get<AchivenetsPercentage>('/GetGlobalAchievementPercentagesForApp/v0002/', {
            params: { gameid },
        });

    getUserStatsForGame = (steamid: string, appid: string) =>
        this.get<UserStatsForGame>('/GetUserStatsForGame/v0002', { params: { steamid, appid } });

    getSchemaForGame = (appid: string) => this.get<SchemaForGame>('/GetSchemaForGame/v0002', { params: { appid } });
}
