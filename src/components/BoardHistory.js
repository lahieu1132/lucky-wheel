import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, Box, TextField } from '@mui/material'
import { useState, useRef } from 'react'
import authService from '../services/auth.service'
import { useEffect } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

function BoardHistory() {
  const [open, setOpen] = useState(false)
  const [openCreateAdmin, setOpenCreateAdmin] = useState(false)
  const descriptionElementRef = useRef(null)
  const [adminLists, setAdminList] = useState([])
  const [historyList, setHistoryList] = useState([])
  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const [valueStart, setValueStart] = React.useState(
    dayjs(new Date().toJSON().slice(0, 10))
  )
  const [valueEnd, setValueEnd] = React.useState(
    dayjs(new Date().toJSON().slice(0, 10))
  )
  const admin = authService.getCurrentUser()

  const onRowDoubleClick = async (row) => {
    await fetchAdminHistory(row.id)
    setOpen(true)
  }
  const fetchAdminList = async () => {
    try {
      const res = await authService.getListAdmin()
      setAdminList([...res.data.data])
    } catch (error) {}
  }

  const fetchAdminHistory = async (id) => {
    try {
      const res = await authService.getListAdminHistoryById(
        id,
        dayjs(valueStart).format('YYYY-MM-DD'),
        dayjs(valueEnd).format('YYYY-MM-DD')
      )

      setHistoryList(res.data.data)
    } catch (error) {}
  }

  const createAdmin = async () => {
    try {
      const res = await authService.createAdmin(user.username, user.password)
      fetchAdminList()
    } catch (error) {}
  }

  useEffect(() => {
    fetchAdminList()
  }, [])

  return (
    <>
      {admin.role === 'SUPER_ADMIN' && (
        <div>
          <Box
            display="flex"
            gap={2}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <h1>Danh sách quản lý</h1>
            <Button variant="outlined" onClick={() => setOpenCreateAdmin(true)}>
              Thêm quản lý
            </Button>
          </Box>
          <Box>
            <DatePicker
              label="ngày bắt đầu"
              value={valueStart}
              onChange={(newValue) => {
                setValueStart(dayjs(newValue).format('YYYY-MM-DD'))
              }}
            />
            <DatePicker
              label="ngày kết thúc"
              value={valueEnd}
              onChange={(newValue) => {
                setValueEnd(dayjs(newValue).format('YYYY-MM-DD'))
              }}
            />
          </Box>

          <TableContainer
            component={Paper}
            style={{ overflowY: 'scroll', height: 'calc(100vh - 200px)' }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">số thứ tự</TableCell>
                  <TableCell align="center">Tên đăng nhập</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adminLists.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{index}</TableCell>
                    <TableCell align="center" style={{ fontSize: 24 }}>
                      {row.username}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => onRowDoubleClick(row)}
                      >
                        Lịch sử
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog open={openCreateAdmin}>
            <DialogTitle>Thêm quản lý</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Tên đăng nhập"
                value={user.username}
                fullWidth
                variant="standard"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
              <TextField
                autoFocus
                margin="dense"
                value={user.password}
                id="name"
                label="Mật khẩu"
                fullWidth
                variant="standard"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenCreateAdmin(false)}>Hủy</Button>
              <Button
                onClick={() => {
                  createAdmin()
                  setOpenCreateAdmin(false)
                }}
              >
                Thêm
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth="100%"
            maxWidth="100%"
          >
            <DialogTitle id="scroll-dialog-title">
              Lịch sử cập nhật của admin:
              {
                adminLists?.find((item) => item.id == historyList[0]?.adminId)
                  ?.username
              }
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                {' '}
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Tên user</TableCell>
                        <TableCell align="center">Số lượt quay</TableCell>
                        <TableCell align="center">Giải thưởng</TableCell>
                        <TableCell align="center">Thời gian</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {historyList.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                          onDoubleClick={() => onRowDoubleClick(row)}
                        >
                          <TableCell align="center">{row.user}</TableCell>
                          <TableCell align="center">
                            {row.numberOfSpins}
                          </TableCell>
                          <TableCell align="center">{row.prize}</TableCell>
                          <TableCell align="center">{row.updatedAt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Xong</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  )
}

export default BoardHistory
