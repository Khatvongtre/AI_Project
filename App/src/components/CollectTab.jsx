import { Card, Typography, Box, Divider } from '@mui/material'
import PaymentsIcon from '@mui/icons-material/Payments'

export default function CollectTab() {
    // Dữ liệu mẫu thu chi
    const collects = [
        { id: 1, desc: 'Thu phòng P101', value: '+4,120,000', type: 'in' },
        { id: 2, desc: 'Chi sửa điện', value: '-200,000', type: 'out' },
        { id: 3, desc: 'Thu phòng P102', value: '+3,500,000', type: 'in' },
        { id: 4, desc: 'Chi mua máy bơm', value: '-1,000,000', type: 'out' },
    ]
    return (
        <Card sx={{ borderRadius: 3, boxShadow: 2, p: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
                <PaymentsIcon sx={{ color: "#2563eb" }} />
                <Typography variant="h6" fontWeight={700}>Thu chi</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {collects.map(c => (
                <Box key={c.id} display="flex" justifyContent="space-between" alignItems="center" py={1} borderBottom="1px solid #f0f0f0">
                    <Typography fontWeight={600}>{c.desc}</Typography>
                    <Typography fontWeight={700} color={c.type === 'in' ? "success.main" : "error.main"}>
                        {c.value}
                    </Typography>
                </Box>
            ))}
        </Card>
    )
}