import { useState } from 'react'
import { Box, Paper, Tabs, Tab } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import ListAltIcon from '@mui/icons-material/ListAlt'
import PaymentsIcon from '@mui/icons-material/Payments'
import SettingsIcon from '@mui/icons-material/Settings'
import HomeTab from './components/HomeTab'
import MeterTab from './components/MeterTab'
import BillTab from './components/BillTab'
import CollectTab from './components/CollectTab'
import SettingsTab from './components/SettingsTab'

export default function App() {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <Box sx={{
      minHeight: '100vh', bgcolor: '#eef2ff', display: 'flex',
      justifyContent: 'center', alignItems: 'center', p: 2, overflow: 'auto'
    }}>
      <Box sx={{
        width: '430px', maxWidth: '98vw', minHeight: '98vh', bgcolor: '#f8fafc',
        borderRadius: 5, boxShadow: 4, display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Header */}
        <Box sx={{
          bgcolor: '#2563eb', borderRadius: '20px 20px 0 0', px: 2, py: 2, boxShadow: 4, mb: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>Xin chào, Hiệp</span>
          <span style={{
            background: '#93c5fd', color: '#1d4ed8', fontWeight: 700, width: 38, height: 38,
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
          }}>H</span>
        </Box>
        {/* Tab nội dung */}
        <Box sx={{ flex: 1, px: 2, pb: '70px', overflowY: 'auto' }}>
          {activeTab === 0 && <HomeTab />}
          {activeTab === 1 && <MeterTab />}
          {activeTab === 2 && <BillTab />}
          {activeTab === 3 && <CollectTab />}
          {activeTab === 4 && <SettingsTab />}
        </Box>
        {/* Menu dưới */}
        <Paper elevation={6} sx={{
          position: 'absolute', left: 0, bottom: 0, width: '100%', bgcolor: '#fff',
          borderRadius: '18px 18px 0 0', boxShadow: 4, zIndex: 1000,
        }}>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant="fullWidth"
            sx={{ fontWeight: 700, minHeight: 44 }}
            TabIndicatorProps={{ sx: { height: 2, borderRadius: 2 } }}
          >
            <Tab icon={<HomeIcon sx={{ fontSize: 18 }} />} label={<span style={{ fontSize: 10 }}>Home</span>} />
            <Tab icon={<ElectricBoltIcon sx={{ fontSize: 18 }} />} label={<span style={{ fontSize: 10 }}>Điện</span>} />
            <Tab icon={<ListAltIcon sx={{ fontSize: 18 }} />} label={<span style={{ fontSize: 10 }}>Hóa đơn</span>} />
            <Tab icon={<PaymentsIcon sx={{ fontSize: 18 }} />} label={<span style={{ fontSize: 10 }}>Thu chi</span>} />
            <Tab icon={<SettingsIcon sx={{ fontSize: 18 }} />} label={<span style={{ fontSize: 10 }}>Cài đặt</span>} />
          </Tabs>
        </Paper>
      </Box>
    </Box>
  )
}