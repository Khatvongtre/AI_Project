import { Card, Typography, Box, Button, Divider } from '@mui/material'
import ListAltIcon from '@mui/icons-material/ListAlt'

export default function BillTab() {
    // Dữ liệu mẫu hóa đơn
    const bills = [
        { id: 1, room: 'P101', total: 3500000, status: 0 },
        { id: 2, room: 'P102', total: 2800000, status: 1 },
        { id: 3, room: 'P103', total: 4200000, status: 0 },
        { id: 4, room: 'P104', total: 3500000, status: 1 },
    ]
    return (
        <Card sx={{ borderRadius: 3, boxShadow: 2, p: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
                <ListAltIcon sx={{ color: "#2563eb" }} />
                <Typography variant="h6" fontWeight={700}>Hóa đơn phòng</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {bills.map(bill => (
                <Box key={bill.id} display="flex" alignItems="center" justifyContent="space-between" py={1} borderBottom="1px solid #f0f0f0">
                    <Box>
                        <Typography fontWeight={700}>{bill.room}</Typography>
                        <Typography variant="caption" color="text.secondary">{bill.total.toLocaleString()}đ</Typography>
                    </Box>
                    <Button
                        variant={bill.status === 0 ? "contained" : "outlined"}
                        color={bill.status === 0 ? "success" : "info"}
                        sx={{ borderRadius: 2, fontWeight: 700, fontSize: 13 }}
                    >
                        {bill.status === 0 ? "Thu" : "Đã thu"}
                    </Button>
                </Box>
            ))}
        </Card>
    )
}