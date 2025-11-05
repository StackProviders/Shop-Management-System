import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import type { ItemType } from '../types'

interface ItemFormHeaderProps {
    title: string
    itemType: ItemType
    onTypeChange: (checked: boolean) => void
    onSettingsClick: () => void
}

export function ItemFormHeader({
    title,
    itemType,
    onTypeChange,
    onSettingsClick
}: ItemFormHeaderProps) {
    return (
        <div className="flex items-center justify-between border-b">
            <h1 className="text-base sm:text-lg font-semibold">{title}</h1>
            <div className="flex items-center gap-1 sm:gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <Label
                        htmlFor="type-toggle"
                        className="text-xs sm:text-sm font-medium"
                    >
                        Product
                    </Label>
                    <Switch
                        id="type-toggle"
                        checked={itemType === 'service'}
                        onCheckedChange={onTypeChange}
                    />
                    <Label
                        htmlFor="type-toggle"
                        className="text-xs sm:text-sm font-medium"
                    >
                        Service
                    </Label>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onSettingsClick}
                    className="h-8 w-8 sm:h-10 sm:w-10"
                >
                    <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
            </div>
        </div>
    )
}
