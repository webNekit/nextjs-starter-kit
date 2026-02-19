"use client";

import useSWR from 'swr';
import { env } from '@/shared/config/env';

const fetcher = (url: string) => fetch(url).then((res) => {
    if (!res.ok) throw new Error("Status error");
    return res.json();
});

export function useBackendStatus() {
    const { data, error, isLoading } = useSWR(
        `${env.NEXT_PUBLIC_API_URL}/health`, 
        fetcher, 
        {
            refreshInterval: 60000,
            dedupingInterval: 10000,
            revalidateOnFocus: true,
            shouldRetryOnError: true,
            errorRetryInterval: 5000,
        }
    );

    const isResponseOk = data?.status === 'ok' || data?.data?.status === 'ok';
    const isOk = isResponseOk && !error;
    
    return {
        isOk,
        isLoading,
        isError: !!error,
        timestamp: data?.timestamp
    };
}

