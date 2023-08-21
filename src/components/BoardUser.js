import React, { useState, useEffect } from 'react'
import { TextField, InputLabel, Box, NativeSelect, Button } from '@mui/material'
import AuthService from '../services/auth.service'
import { Snackbar, Alert } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

function BoardUser() {
  const [listUsers, setListUsers] = useState([])
  const [filterListUser, setFilterListUsers] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [numberOfSpins, setNumberOfSpins] = useState('')
  const [prize, setPrize] = useState('')
  const [open, setOpen] = useState(false)

  const [listPrizes, setListPrizes] = useState([])
  const [message, setMessage] = useState({
    open: false,
    content: '',
    severity: '',
  })

  useEffect(() => {
    if (searchValue !== '') {
      setFilterListUsers(() => {
        return listUsers.filter((item) => item.username.includes(searchValue))
      })
    } else setFilterListUsers([...listUsers])
  }, [searchValue])

  const fetchUser = async () => {
    const response = await AuthService.getListUsers()
    setListUsers(response.data.data)
    setFilterListUsers(response.data.data)
  }

  const fetchPrizes = async () => {
    const response = await AuthService.getListPrizes()
    setListPrizes(response.data.data)
  }

  const onChangenumberOfSpins = (id, value) => {
    setFilterListUsers(() => {
      return filterListUser.map((item) => {
        if (item.id === id) return { ...item, numberOfSpins: value }
        return item
      })
    })
  }

  const onChangePrize = (id, value) => {
    setFilterListUsers(() => {
      return filterListUser.map((item) => {
        if (item.id === id) return { ...item, prize: value }
        return item
      })
    })
  }

  const onUpdate = async (id, numberOfSpins, prize) => {
    try {
      setMessage({ ...message, open: false })
      const response = await AuthService.updateUserById(
        id,
        numberOfSpins !== ' ' ? Number(numberOfSpins) : 0,
        prize
      )
      fetchUser()
      fetchPrizes()
      setMessage({
        content: 'Cập nhật thành công',
        open: true,
        severity: 'success',
      })
    } catch (error) {
      setMessage({
        content: 'bị lỗi, hãy thử lại sau',
        open: true,
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    fetchUser()
    fetchPrizes()
  }, [])

  return (
    <div className="board user">
      <Snackbar
        open={message.open}
        autoHideDuration={3000}
        onClose={() => setMessage({ ...message, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setMessage({ ...message, open: false })}
          severity={message.severity}
          sx={{ width: '100%' }}
        >
          {message.content}
        </Alert>
      </Snackbar>
      <Dialog open={open}>
        <DialogTitle>Thêm Thành Viên</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên giải thưởng"
            fullWidth
            variant="standard"
            onChange={(e) => setPrize({ ...prize, name: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Link ảnh"
            fullWidth
            variant="standard"
            onChange={(e) => setPrize({ ...prize, imgUrl: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button onClick={() => {}}>Thêm</Button>
        </DialogActions>
      </Dialog>
      <div className="main">
        <Box
          display="flex"
          gap={2}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <h1>Danh sách Thành Viên</h1>
          <Button variant="outlined" onClick={() => setOpen(true)}>
            Thêm thành viên
          </Button>
        </Box>
        <TextField
          id="outlined-basic"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          label="Tìm kiếm theo tên user"
          variant="outlined"
        />
        <div className="list">
          {filterListUser?.map((item, index) => (
            <div className="user-item" key={item.id}>
              <p>{item.username}</p>
              <TextField
                id="standard-basic"
                label="Lượt quay"
                value={item.numberOfSpins}
                variant="standard"
                className="turns"
                type="number"
                onChange={(event) =>
                  onChangenumberOfSpins(item.id, event.target.value)
                }
              />
              <Box className="gift">
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Giải thưởng
                </InputLabel>
                <NativeSelect
                  value={item.prize}
                  style={{
                    width: '100%',
                  }}
                  onChange={(e) => onChangePrize(item.id, e.target.value)}
                >
                  {listPrizes?.map((item) => (
                    <option value={item.name} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                  <option aria-label="None" value="" />
                </NativeSelect>
              </Box>
              <Button
                variant="contained"
                onClick={() =>
                  onUpdate(item.id, item.numberOfSpins, item.prize)
                }
              >
                Cập nhật
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BoardUser
