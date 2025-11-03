import { useState, useEffect } from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useItemSettings } from '../hooks/use-item-settings'
import { useItemSettingsActions } from '../hooks/use-item-settings-actions'
import { Skeleton } from '@/components/ui/skeleton'
import { WARRANTY_PERIODS } from '@/config/warranty-periods'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Plus, X, Trash2 } from 'lucide-react'

interface ItemSettingsSheetProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    shopId: string
}

export function ItemSettingsSheet({
    open,
    onOpenChange,
    shopId
}: ItemSettingsSheetProps) {
    const { settings, isLoading } = useItemSettings(shopId)
    const { updateSettings } = useItemSettingsActions(shopId)

    const [localSettings, setLocalSettings] = useState(settings)

    useEffect(() => {
        if (!isLoading && open) {
            setLocalSettings(settings)
        }
    }, [open, isLoading])

    const handleSave = async () => {
        await updateSettings(localSettings)
        onOpenChange(false)
    }

    if (isLoading) {
        return (
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Item Settings</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-4 mt-6">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>Item Settings</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto space-y-4 mt-6 px-4">
                    <div className="flex items-center justify-between">
                        <Label>Serial No. Tracking</Label>
                        <Switch
                            checked={localSettings.serialNoTracking}
                            onCheckedChange={(checked) =>
                                setLocalSettings({
                                    ...localSettings,
                                    serialNoTracking: checked
                                })
                            }
                        />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                        <Label>MRP/Price</Label>
                        <Switch
                            checked={localSettings.mrpPrice}
                            onCheckedChange={(checked) =>
                                setLocalSettings({
                                    ...localSettings,
                                    mrpPrice: checked
                                })
                            }
                        />
                    </div>
                    <Separator />

                    <div>
                        <div className="flex items-center justify-between">
                            <Label>Item Custom Fields</Label>
                            <Switch
                                checked={localSettings.customFields}
                                onCheckedChange={(checked) =>
                                    setLocalSettings({
                                        ...localSettings,
                                        customFields: checked
                                    })
                                }
                            />
                        </div>
                        {localSettings.customFields && (
                            <div className="ml-4 mt-3 space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm text-muted-foreground">
                                        Colour
                                    </Label>
                                    <Switch
                                        checked={
                                            localSettings.customFieldSettings
                                                .colour
                                        }
                                        onCheckedChange={(checked) =>
                                            setLocalSettings({
                                                ...localSettings,
                                                customFieldSettings: {
                                                    ...localSettings.customFieldSettings,
                                                    colour: checked
                                                }
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm text-muted-foreground">
                                        Material
                                    </Label>
                                    <Switch
                                        checked={
                                            localSettings.customFieldSettings
                                                .material
                                        }
                                        onCheckedChange={(checked) =>
                                            setLocalSettings({
                                                ...localSettings,
                                                customFieldSettings: {
                                                    ...localSettings.customFieldSettings,
                                                    material: checked
                                                }
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm text-muted-foreground">
                                        Mfg. Date
                                    </Label>
                                    <Switch
                                        checked={
                                            localSettings.customFieldSettings
                                                .mfgDate
                                        }
                                        onCheckedChange={(checked) =>
                                            setLocalSettings({
                                                ...localSettings,
                                                customFieldSettings: {
                                                    ...localSettings.customFieldSettings,
                                                    mfgDate: checked
                                                }
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm text-muted-foreground">
                                        Exp. Date
                                    </Label>
                                    <Switch
                                        checked={
                                            localSettings.customFieldSettings
                                                .expDate
                                        }
                                        onCheckedChange={(checked) =>
                                            setLocalSettings({
                                                ...localSettings,
                                                customFieldSettings: {
                                                    ...localSettings.customFieldSettings,
                                                    expDate: checked
                                                }
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm text-muted-foreground">
                                        Size
                                    </Label>
                                    <Switch
                                        checked={
                                            localSettings.customFieldSettings
                                                .size
                                        }
                                        onCheckedChange={(checked) =>
                                            setLocalSettings({
                                                ...localSettings,
                                                customFieldSettings: {
                                                    ...localSettings.customFieldSettings,
                                                    size: checked
                                                }
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm text-muted-foreground">
                                        Brand
                                    </Label>
                                    <Switch
                                        checked={
                                            localSettings.customFieldSettings
                                                .brand
                                        }
                                        onCheckedChange={(checked) =>
                                            setLocalSettings({
                                                ...localSettings,
                                                customFieldSettings: {
                                                    ...localSettings.customFieldSettings,
                                                    brand: checked
                                                }
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm text-muted-foreground">
                                        Warranty
                                    </Label>
                                    <Switch
                                        checked={
                                            localSettings.customFieldSettings
                                                .warranty
                                        }
                                        onCheckedChange={(checked) => {
                                            const allPeriods =
                                                WARRANTY_PERIODS.filter(
                                                    (p) => p.value !== 'custom'
                                                ).map((p) => p.value)
                                            setLocalSettings({
                                                ...localSettings,
                                                customFieldSettings: {
                                                    ...localSettings.customFieldSettings,
                                                    warranty: checked
                                                },
                                                warrantyPeriods: checked
                                                    ? allPeriods
                                                    : []
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                        <Label>Description</Label>
                        <Switch
                            checked={localSettings.description}
                            onCheckedChange={(checked) =>
                                setLocalSettings({
                                    ...localSettings,
                                    description: checked
                                })
                            }
                        />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                        <Label>Item Category</Label>
                        <Switch
                            checked={localSettings.category}
                            onCheckedChange={(checked) =>
                                setLocalSettings({
                                    ...localSettings,
                                    category: checked
                                })
                            }
                        />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                        <Label>Barcode Scan</Label>
                        <Switch
                            checked={localSettings.barcodeScan}
                            onCheckedChange={(checked) =>
                                setLocalSettings({
                                    ...localSettings,
                                    barcodeScan: checked
                                })
                            }
                        />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                        <Label>Wholesale Price</Label>
                        <Switch
                            checked={localSettings.wholesalePrice}
                            onCheckedChange={(checked) =>
                                setLocalSettings({
                                    ...localSettings,
                                    wholesalePrice: checked
                                })
                            }
                        />
                    </div>
                    <Separator />

                    <div>
                        <Label className="mb-3 block">Custom Fields</Label>
                        <div className="space-y-3">
                            {localSettings.customFieldNames?.map(
                                (field, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 p-2 border rounded-md"
                                    >
                                        <div className="flex-1">
                                            <Input
                                                value={field.name}
                                                onChange={(e) => {
                                                    const updated = [
                                                        ...(localSettings.customFieldNames ||
                                                            [])
                                                    ]
                                                    updated[index] = {
                                                        ...updated[index],
                                                        name: e.target.value
                                                    }
                                                    setLocalSettings({
                                                        ...localSettings,
                                                        customFieldNames:
                                                            updated
                                                    })
                                                }}
                                                placeholder="Field name (e.g., Colour, Size)"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id={`print-${index}`}
                                                checked={field.printInInvoice}
                                                onCheckedChange={(checked) => {
                                                    const updated = [
                                                        ...(localSettings.customFieldNames ||
                                                            [])
                                                    ]
                                                    updated[index] = {
                                                        ...updated[index],
                                                        printInInvoice:
                                                            !!checked
                                                    }
                                                    setLocalSettings({
                                                        ...localSettings,
                                                        customFieldNames:
                                                            updated
                                                    })
                                                }}
                                            />
                                            <Label
                                                htmlFor={`print-${index}`}
                                                className="text-xs cursor-pointer whitespace-nowrap"
                                            >
                                                Print
                                            </Label>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                const updated = (
                                                    localSettings.customFieldNames ||
                                                    []
                                                ).filter((_, i) => i !== index)
                                                setLocalSettings({
                                                    ...localSettings,
                                                    customFieldNames: updated
                                                })
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )
                            )}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    const updated = [
                                        ...(localSettings.customFieldNames ||
                                            []),
                                        { name: '', printInInvoice: false }
                                    ]
                                    setLocalSettings({
                                        ...localSettings,
                                        customFieldNames: updated
                                    })
                                }}
                                className="w-full"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Custom Field
                            </Button>
                        </div>
                    </div>

                    {localSettings.customFieldSettings.warranty && (
                        <>
                            <Separator />
                            <div>
                                <Label className="mb-3 block">
                                    Warranty Periods
                                </Label>
                                <div className="ml-4 space-y-2">
                                    {WARRANTY_PERIODS.filter(
                                        (p) => p.value !== 'custom'
                                    ).map((period) => (
                                        <div
                                            key={period.value}
                                            className="flex items-center gap-2"
                                        >
                                            <Checkbox
                                                id={period.value}
                                                checked={localSettings.warrantyPeriods?.includes(
                                                    period.value
                                                )}
                                                onCheckedChange={(checked) => {
                                                    const periods =
                                                        localSettings.warrantyPeriods ||
                                                        []
                                                    setLocalSettings({
                                                        ...localSettings,
                                                        warrantyPeriods: checked
                                                            ? [
                                                                  ...periods,
                                                                  period.value
                                                              ]
                                                            : periods.filter(
                                                                  (p) =>
                                                                      p !==
                                                                      period.value
                                                              )
                                                    })
                                                }}
                                            />
                                            <Label
                                                htmlFor={period.value}
                                                className="text-sm font-normal cursor-pointer"
                                            >
                                                {period.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4">
                                    <Label className="text-sm mb-2 block">
                                        Custom Periods
                                    </Label>
                                    <div className="space-y-3">
                                        {localSettings.customWarrantyPeriods?.map(
                                            (period, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-end gap-2"
                                                >
                                                    <div className="flex-1">
                                                        <Label className="text-xs text-muted-foreground mb-1 block">
                                                            Period Name
                                                        </Label>
                                                        <Input
                                                            value={period.label}
                                                            onChange={(e) => {
                                                                const updated =
                                                                    [
                                                                        ...(localSettings.customWarrantyPeriods ||
                                                                            [])
                                                                    ]
                                                                updated[index] =
                                                                    {
                                                                        ...updated[
                                                                            index
                                                                        ],
                                                                        label: e
                                                                            .target
                                                                            .value
                                                                    }
                                                                setLocalSettings(
                                                                    {
                                                                        ...localSettings,
                                                                        customWarrantyPeriods:
                                                                            updated
                                                                    }
                                                                )
                                                            }}
                                                            placeholder="e.g., 18 Months"
                                                        />
                                                    </div>
                                                    <div className="w-20">
                                                        <Label className="text-xs text-muted-foreground mb-1 block">
                                                            Days
                                                        </Label>
                                                        <Input
                                                            type="number"
                                                            value={period.days}
                                                            onChange={(e) => {
                                                                const updated =
                                                                    [
                                                                        ...(localSettings.customWarrantyPeriods ||
                                                                            [])
                                                                    ]
                                                                updated[index] =
                                                                    {
                                                                        ...updated[
                                                                            index
                                                                        ],
                                                                        days:
                                                                            parseInt(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            ) ||
                                                                            0
                                                                    }
                                                                setLocalSettings(
                                                                    {
                                                                        ...localSettings,
                                                                        customWarrantyPeriods:
                                                                            updated
                                                                    }
                                                                )
                                                            }}
                                                            placeholder="0"
                                                        />
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => {
                                                            const updated = (
                                                                localSettings.customWarrantyPeriods ||
                                                                []
                                                            ).filter(
                                                                (_, i) =>
                                                                    i !== index
                                                            )
                                                            setLocalSettings({
                                                                ...localSettings,
                                                                customWarrantyPeriods:
                                                                    updated
                                                            })
                                                        }}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                const updated = [
                                                    ...(localSettings.customWarrantyPeriods ||
                                                        []),
                                                    { label: '', days: 0 }
                                                ]
                                                setLocalSettings({
                                                    ...localSettings,
                                                    customWarrantyPeriods:
                                                        updated
                                                })
                                            }}
                                            className="w-full"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Custom Period
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <SheetFooter className="border-t pt-4">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Settings</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
