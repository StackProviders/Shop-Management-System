import {
    flexRender,
    type Table as TanstackTable,
    type Row
} from '@tanstack/react-table'
import type * as React from 'react'
import { DataTablePagination } from '@/components/data-table/data-table-pagination'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { getCommonPinningStyles } from '@/lib/data-table'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'

interface DataTableProps<TData> extends React.ComponentProps<'div'> {
    table: TanstackTable<TData>
    actionBar?: React.ReactNode
    mobileCard?: (row: Row<TData>) => React.ReactNode
    onRowClick?: (row: Row<TData>) => void
}

export function DataTable<TData>({
    table,
    actionBar,
    mobileCard,
    onRowClick,
    children,
    className,
    ...props
}: DataTableProps<TData>) {
    const isMobile = useIsMobile()

    return (
        <div
            className={cn(
                'flex w-full flex-col gap-2.5 overflow-auto',
                className
            )}
            {...props}
        >
            {children}

            {/* Mobile Card View */}
            {isMobile && mobileCard ? (
                <div className="space-y-2">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <Card
                                key={row.id}
                                className={cn(
                                    'p-4 transition-colors',
                                    onRowClick &&
                                        'cursor-pointer hover:bg-muted/50',
                                    row.getIsSelected() && 'bg-muted'
                                )}
                                onClick={() => onRowClick?.(row)}
                            >
                                {mobileCard(row)}
                            </Card>
                        ))
                    ) : (
                        <Card className="p-8">
                            <p className="text-center text-muted-foreground">
                                No results.
                            </p>
                        </Card>
                    )}
                </div>
            ) : (
                /* Desktop Table View */
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            style={{
                                                ...getCommonPinningStyles({
                                                    column: header.column
                                                })
                                            }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && 'selected'
                                        }
                                        className={
                                            onRowClick ? 'cursor-pointer' : ''
                                        }
                                        onClick={() => onRowClick?.(row)}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                style={{
                                                    ...getCommonPinningStyles({
                                                        column: cell.column
                                                    })
                                                }}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={table.getAllColumns().length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            <div className="flex flex-col gap-2.5">
                <DataTablePagination table={table} />
                {actionBar &&
                    table.getFilteredSelectedRowModel().rows.length > 0 &&
                    actionBar}
            </div>
        </div>
    )
}
