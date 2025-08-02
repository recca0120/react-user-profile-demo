import React from 'react';
import { SWRConfig } from 'swr';

interface TestSWRProviderProps {
    children: React.ReactNode;
}

const TestSWRProvider: React.FC<TestSWRProviderProps> = ({ children }) => {
    return (
        <SWRConfig
            value={{
                // Use a new cache for each test
                provider: () => new Map(),
                // Disable retries for tests
                shouldRetryOnError: false,
            }}
        >
            {children}
        </SWRConfig>
    );
};

export default TestSWRProvider;