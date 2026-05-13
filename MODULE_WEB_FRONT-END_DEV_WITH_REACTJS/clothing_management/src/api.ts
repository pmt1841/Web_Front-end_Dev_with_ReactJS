import axios from 'axios'
import type {Product, ProductType, ProductWithType} from './types'

const API_BASE_URL = 'http://localhost:3001'

export const api = axios.create({
    baseURL: API_BASE_URL,
})

export const getProducts = async (): Promise<ProductWithType[]> => {
    const [productsRes, typesRes] = await Promise.all([
        api.get<Product[]>('/products'),
        api.get<ProductType[]>('/types'),
    ])
    const typesMap = new Map(typesRes.data.map(t => [t.id, t]))
    return productsRes.data.map(p => ({
        ...p,
        type: typesMap.get(p.typeId)!,
    })).sort((a, b) => a.quantity - b.quantity)
}

export const getProductTypes = async (): Promise<ProductType[]> => {
    const res = await api.get<ProductType[]>('/types')
    return res.data
}

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
    const res = await api.patch<Product>(`/products/${id}`, product)
    return res.data
}

export const searchProducts = async (name?: string, typeId?: string): Promise<ProductWithType[]> => {
    const [productsRes, typesRes] = await Promise.all([
        api.get<Product[]>('/products'),
        api.get<ProductType[]>('/types'),
    ])
    const typesMap = new Map(typesRes.data.map(t => [t.id, t]))
    let filtered = productsRes.data.map(p => ({
        ...p,
        type: typesMap.get(p.typeId)!,
    }))
    if (name) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
    }
    if (typeId) {
        filtered = filtered.filter(p => p.typeId === typeId)
    }
    return filtered.sort((a, b) => a.quantity - b.quantity)
}
