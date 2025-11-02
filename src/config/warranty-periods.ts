export const WARRANTY_PERIODS = [
    { value: '1-day', label: '1 Day', days: 1 },
    { value: '3-days', label: '3 Days', days: 3 },
    { value: '7-days', label: '7 Days', days: 7 },
    { value: '15-days', label: '15 Days', days: 15 },
    { value: '30-days', label: '30 Days', days: 30 },
    { value: '3-months', label: '3 Months', days: 90 },
    { value: '6-months', label: '6 Months', days: 180 },
    { value: '1-year', label: '1 Year', days: 365 },
    { value: '2-years', label: '2 Years', days: 730 },
    { value: 'custom', label: 'Custom', days: 0 }
] as const

export type WarrantyPeriodValue = (typeof WARRANTY_PERIODS)[number]['value']
