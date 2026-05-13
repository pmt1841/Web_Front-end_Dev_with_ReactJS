import React, {useState, useEffect} from 'react'
import {
    TextField,
    Button,
    MenuItem,
    Box,
} from '@mui/material'
import type {ProductType} from '../types'
import {getProductTypes} from '../api'

interface SearchFormProps {
    onSearch: (name: string, typeId: string) => void
}

const SearchForm: React.FC<SearchFormProps> = ({onSearch}) => {
    const [name, setName] = useState(() => localStorage.getItem('searchName') || '');
    const [typeId, setTypeId] = useState(() => localStorage.getItem('searchTypeId') || '');
    const [types, setTypes] = useState<ProductType[]>([])


    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const data = await getProductTypes()
                setTypes(data)
            } catch {
                console.error('Lỗi khi tải danh sách loại sản phẩm')
            }
        }
        fetchTypes()
    }, [])

    const handleSearch = () => {
        localStorage.setItem('searchName', name);
        localStorage.setItem('searchTypeId', typeId);
        onSearch(name, typeId);
    };

    const handleReset = () => {
        localStorage.removeItem('searchName');
        localStorage.removeItem('searchTypeId');
        setName('');
        setTypeId('');
        onSearch('', '');
    };

    return (
        <Box sx={{display: 'flex', gap: 2, mb: 2, alignItems: 'center'}}>
            <TextField
                label="Tên sản phẩm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
            />
            <TextField
                select
                label="Loại sản phẩm"
                value={typeId}
                onChange={(e) => setTypeId(e.target.value)}
                sx={{ minWidth: 200 }}
            >
                <MenuItem value="">Tất cả</MenuItem>
                {types.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                        {type.name}
                    </MenuItem>
                ))}
            </TextField>
            <Button variant="contained" onClick={handleSearch}>
                Tìm kiếm
            </Button>
            <Button variant="outlined" onClick={handleReset}>
                Đặt lại
            </Button>
        </Box>
    )
}

export default SearchForm
