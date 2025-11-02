import { ChevronsUpDown, Inbox, Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { useCategories } from '../hooks/use-categories'
import { useShopContext } from '@/features/shop'
import { CategoryForm } from './category-form'

interface CategorySelectProps {
    value: string[]
    onChange: (value: string[]) => void
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
    const [open, setOpen] = useState(false)
    const [showCategoryModal, setShowCategoryModal] = useState(false)
    const { currentShop } = useShopContext()
    const { categories, isLoading } = useCategories(currentShop?.shopId || '')

    return (
        <>
            <Popover onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild>
                    <Button
                        aria-expanded={open}
                        className="w-full justify-between"
                        role="combobox"
                        variant="outline"
                    >
                        {value.length > 0
                            ? `${value.length} categor${value.length > 1 ? 'ies' : 'y'}`
                            : 'Select categories...'}
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="Search categories..." />
                        <CommandList>
                            {isLoading ? (
                                <div className="space-y-2 p-2">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <Skeleton
                                            className="h-8 w-full"
                                            key={i}
                                        />
                                    ))}
                                </div>
                            ) : categories.length === 0 ? (
                                <div className="flex flex-col items-center gap-3 p-6 text-center">
                                    <Inbox className="size-12 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium text-sm">
                                            No categories yet
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            Get started by creating your first
                                            category
                                        </p>
                                    </div>
                                    <Button
                                        className="w-full"
                                        onClick={() => {
                                            setShowCategoryModal(true)
                                            setOpen(false)
                                        }}
                                        size="sm"
                                    >
                                        <Plus className="mr-2 size-4" />
                                        Create Category
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <CommandEmpty>
                                        No category found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {categories.map((category) => (
                                            <CommandItem
                                                key={category.id}
                                                onSelect={() => {
                                                    onChange(
                                                        value.includes(
                                                            category.id
                                                        )
                                                            ? value.filter(
                                                                  (v) =>
                                                                      v !==
                                                                      category.id
                                                              )
                                                            : [
                                                                  ...value,
                                                                  category.id
                                                              ]
                                                    )
                                                }}
                                                value={category.name}
                                            >
                                                <Checkbox
                                                    checked={value.includes(
                                                        category.id
                                                    )}
                                                    className="mr-2"
                                                />
                                                {category.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </>
                            )}
                        </CommandList>
                        {!isLoading && categories.length > 0 && (
                            <>
                                <CommandSeparator />
                                <div className="p-1">
                                    <Button
                                        className="w-full justify-start text-xs"
                                        onClick={() => {
                                            setShowCategoryModal(true)
                                            setOpen(false)
                                        }}
                                        variant="ghost"
                                    >
                                        <Plus className="mr-2 size-3" />
                                        Add New Category
                                    </Button>
                                </div>
                            </>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>

            <CategoryForm
                open={showCategoryModal}
                onOpenChange={setShowCategoryModal}
            />
        </>
    )
}
