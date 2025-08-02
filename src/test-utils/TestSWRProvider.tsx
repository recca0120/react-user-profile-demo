import React from 'react';
import { SWRConfig } from 'swr';

interface TestSWRProviderProps {
    children: React.ReactNode;
}

const TestSWRProvider: React.FC<TestSWRProviderProps> = ({ children }) => {
    return (
        <SWRConfig
            value={{
                // Disable all caching and revalidation for tests
                provider: () => new Map(),
                isOnline: () => true,
                isVisible: () => true,
                initFocus: () => {},
                initReconnect: () => {},
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
                revalidateIfStale: false,
                revalidateOnMount: true,
                refreshInterval: 0,
                dedupingInterval: 0,
                shouldRetryOnError: false,
                errorRetryInterval: 0,
                errorRetryCount: 0,
                fallback: {},
                // Use fetcher that works with fetchMock
                fetcher: (url: string) => fetch(url).then(res => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch');
                    }
                    return res.json();
                }),
            }}
        >
            {children}
        </SWRConfig>
    );
};

export default TestSWRProvider;