import React from 'react';
import { SWRConfig } from 'swr';

interface SWRProviderProps {
    children: React.ReactNode;
}

const SWRProvider: React.FC<SWRProviderProps> = ({ children }) => {
    return (
        <SWRConfig
            value={{
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
                refreshInterval: 0,
                shouldRetryOnError: true,
                errorRetryCount: 3,
                errorRetryInterval: 5000,
                dedupingInterval: 2000,
            }}
        >
            {children}
        </SWRConfig>
    );
};

export default SWRProvider;