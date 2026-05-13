import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Container, Typography, Box} from '@mui/material'
import type {ProductWithType} from '../types'
import {getProducts, searchProducts} from '../api'
import ProductList from '../components/ProductList'
import SearchForm from '../components/SearchForm'

const ProductListPage: React.FC = () => {
    const [products, setProducts] = useState<ProductWithType[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const fetchProducts = async () => {
        try {
            const data = await getProducts()
            setProducts(data)
        } catch {
            console.error('Lỗi khi tải danh sách sản phẩm')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleSearch = async (name: string, typeId: string) => {
        setLoading(true)
        try {
            const data = await searchProducts(name || undefined, typeId || undefined)
            setProducts(data)
        } catch {
            console.error('Lỗi khi tìm kiếm')
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (product: ProductWithType) => {
        navigate(`/edit/${product.id}`)
    }

    if (loading) {
        return <Typography>Đang tải...</Typography>
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{my: 4}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Quản lý quần áo
                </Typography>
                <SearchForm onSearch={handleSearch}/>
                <ProductList products={products} onEdit={handleEdit}/>
            </Box>
        </Container>
    )
}

export default ProductListPage
