export const UNITS = [
    { id: 'none', fullName: 'None', shortName: '' },
    { id: 'bags', fullName: 'BAGS', shortName: 'Bag' },
    { id: 'bottles', fullName: 'BOTTLES', shortName: 'Btl' },
    { id: 'box', fullName: 'BOX', shortName: 'Box' },
    { id: 'bundles', fullName: 'BUNDLES', shortName: 'Bdl' },
    { id: 'cans', fullName: 'CANS', shortName: 'Can' },
    { id: 'cartons', fullName: 'CARTONS', shortName: 'Ctn' },
    { id: 'dozens', fullName: 'DOZENS', shortName: 'Dzn' },
    { id: 'grammes', fullName: 'GRAMMES', shortName: 'Gm' },
    { id: 'kilograms', fullName: 'KILOGRAMS', shortName: 'Kg' },
    { id: 'litre', fullName: 'LITRE', shortName: 'Ltr' },
    { id: 'meters', fullName: 'METERS', shortName: 'Mtr' },
    { id: 'mililitre', fullName: 'MILILITRE', shortName: 'Ml' },
    { id: 'numbers', fullName: 'NUMBERS', shortName: 'Nos' },
    { id: 'packs', fullName: 'PACKS', shortName: 'Pac' },
    { id: 'pairs', fullName: 'PAIRS', shortName: 'Prs' },
    { id: 'pieces', fullName: 'PIECES', shortName: 'Pcs' },
    { id: 'quintal', fullName: 'QUINTAL', shortName: 'Qtl' },
    { id: 'rolls', fullName: 'ROLLS', shortName: 'Rol' },
    { id: 'square-feet', fullName: 'SQUARE FEET', shortName: 'Sqf' },
    { id: 'square-meters', fullName: 'SQUARE METERS', shortName: 'Sqm' },
    { id: 'tablets', fullName: 'TABLETS', shortName: 'Tbs' }
] as const

export type UnitId = (typeof UNITS)[number]['id']
