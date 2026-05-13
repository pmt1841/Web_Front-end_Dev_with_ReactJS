export interface ProductType {
    id: string
    name: string
}

export interface Product {
    id: string
    name: string
    importDate: string
    quantity: number
    typeId: string
}

export interface ProductWithType extends Product {
    type: ProductType
}
