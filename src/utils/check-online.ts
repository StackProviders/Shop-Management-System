const DNS_CHECK_URL = 'https://dns.google/resolve?name=google.com&type=A'
const TIMEOUT = 5000 // 5 seconds

export async function checkOnlineStatus(): Promise<boolean> {
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)

        await fetch(DNS_CHECK_URL, {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-cache',
            signal: controller.signal
        })

        clearTimeout(timeoutId)
        return true
    } catch {
        return false
    }
}
