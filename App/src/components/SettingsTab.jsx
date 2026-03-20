import { useState } from 'react'
import {
    Card, Typography, Box, Grid, TextField, Divider,
    InputAdornment, Button
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import WifiIcon from '@mui/icons-material/Wifi'
import PedalBikeIcon from '@mui/icons-material/PedalBike'
import RoomServiceIcon from '@mui/icons-material/RoomService'
import SaveIcon from '@mui/icons-material/Save'

function formatNumber(value) {
    if (!value) return ''
    const match = value.toString().match(/^(\d+(\.\d+)?)\s*tr$/i)
    let num = value.replaceAll('.', '').replaceAll(',', '').replace(/\s+/, '')
    if (match) {
        num = parseFloat(match[1]) * 1000000
    }
    if (!isNaN(num)) {
        return Number(num).toLocaleString('vi-VN')
    }
    return value
}

export default function SettingsTab() {
    const [values, setValues] = useState({
        ElectricPrice: '',
        WaterPrice: '',
        ServicePrice: '',
        InternetPrice: '',
        BikePrice: '',
        BankInfo: '',
        QR: ''
    })

    const handleChange = (field, value) => {
        setValues(v => ({ ...v, [field]: value }))
    }

    const handleQRChange = e => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = ev => {
            setValues(v => ({ ...v, QR: ev.target.result }))
        }
        reader.readAsDataURL(file)
    }

    const handleSave = () => {
        alert('Đã lưu cài đặt:\n' + JSON.stringify(values, null, 2))
    }

    return (
        <Card sx={{
            borderRadius: 3,
            boxShadow: 2,
            p: 2,
            maxWidth: 430,
            mx: 'auto',
            mb: 2
        }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
                <SettingsIcon sx={{ color: "#2563eb" }} />
                <Typography variant="h6" fontWeight={700}>Cài đặt</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {/* 2 input mỗi dòng */}
            <Grid container spacing={2} mb={2}>
                <Grid item xs={6}>
                    <TextField
                        label="Giá điện"
                        value={formatNumber(values.ElectricPrice)}
                        onChange={e => handleChange('ElectricPrice', e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><ElectricBoltIcon color="warning" /></InputAdornment>,
                            endAdornment: <InputAdornment position="end">₫/số</InputAdornment>
                        }}
                        size="small"
                        fullWidth
                        type="text"
                        variant="outlined"
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9,.tr]+'
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Giá nước"
                        value={formatNumber(values.WaterPrice)}
                        onChange={e => handleChange('WaterPrice', e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><WaterDropIcon color="primary" /></InputAdornment>,
                            endAdornment: <InputAdornment position="end">₫/người</InputAdornment>
                        }}
                        size="small"
                        fullWidth
                        type="text"
                        variant="outlined"
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9,.tr]+'
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Dịch vụ"
                        value={formatNumber(values.ServicePrice)}
                        onChange={e => handleChange('ServicePrice', e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><RoomServiceIcon color="success" /></InputAdornment>,
                            endAdornment: <InputAdornment position="end">₫/phòng</InputAdornment>
                        }}
                        size="small"
                        fullWidth
                        type="text"
                        variant="outlined"
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9,.tr]+'
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Internet"
                        value={formatNumber(values.InternetPrice)}
                        onChange={e => handleChange('InternetPrice', e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><WifiIcon color="info" /></InputAdornment>,
                            endAdornment: <InputAdornment position="end">₫/phòng</InputAdornment>
                        }}
                        size="small"
                        fullWidth
                        type="text"
                        variant="outlined"
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9,.tr]+'
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Xe điện"
                        value={formatNumber(values.BikePrice)}
                        onChange={e => handleChange('BikePrice', e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PedalBikeIcon color="secondary" /></InputAdornment>,
                            endAdornment: <InputAdornment position="end">₫/xe</InputAdornment>
                        }}
                        size="small"
                        fullWidth
                        type="text"
                        variant="outlined"
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9,.tr]+'
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Ngân hàng"
                        value={values.BankInfo}
                        onChange={e => handleChange('BankInfo', e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><CreditCardIcon color="success" /></InputAdornment>,
                        }}
                        size="small"
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
            </Grid>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography fontWeight={600}>QR thanh toán</Typography>
                <Box sx={{
                    bgcolor: "#e0e7ff",
                    width: 100,
                    height: 100,
                    mx: "auto",
                    borderRadius: 3,
                    mt: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    position: "relative"
                }}>
                    {values.QR
                        ? <img src={values.QR} alt="QR" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        : <QrCode2Icon color="primary" sx={{ fontSize: 40 }} />}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleQRChange}
                        style={{
                            position: "absolute",
                            inset: 0,
                            opacity: 0,
                            cursor: "pointer"
                        }}
                        title="Chọn ảnh QR"
                    />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                    Chạm vào ô QR để chọn ảnh
                </Typography>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    sx={{ borderRadius: 2, fontWeight: 700, px: 4 }}
                >
                    Lưu cài đặt
                </Button>
            </Box>
        </Card>
    )
}