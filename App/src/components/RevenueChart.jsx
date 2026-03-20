import { Card, Typography, Box } from '@mui/material'

export default function RevenueChart({ data }) {
    // data = [{color, value, label} ...] mẫu
    return (
        <Card sx={{ borderRadius: 3, boxShadow: 2, p: 2, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Biểu đồ doanh thu
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
                {data && data.map((d, i) =>
                    <Box key={i} sx={{
                        bgcolor: d.color,
                        height: d.value,
                        width: 40,
                        borderRadius: 2
                    }} />
                )}
            </Box>
            <Box mt={1} display="flex" justifyContent="space-between" fontSize={12} color="text.secondary">
                {data && data.map((d, i) => <span key={i}>{d.label}</span>)}
            </Box>
        </Card>
    )
}
// Ví dụ truyền data:
// [
//   {color:'#2563eb',value:28,label:'Tháng 1'},
//   {color:'#fb923c',value:16,label:'Tháng 2'},
//   {color:'#0f7d3f',value:22,label:'Tháng 3'},
//   {color:'#e0f2f1',value:14,label:'Tháng 4'},
//   {color:'#2563eb',value:32,label:'Tháng 5'}
// ]