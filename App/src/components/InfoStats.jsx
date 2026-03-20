import { Grid, Card, Typography, Box } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'

export default function InfoStats({ stats }) {
    return (
        <Box sx={{ maxWidth: 430, margin: '0 auto', mb: 2 }}>
            {/* Hai box lớn phía trên */}
            <Grid container spacing={2} mb={3}
                sx={{
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Grid item xs={6}>
                    <Card sx={{
                        bgcolor: '#e0f2f1',
                        borderRadius: 3,
                        boxShadow: 3,
                        p: 2,
                        color: '#0f7d3f',
                        minHeight: 70,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Typography sx={{ fontWeight: 900, fontSize: 22 }}>
                            {stats?.collected || '0đ'}
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: 15, opacity: 0.85 }}>
                            Đã thu
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{
                        bgcolor: '#fff7ed',
                        borderRadius: 3,
                        boxShadow: 3,
                        p: 2,
                        color: '#fb923c',
                        minHeight: 70,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Typography sx={{ fontWeight: 900, fontSize: 22 }}>
                            {stats?.unpaid || '0đ'}
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: 15, opacity: 0.85 }}>
                            Chưa thu
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

            {/* Hai box nhỏ phía dưới */}
            <Grid container spacing={2} mb={2}
                sx={{
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Grid item xs={6}>
                    <Box sx={{
                        bgcolor: '#fff',
                        borderRadius: 3,
                        boxShadow: 1,
                        p: 1.5,
                        minHeight: 55,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <HomeIcon sx={{ color: '#04b01b', fontSize: 28 }} />
                        <Box>
                            <Typography sx={{ color: '#04b01b', fontWeight: 700, fontSize: 16 }}>
                                {stats?.totalRooms || '0'}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#04b01b', fontSize: 13 }}>
                                Tổng
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{
                        bgcolor: '#fff',
                        borderRadius: 3,
                        boxShadow: 1,
                        p: 1.5,
                        minHeight: 55,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <MeetingRoomIcon sx={{ color: '#fb923c', fontSize: 28 }} />
                        <Box>
                            <Typography sx={{ fontWeight: 700, color: '#fb923c', fontSize: 16 }}>
                                {stats?.emptyRooms || '0'}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#fb923c', fontSize: 13 }}>
                                Trống
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}