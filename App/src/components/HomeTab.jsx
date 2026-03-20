import InfoStats from './InfoStats'
import HomeActions from './HomeActions'
import RevenueChart from './RevenueChart'
import { Card, Typography, Box } from '@mui/material'

export default function HomeTab() {
    // Dữ liệu mẫu
    const stats = {
        collected: '2.500.000đ',
        unpaid: '1.500.000đ',
        totalRooms: '10 phòng',
        emptyRooms: '3 phòng'
    }
    const revenueData = [
        { color: '#2563eb', value: 28, label: 'Tháng 1' },
        { color: '#fb923c', value: 16, label: 'Tháng 2' },
        { color: '#0f7d3f', value: 22, label: 'Tháng 3' },
        { color: '#e0f2f1', value: 14, label: 'Tháng 4' },
        { color: '#2563eb', value: 32, label: 'Tháng 5' }
    ]
    return (
        <Box>
            <InfoStats stats={stats} />
            <HomeActions
                onAddRoom={() => alert('Thêm phòng')}
                onMeter={() => alert('Chốt điện')}
                onAi={() => alert('AI')}
            />
            <RevenueChart data={revenueData} />
            {/* Các card khác */}
            <Card sx={{ borderRadius: 3, boxShadow: 2, bgcolor: '#fff', p: 2 }}>
                <Typography fontWeight={700}>Chưa thu</Typography>
                <Typography color="text.secondary">Chưa thu</Typography>
            </Card>
        </Box>
    )
}