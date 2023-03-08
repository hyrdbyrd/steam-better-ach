/**
 * Базовая типизация апишек
 */

export type SuccessResponse<T> = { success: true } & T;
export type RejectedResponse = { success: false; error: string };

export type ApiResponse<T = {}> = SuccessResponse<T> | RejectedResponse;

export type BooleanNumber = 1 | 0;

export type BooleanSuccess = { success: number };

/**
 * Типизация для api.steam
 */

export type AchivenetsPercentage = ApiResponse<{
    achievementpercentages: {
        achievements: Array<{ name: string; percent: number }>;
    };
}>;

export type AchivementsPlayerStats = ApiResponse<{
    playerstats: {
        steamID: string;
        gameName: string;
        achievements: Array<{ apiname: string; achieved: BooleanNumber; unlocktime: number }>;
    };
}>;

export type UserStatsForGame = ApiResponse<{
    playerstats: {
        steamID: string;
        gameName: string;
        stats: Array<{ name: string; value: number }>;
        achievements: Array<{ name: string; achieved: BooleanNumber }>;
    };
}>;

export type PlayerSummaries_Data = {
    players: Array<{
        avatar: string;
        steamid: string;
        profileurl: string;
        avatarhash: string;
        lastlogoff: string;
        avatarfull: string;
        personaname: string;
        timecreated: number;
        profilestate: number;
        avatarmedium: string;
        personastate: number;
        primaryclanid: string;
        commentpermission: number;
        personastateflags: number;
        communityvisibilitystate: number;
    }>;
};

export type PlayerSummaries = ApiResponse<{
    response: PlayerSummaries_Data;
}>;

export type Ach = { ach_total: number; ach_cur: number } | undefined;

export type PlayerOwnedGames_Data_Data = { appid: number; img_icon_url: string; name: string };

export type PlayerOwnedGames_Data = {
    game_count: number;
    games: PlayerOwnedGames_Data_Data[];
};

export type PlayerOwnedGames = ApiResponse<{
    response: PlayerOwnedGames_Data;
}>;

export type ResolveVanityUrl_Data = {
    steamid: string;
};

export type ResolveVanityUrlResponse = ApiResponse<{
    response: ResolveVanityUrl_Data & BooleanSuccess;
}>;

export type SchemaForGame_Data = {
    game: {
        availableGameStats: {
            achievements: Array<{
                name: string; // as is apiname
                icon: string;
                icongray: string;
                displayName: string;
                description: string;
                hidden: BooleanNumber;
            }>;
        };
    };
};

export type SchemaForGame = ApiResponse<SchemaForGame_Data>;
