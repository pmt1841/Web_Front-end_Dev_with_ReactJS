import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    IconButton,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import type {ProductWithType} from '../types'
import dayjs from 'dayjs'

interface ProductListProps {
    products: ProductWithType[]
    onEdit: (product: ProductWithType) => void
}

const ProductList: React.FC<ProductListProps> = ({products, onEdit}) => {
    if (products.length === 0) {
        return (
            <Typography variant="h6" align="center" sx={{mt: 4}}>
                Không tìm thấy sản phẩm
            </Typography>
        )
    }

    return (
        <TableContainer component={Paper} sx={{mt: 2}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Mã sản phẩm</TableCell>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell>Ngày nhập</TableCell>
                        <TableCell>Số lượng</TableCell>
                        <TableCell>Loại sản phẩm</TableCell>
                        <TableCell>Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product, index) => (
                        <TableRow key={product.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{dayjs(product.importDate).format('DD/MM/YYYY')}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>{product.type.name}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(product)}>
                                    <EditIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProductList
