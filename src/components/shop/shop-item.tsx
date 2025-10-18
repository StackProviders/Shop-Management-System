import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle
} from '@/components/ui/item'
import { ShieldAlertIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ShopItem() {
    return (
        <Item className="bg-background" variant="outline">
            <ItemMedia variant="icon">
                <ShieldAlertIcon />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>Security Alert</ItemTitle>
                <ItemDescription>
                    New login detected from unknown device.
                </ItemDescription>
            </ItemContent>
            <ItemActions>
                <Button size="sm" variant="outline">
                    Review
                </Button>
            </ItemActions>
        </Item>
    )
}
