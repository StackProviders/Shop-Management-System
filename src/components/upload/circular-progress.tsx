import { memo } from 'react'

interface CircularProgressProps {
    percentage: number
    size?: number
    strokeWidth?: number
    className?: string
}

export const CircularProgress = memo(function CircularProgress({
    percentage,
    size = 48,
    strokeWidth = 3,
    className = ''
}: CircularProgressProps) {
    const radius = 20
    const circumference = 2 * Math.PI * radius

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
            <div className="relative">
                <svg
                    className={`-rotate-90 ${className}`}
                    width={size}
                    height={size}
                    viewBox="0 0 48 48"
                >
                    <circle
                        cx="24"
                        cy="24"
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        className="text-muted/60"
                    />
                    <circle
                        cx="24"
                        cy="24"
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={
                            circumference * (1 - percentage / 100)
                        }
                        className="text-white transition-all duration-300"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
    )
})
