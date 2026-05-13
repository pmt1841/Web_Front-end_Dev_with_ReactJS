import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {Container, Typography, Box} from '@mui/material'
import type {ProductWithType} from '../types'
import {getProducts} from '../api'
import ProductForm from '../components/ProductForm'

const ProductEditPage: React.FC = () => {
    const {id} = useParams<{ id: string }>()
    const [product, setProduct] = useState<ProductWithType | null>(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const products = await getProducts()
                const found = products.find(p => p.id === id)
                if (found) {
                    setProduct(found)
                } else {
                    navigate('/')
                }
            } catch {
                console.error('Lỗi khi tải sản phẩm')
                navigate('/')
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id, navigate])

    const handleSuccess = () => {
        navigate('/')
    }

    if (loading) {
        return <Typography>Đang tải...</Typography>
    }

    if (!product) {
        return <Typography>Sản phẩm không tồn tại</Typography>
    }

    return (
        <Container maxWidth="md">
            <Box sx={{my: 4}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Chỉnh sửa sản phẩm
                </Typography>
                <ProductForm product={product} onSuccess={handleSuccess}/>
            </Box>
        </Container>
    )
}

export default ProductEditPage
