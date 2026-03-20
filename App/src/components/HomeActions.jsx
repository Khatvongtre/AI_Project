import { Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import SmartToyIcon from '@mui/icons-material/SmartToy'

export default function HomeActions({ onAddRoom, onMeter, onAi }) {
    return (
        <Box display="flex" gap={1} mb={2} height={40}>
            <Button
                variant="contained"
                startIcon={<AddIcon sx={{ fontSize: 19 }} />}
                sx={{
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: '12px',
                    py: 0.6,
                    px: 1.5,
                    flex: 1,
                    boxShadow: 1,
                    bgcolor: '#2563eb',
                    color: '#fff',
                    lineHeight: 1.2,
                    textTransform: 'none'
                }}
                onClick={onAddRoom}
            >Thêm phòng</Button>
            <Button
                variant="outlined"
                startIcon={<ElectricBoltIcon sx={{ fontSize: 19 }} />}
                sx={{
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: '12px',
                    py: 0.6,
                    px: 1.5,
                    flex: 1,
                    lineHeight: 1.2,
                    textTransform: 'none'
                }}
                onClick={onMeter}
            >Chốt điện</Button>
            <Button
                variant="outlined"
                startIcon={<SmartToyIcon sx={{ fontSize: 19 }} />}
                sx={{
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: '12px',
                    py: 0.6,
                    px: 1.5,
                    flex: 1,
                    lineHeight: 1.2,
                    textTransform: 'none'
                }}
                onClick={onAi}
            >AI</Button>
        </Box>
    )
}