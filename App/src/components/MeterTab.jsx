import { useState } from 'react'
import {
    Card, Typography, Box, Grid, TextField, Divider, Button,
    Switch, FormControlLabel, Checkbox, Chip
} from '@mui/material'

const roomData = [
    { id: 'P201', checked: true, people: 2, price: 3500000 },
    { id: 'P202', checked: true, people: 2, price: 3500000 },
    { id: 'P203', checked: true, people: 1, price: 3000000 },
    { id: 'P204', checked: false, people: 0, price: 0 },
]

export default function MeterTab() {
    const [name, setName] = useState('Bình nóng lạnh Tầng 2')
    const [floor, setFloor] = useState(2)
    const [autoAssign, setAutoAssign] = useState(true)
    const [rooms, setRooms] = useState(roomData)

    const handleCheckRoom = idx => {
        setRooms(rooms =>
            rooms.map((r, i) =>
                i === idx ? { ...r, checked: !r.checked } : r
            )
        )
    }

    const handleSave = () => {
        alert('Đã lưu công tơ:\n' +
            JSON.stringify({
                name, floor, autoAssign, rooms
            }, null, 2)
        )
    }

    return (
        <Box sx={{ maxWidth: 440, mx: 'auto', mt: 2, mb: 4 }}>
            <Card sx={{ borderRadius: 3, boxShadow: 2, p: 2 }}>
                <Typography fontWeight={700} fontSize={18} mb={2}>Quản lý công tơ</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography fontWeight={600} fontSize={15} mb={1}>Tên công tơ</Typography>
                <TextField
                    value={name} onChange={e => setName(e.target.value)}
                    fullWidth size="small" variant="outlined"
                    placeholder="Nhập tên công tơ"
                    sx={{ mb: 2 }}
                />
                <Typography fontWeight={600} fontSize={15} mb={1}>Tầng</Typography>
                <TextField
                    value={floor}
                    onChange={e => setFloor(e.target.value.replace(/\D/g, ''))}
                    fullWidth size="small" variant="outlined" type="number"
                    sx={{ mb: 2, maxWidth: 120 }}
                />
                <FormControlLabel
                    control={
                        <Switch checked={autoAssign} onChange={e => setAutoAssign(e.target.checked)}
                            color="primary"
                        />
                    }
                    label={<Typography fontWeight={600} fontSize={15}>Tự động gán phòng theo tầng</Typography>}
                    sx={{ mb: 1 }}
                />
            </Card>

            <Box mt={3}>
                <Typography fontWeight={700} fontSize={16} mb={0.5}>Danh sách phòng</Typography>
                <Typography fontSize={13} color="text.secondary" mb={2}>
                    Auto map phòng ở tầng {floor}. Bạn có thể chỉnh sửa từng phòng nếu muốn.
                </Typography>

                {/* Danh sách phòng */}
                {rooms.map((room, idx) => (
                    <Box key={room.id}
                        sx={{
                            display: 'flex', alignItems: 'center',
                            bgcolor: '#fff', borderRadius: 2, mb: 1,
                            boxShadow: room.checked ? 1 : 0,
                            border: room.checked ? '1px solid #c7d2fe' : '1px solid #e3e5e7',
                            p: 1.2,
                            gap: 1
                        }}>
                        <Checkbox
                            checked={room.checked}
                            onChange={() => handleCheckRoom(idx)}
                            color="primary"
                            sx={{ mr: 1 }}
                        />
                        <Typography fontWeight={700} fontSize={15} sx={{ width: 60 }}>
                            {room.id}
                        </Typography>
                        {room.checked && (
                            <Chip
                                label={`${room.people} người · ${room.price.toLocaleString('vi-VN')} đ`}
                                color="success"
                                size="small"
                                sx={{ fontWeight: 600, fontSize: 13, ml: 1 }}
                            />
                        )}
                    </Box>
                ))}
            </Box>

            {/* Nút Lưu lớn */}
            <Box sx={{ mt: 3 }}>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        bgcolor: '#2563eb', color: '#fff', fontWeight: 700,
                        borderRadius: 2, fontSize: 16, py: 1.5
                    }}
                    onClick={handleSave}
                >Lưu</Button>
            </Box>
        </Box>
    )
}