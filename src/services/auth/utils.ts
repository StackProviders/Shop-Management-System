export const generateOTP = (): string =>
    Math.floor(100000 + Math.random() * 900000).toString()

export const hashString = async (str: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(str)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
}
