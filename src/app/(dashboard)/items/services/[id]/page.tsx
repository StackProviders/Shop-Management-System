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

export default function ServiceDetailPage() {
    return (
        <>
            <ListDetailContentHeader>
                <ListDetailContentHeaderTitle>
                    <h2 className="text-lg font-semibold">
                        INSTALLATION SERVICE
                    </h2>
                    <Button size="sm">EDIT SERVICE</Button>
                </ListDetailContentHeaderTitle>

                <ListDetailContentHeaderInfo>
                    <ListDetailContentHeaderInfoItem
                        label="SERVICE RATE"
                        value="2,500.00 ৳"
                    />
                    <ListDetailContentHeaderInfoItem
                        label="DURATION"
                        value="2 Hours"
                    />
                    <ListDetailContentHeaderInfoItem
                        label="CATEGORY"
                        value="Technical"
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
                            Professional installation service for networking
                            equipment and devices. Includes setup,
                            configuration, and testing.
                        </p>
                    </div>
                </div>
            </ListDetailContentBody>
        </>
    )
}
