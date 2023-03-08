import { derived } from 'svelte/store';
import { writable } from 'svelte/store';

import type { ResolveVanityUrl_Data, ApiResponse, PlayerSummaries_Data } from '@/types';

export const url = writable<string>('');

export const user = derived<typeof url, { isLoading: boolean } & { data?: ApiResponse<ResolveVanityUrl_Data> }>(
    url,
    ($url, set) => {
        const controller = new AbortController();

        const timer = setTimeout(() => {
            set({ isLoading: true });
            fetch(`/api/user/resolve?url=${$url}`, { signal: controller.signal })
                .then<ApiResponse<ResolveVanityUrl_Data>>((e) => e.json())
                .then((data) => set({ data, isLoading: false }));
        }, 500);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    },
    { isLoading: false }
);

export const userData = derived<typeof user, ApiResponse<PlayerSummaries_Data>>(
    user,
    ($user, set) => {
        const controller = new AbortController();

        if ($user.data?.success && $user.data.steamid) {
            fetch(`/api/user/summaries/?userid=${$user.data.steamid}`, { signal: controller.signal })
                .then((e) => e.json())
                .then(set);
        }

        return () => {
            set({ success: false, error: 'Invalid' });
            controller.abort();
        };
    },
    { success: false, error: 'Invalid' }
);
