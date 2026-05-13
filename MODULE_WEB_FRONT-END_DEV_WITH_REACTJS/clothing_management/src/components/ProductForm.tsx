import React, {useState, useEffect} from 'react'
import {
    TextField,
    Button,
    MenuItem,
    Box,
    Alert,
} from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, {Dayjs} from 'dayjs'
import type {ProductWithType, ProductType} from '../types'
import {updateProduct, getProductTypes} from '../api'
import {useNavigate} from 'react-router-dom'

interface ProductFormProps {
    product: ProductWithType
    onSuccess: () => void
}

const ProductForm: React.FC<ProductFormProps> = ({product, onSuccess}) => {
    const [name, setName] = useState(product.name)
    const [importDate, setImportDate] = useState<Dayjs | null>(dayjs(product.importDate))
    const [quantity, setQuantity] = useState(product.quantity.toString())
    const [typeId, setTypeId] = useState(product.typeId)
    const [types, setTypes] = useState<ProductType[]>([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const data = await getProductTypes()
                setTypes(data)
            } catch {
                setError('Lỗi khi tải danh sách loại sản phẩm')
            }
        }
        fetchTypes()
    }, [])

    const validate = () => {
        if (name.length > 100) {
            setError('Tên sản phẩm không quá 100 ký tự')
            return false
        }
        if (name.length === 0) {
            setError('Tên sản phẩm không được để trống')
            return false
        }
        if (!importDate || !importDate.isValid()) {
            setError('Ngày nhập không hợp lệ hoặc trống');
            return false;
        }
        const today = dayjs().startOf('day');
        const selectedDate = importDate.startOf('day');
        if (selectedDate.isAfter(today)) {
            setError('Ngày nhập không được lớn hơn ngày hiện tại');
            return false;
        }
        const qty = parseInt(quantity)
        if (isNaN(qty) || qty <= 0) {
            setError('Số lượng phải là số nguyên lớn hơn 0')
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        const isValid = validate()
        if (!isValid) return

        try {
            await updateProduct(product.id, {
                name,
                importDate: importDate!.format('YYYY-MM-DD'),
                quantity: parseInt(quantity),
                typeId,
            })
            setSuccess(true)
            setTimeout(() => {
                onSuccess()
            }, 2000)
        } catch {
            setError('Lỗi khi cập nhật sản phẩm')
        }
    }

    if (success) {
        return (
            <Alert severity="success" sx={{mt: 2}}>
                Cập nhật thành công! Quay về danh sách sau 2 giây...
            </Alert>
        )
    }

    const isNameError = !!error && (error.includes('Tên') || error.includes('trống'));
    const isDateError = !!error && error.includes('Ngày');
    const isQuantityError = !!error && error.includes('Số lượng');

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Button variant="outlined" onClick={() => navigate('/')} sx={{mb: 2}}>
                Quay lại danh sách
            </Button>
            <Box component="form" onSubmit={handleSubmit} sx={{mt: 2}}>
                {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}
                <TextField
                    fullWidth
                    label="Tên sản phẩm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                    error={isNameError}
                />
                <DatePicker
                    label="Ngày nhập"
                    value={importDate}
                    onChange={(newValue) => {
                        setImportDate(newValue);
                        setError('');
                    }}
                    maxDate={dayjs()}
                    format="DD/MM/YYYY"
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            margin: 'normal',
                            error: isDateError,
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="Số lượng"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    margin="normal"
                    error={isQuantityError}
                />
                <TextField
                    fullWidth
                    select
                    label="Loại sản phẩm"
                    value={typeId}
                    onChange={(e) => setTypeId(e.target.value)}
                    margin="normal"
                    error={false}
                >
                    {types.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                            {type.name}
                        </MenuItem>
                    ))}
                </TextField>
                <Button type="submit" variant="contained" sx={{mt: 2}}>
                    Cập nhật
                </Button>
            </Box>
        </LocalizationProvider>
    );
}

export default ProductForm
