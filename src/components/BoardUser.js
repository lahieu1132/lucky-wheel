import React, { useState, useEffect } from 'react'
import { TextField, InputLabel, Box, NativeSelect, Button } from '@mui/material'
import AuthService from '../services/auth.service'
import { Snackbar, Alert } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import authService from '../services/auth.service'

function BoardUser() {
  const [listUsers, setListUsers] = useState([])
  const [filterListUser, setFilterListUsers] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [numberOfSpins, setNumberOfSpins] = useState('')
  const [prize, setPrize] = useState('')
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState({
    username: '',
    prize: '',
    numberOfSpins: 0,
    tel: '',
  })
  const admin = authService.getCurrentUser()

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

  const createUser = async () => {
    const phoneNumberRegex = /^(\+84|0)(\d){9,10}$/
    console.log(Number(user.numberOfSpins))
    setMessage({ ...message, open: false })
    try {
      phoneNumberRegex.test(user.tel)
      const res = await authService.createUser(
        user.username,
        user.tel,
        user.numberOfSpins,
        user.prize
      )
      fetchUser()
      setOpen(false)
      setMessage({
        content: 'Thêm thành công',
        open: true,
        severity: 'success',
      })
      console.log(res)
    } catch (error) {
      setMessage({
        content: error.response.data.message,
        open: true,
        severity: 'error',
      })
    }
  }

  const onUpdate = async (id, numberOfSpins, prize) => {
    try {
      setMessage({ ...message, open: false })
      const response = await AuthService.updateUserById(
        id,
        numberOfSpins !== ' ' ? Number(numberOfSpins) : 0,
        prize,
        admin.id
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

  const deleteUserById = async (id) => {
    try {
      const res = await authService.deleteUserById(id)
      fetchUser()
    } catch (error) {}
  }

  useEffect(() => {
    fetchUser()
    fetchPrizes()
  }, [])

  return (
    <div className="board user ">
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
            id="name"
            value={user.username}
            label="Tên người dùng"
            fullWidth
            variant="standard"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <TextField
            autoFocus
            id="name"
            label="số điện thoại"
            value={user.tel}
            fullWidth
            variant="standard"
            onChange={(e) => setUser({ ...user, tel: e.target.value })}
          />
          <TextField
            autoFocus
            type="number"
            id="name"
            value={user.numberOfSpins}
            label="số lượt quay"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setUser({ ...user, numberOfSpins: Number(e.target.value) })
            }
          />
          <Box className="gift">
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Giải thưởng
            </InputLabel>
            <NativeSelect
              value={user.prize}
              style={{
                width: '100%',
              }}
              onChange={(e) => setUser({ ...user, prize: e.target.value })}
            >
              {listPrizes?.map((item) => (
                <option value={item.name} key={item.id}>
                  {item.name}
                </option>
              ))}
              <option aria-label="None" value="" />
            </NativeSelect>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button onClick={createUser}>Thêm</Button>
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
        <div className="list ">
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
