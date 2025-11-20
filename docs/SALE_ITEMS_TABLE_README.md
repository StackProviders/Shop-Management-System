# SaleItemsTable Component

The `SaleItemsTable` is a high-performance, feature-rich component designed for managing items within a sales transaction. It handles item selection, serial number scanning, quantity adjustments, and dynamic calculations for pricing, taxes, and discounts.

## Features

### 1. Item Management

- **Autocomplete Selection**:
    - Fast item search with debounced input.
    - Displays current stock levels and prices.
    - **Smart Filtering**: Automatically excludes items that have already been added to the table to prevent duplicates.
- **Dynamic Rows**: Easily add or remove item rows.

### 2. Serial Number Scanning

- **Individual Selection**: Click the barcode icon on a row to select specific serial numbers for that item.
- **Global Batch Scanning**:
    - Use the "Scan Barcode" button in the table header to open a global scanner.
    - **Batch Mode**: Scan multiple serial numbers continuously.
    - **Auto-Detection**: Automatically finds the item associated with the scanned serial number and adds it to the table.
    - **Duplicate Prevention**: Prevents scanning the same serial number twice in a session.
    - **Aggregation**: Groups multiple scanned serials for the same item into a single row with updated quantity.

### 3. Pricing & Calculations

- **Real-time Updates**: Automatically calculates line totals based on:
    - Quantity
    - Unit Price
    - Discount (Percentage or Fixed)
    - Tax Rate
- **Currency Formatting**: Supports localized currency formatting (defaulting to BDT `৳`).

### 4. Warranty Management

- **Flexible Input**: Supports both preset warranty periods (e.g., "1 Year", "6 Months") and custom text input.
- **Column Visibility**: The warranty column can be toggled on/off via the settings menu.

### 5. Performance Optimizations

- **Debounced Inputs**: Item name and other text inputs are debounced (300ms) to prevent excessive state updates and re-renders during typing.
- **Memoized Filtering**: The item autocomplete list uses memoization to ensure smooth filtering even with large datasets.
- **Efficient State Management**: Uses Zustand (`useSaleItemsStore`) for performant global state handling.

### 6. User Experience (UX)

- **Column Visibility Controls**: Users can customize which columns (Discount, Tax, Warranty, etc.) are visible to suit their workflow.
- **Keyboard Navigation**: Optimized for quick data entry.
- **Visual Feedback**: Color-coded stock indicators (Green for available, Red for out of stock).

## Usage

### Basic Implementation

```tsx
import { SaleItemsTable } from './sale-items-table'

export default function SalesPage() {
    return (
        <div className="p-4">
            <SaleItemsTable
                shopId="shop_123"
                // ... other props
            />
        </div>
    )
}
```

### Key Props

| Prop     | Type     | Description                                                                     |
| -------- | -------- | ------------------------------------------------------------------------------- |
| `shopId` | `string` | The ID of the current shop context. Used for fetching items and serial numbers. |

## Technical Details

- **State Management**: `src/features/sales/stores/sale-items-store.ts`
- **Column Definitions**: `src/features/sales/hooks/use-sale-table-columns.tsx`
- **Components**:
    - `GlobalSerialScanModal`: Handles the batch scanning logic.
    - `ItemAutocomplete`: The dropdown for selecting items.
    - `SerialNumberSelector`: The modal trigger for individual row serial selection.

## workflows

### Adding an Item via Search

1. Click on the "Item Name" field in an empty row.
2. Start typing the item name.
3. Select the item from the dropdown.
4. The price and tax details will auto-populate.

### Adding Items via Scanner

1. Click "Scan Barcode" in the table header.
2. Scan physical barcodes using a handheld scanner.
3. Items are automatically identified and added to the list.
4. Click "Add Items" to confirm and push them to the main table.
