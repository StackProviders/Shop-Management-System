'use client'

import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef, ReactNode } from 'react'

interface VirtualizedListProps<T> {
    items: T[]
    renderItem: (item: T, index: number) => ReactNode
    estimateSize?: number
    className?: string
}

export function VirtualizedList<T>({
    items,
    renderItem,
    estimateSize = 60,
    className
}: VirtualizedListProps<T>) {
    const parentRef = useRef<HTMLDivElement>(null)

    const virtualizer = useVirtualizer({
        count: items.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => estimateSize,
        overscan: 5
    })

    return (
        <div
            ref={parentRef}
            className={className}
            style={{ height: '100%', overflow: 'auto' }}
        >
            <div
                style={{
                    height: `${virtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative'
                }}
            >
                {virtualizer.getVirtualItems().map((virtualItem) => (
                    <div
                        key={virtualItem.key}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: `${virtualItem.size}px`,
                            transform: `translateY(${virtualItem.start}px)`
                        }}
                    >
                        {renderItem(
                            items[virtualItem.index],
                            virtualItem.index
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
