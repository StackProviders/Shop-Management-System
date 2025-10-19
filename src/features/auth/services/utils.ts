export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

export const hashString = async (str: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(str)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export const getDeviceId = async (): Promise<string> => {
    let deviceId = localStorage.getItem('device_token')
    if (!deviceId) {
        deviceId = crypto.randomUUID()
        localStorage.setItem('device_token', deviceId)
    }
    return deviceId
}
