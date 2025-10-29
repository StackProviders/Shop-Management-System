import { useState, useEffect } from 'react'
import { checkOnlineStatus } from '@/utils'

const CHECK_INTERVAL = 30000 // 30 seconds

export function useOnline() {
    const [isOnline, setIsOnline] = useState(false)

    useEffect(() => {
        const updateStatus = async () => {
            const status = await checkOnlineStatus()
            setIsOnline(status)
        }

        updateStatus()
        const intervalId = setInterval(updateStatus, CHECK_INTERVAL)
        return () => clearInterval(intervalId)
    }, [])

    return isOnline
}
