import { useState } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Box, IconButton, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css'

import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import authService from '../services/auth.service'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
const Item = ({ title, to, icon, selected, setSelected }) => {
  //   const theme = useTheme();

  //   const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: 'rgb(224, 224, 224)',
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  )
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState('Dashboard')
  const navigate = useNavigate()

  const user = authService.getCurrentUser()

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `#222222 !important`,
          height: '100vh',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} width={300}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: '#e0e0e0',
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={'#e0e0e0'}>
                  Quản lý
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={'#ccc'}
                  fontWeight="bold"
                  sx={{ m: '10px 0 0 0' }}
                >
                  {user.username}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Typography
              variant="h6"
              color={'#a3a3a3'}
              sx={{ m: '15px 0 5px 20px' }}
            >
              Chức năng
            </Typography>
            <Item
              title="Danh sách thành viên"
              to="/admin/users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Quản lý Giải thưởng"
              to="/admin/prize"
              icon={<EmojiEventsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Quản lý admin"
              to="/admin/history"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <MenuItem
              style={{
                color: 'red',
              }}
              onClick={() => {
                authService.logout()
                navigate('/')
              }}
              icon={<LogoutIcon />}
            >
              <Typography>Đăng xuất</Typography>
            </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar
