import { SWRConfiguration } from 'swr'

export const swrConfig: SWRConfiguration = {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
    focusThrottleInterval: 5000,
    loadingTimeout: 3000,
    shouldRetryOnError: true,
    onError: (error) => {
        console.error('SWR Error:', error)
    }
}
