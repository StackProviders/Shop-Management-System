import {
    ListDetailContentHeader,
    ListDetailContentHeaderTitle,
    ListDetailContentHeaderInfo,
    ListDetailContentHeaderInfoItem,
    ListDetailContentBody
} from '@/components/ui/list-detail-layout'
import { Button } from '@/components/ui/button'

export function generateStaticParams() {
    return [{ id: '1' }]
}

export default function UnitDetailPage() {
    return (
        <>
            <ListDetailContentHeader>
                <ListDetailContentHeaderTitle>
                    <h2 className="text-lg font-semibold">PIECE (PCS)</h2>
                    <Button size="sm">EDIT UNIT</Button>
                </ListDetailContentHeaderTitle>

                <ListDetailContentHeaderInfo>
                    <ListDetailContentHeaderInfoItem
                        label="SHORT NAME"
                        value="pcs"
                    />
                    <ListDetailContentHeaderInfoItem
                        label="TYPE"
                        value="Count"
                    />
                    <ListDetailContentHeaderInfoItem
                        label="ITEMS USING"
                        value="45"
                    />
                </ListDetailContentHeaderInfo>
            </ListDetailContentHeader>

            <ListDetailContentBody>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold mb-2">
                            DESCRIPTION
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Standard unit for counting individual items or
                            pieces. Used for discrete, countable products.
                        </p>
                    </div>
                </div>
            </ListDetailContentBody>
        </>
    )
}
