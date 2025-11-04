import {
    ListDetailContentHeader,
    ListDetailContentHeaderTitle,
    ListDetailContentHeaderInfo,
    ListDetailContentHeaderInfoItem,
    ListDetailContentBody
} from '@/components/ui/list-detail-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const MOCK_ITEMS = [
    { id: '1', name: 'Netis Router', stock: 15 },
    { id: '2', name: 'TV Box', stock: 10 }
]

export default function CategoryDetailPage() {
    return (
        <>
            <ListDetailContentHeader>
                <ListDetailContentHeaderTitle>
                    <h2 className="text-lg font-semibold">ELECTRONICS</h2>
                    <Button size="sm">EDIT CATEGORY</Button>
                </ListDetailContentHeaderTitle>

                <ListDetailContentHeaderInfo>
                    <ListDetailContentHeaderInfoItem
                        label="TOTAL ITEMS"
                        value="25"
                    />
                    <ListDetailContentHeaderInfoItem
                        label="TOTAL VALUE"
                        value="45,000.00 ৳"
                    />
                    <ListDetailContentHeaderInfoItem
                        label="STATUS"
                        value="Active"
                    />
                </ListDetailContentHeaderInfo>
            </ListDetailContentHeader>

            <ListDetailContentBody>
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold">ITEMS IN CATEGORY</h3>
                    <div className="border rounded-lg divide-y">
                        {MOCK_ITEMS.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-3 hover:bg-accent"
                            >
                                <span className="text-sm font-medium">
                                    {item.name}
                                </span>
                                <Badge variant="secondary">
                                    Stock: {item.stock}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>
            </ListDetailContentBody>
        </>
    )
}
