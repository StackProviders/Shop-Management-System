# Barcode Scanner Components

Reusable barcode scanning components for stock management, sales, and serial number tracking.

## Components

### BarcodeScanButton

A button that triggers barcode scanning with camera.

```typescript
import { BarcodeScanButton } from '@/features/barcode-scanner'

function StockAdd() {
  const handleScan = (barcode: string, format: string) => {
    console.log('Scanned:', barcode, format)
  }

  return (
    <BarcodeScanButton
      onScan={handleScan}
      variant="outline"
      size="icon"
    />
  )
}
```

**Props:**

- `onScan: (barcode: string, format: string) => void` - Callback when barcode is scanned
- `disabled?: boolean` - Disable the button
- `variant?: 'default' | 'outline' | 'ghost' | 'secondary'` - Button variant
- `size?: 'default' | 'sm' | 'lg' | 'icon'` - Button size
- `className?: string` - Additional CSS classes
- `formats?: Format[]` - Barcode formats to scan (default: QR, EAN13, EAN8, Code128, Code39)

### BarcodeScanInput

An input field with integrated scan button.

```typescript
import { BarcodeScanInput } from '@/features/barcode-scanner'

function ItemSearch() {
  const [barcode, setBarcode] = useState('')

  return (
    <BarcodeScanInput
      value={barcode}
      onChange={setBarcode}
      placeholder="Enter or scan item code"
    />
  )
}
```

**Props:**

- `value: string` - Input value
- `onChange: (value: string) => void` - Value change handler
- `placeholder?: string` - Input placeholder
- `disabled?: boolean` - Disable input and scan button
- `formats?: Format[]` - Barcode formats to scan
- `className?: string` - Additional CSS classes for input

## Use Cases

### 1. Stock Management - Add Stock

```typescript
import { BarcodeScanInput } from '@/features/barcode-scanner'

function AddStockForm() {
  const [itemCode, setItemCode] = useState('')
  const [quantity, setQuantity] = useState(0)

  return (
    <form>
      <BarcodeScanInput
        value={itemCode}
        onChange={setItemCode}
        placeholder="Scan item barcode"
      />
      <Input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
    </form>
  )
}
```

### 2. Sales - Find Item by Barcode

```typescript
import { BarcodeScanButton } from '@/features/barcode-scanner'

function SalesTable() {
  const handleScan = (barcode: string) => {
    // Find item by barcode and add to cart
    const item = findItemByBarcode(barcode)
    if (item) addToCart(item)
  }

  return (
    <div className="flex gap-2">
      <Input placeholder="Search items..." />
      <BarcodeScanButton onScan={handleScan} />
    </div>
  )
}
```

### 3. Serial Number Management

```typescript
import { BarcodeScanInput } from '@/features/barcode-scanner'

function SerialNumberModal() {
  const [serial, setSerial] = useState('')
  const [serials, setSerials] = useState<string[]>([])

  const handleAdd = () => {
    if (serial) {
      setSerials([...serials, serial])
      setSerial('')
    }
  }

  return (
    <div>
      <BarcodeScanInput
        value={serial}
        onChange={setSerial}
        placeholder="Scan serial number"
      />
      <Button onClick={handleAdd}>Add</Button>
    </div>
  )
}
```

### 4. Inventory Check

```typescript
import { BarcodeScanButton } from '@/features/barcode-scanner'

function InventoryCheck() {
  const [scannedItems, setScannedItems] = useState<string[]>([])

  const handleScan = (barcode: string) => {
    setScannedItems([...scannedItems, barcode])
    toast.success('Item scanned')
  }

  return (
    <div>
      <BarcodeScanButton
        onScan={handleScan}
        variant="default"
        size="lg"
        className="w-full"
      />
      <div>Scanned: {scannedItems.length} items</div>
    </div>
  )
}
```

## Supported Formats

- QR Code
- EAN-13
- EAN-8
- Code 128
- Code 39

## Features

- ✅ Camera permission handling
- ✅ Full-screen scanning
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling
- ✅ Mobile optimized
- ✅ Reusable across features
