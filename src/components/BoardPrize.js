import { Box, TextField, Snackbar, Button, Alert } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import AuthService from './../services/auth.service'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
function BoardPrize() {
  const [listPrize, setListPrize] = useState([])
  const [message, setMessage] = useState({
    open: false,
    content: '',
    severity: '',
  })
  const [prize, setPrize] = useState({
    name: '',
    imgUrl: '',
  })
  const [open, setOpen] = useState(false)

  const fetch = async () => {
    const response = await AuthService.getListPrizes()
    setListPrize(response.data.data)
  }

  useEffect(() => {
    fetch()
  }, [])

  const onUpdateName = (value, index) => {
    setListPrize(() => {
      return listPrize.map((item, i) => {
        if (i == index) return { ...item, name: value }
        return item
      })
    })
  }
  const onUpdateImg = (value, index) => {
    setListPrize(() => {
      return listPrize.map((item, i) => {
        if (i == index) return { ...item, imgUrl: value }
        return item
      })
    })
  }

  const onClickUpdate = async (id, name, imgUrl, index) => {
    try {
      setMessage({ ...message, open: false })
      const response = await AuthService.updatePrizeById(id, name, imgUrl)
      fetch()
      setMessage({
        content: 'Cập nhật thành công',
        open: true,
        severity: 'success',
      })
    } catch (e) {
      setMessage({
        content: 'bị lỗi, hãy thử lại sau',
        open: true,
        severity: 'error',
      })
    }
  }

  const CreatePrize = async () => {
    try {
      setMessage({ ...message, open: false })
      const response = await AuthService.createPrize(prize.name, prize.imgUrl)
      fetch()
      setMessage({
        content: 'Tạo giải thưởng thành công',
        open: true,
        severity: 'success',
      })
      setOpen(false)
    } catch (e) {
      setMessage({
        content: 'bị lỗi, hãy thử lại sau',
        open: true,
        severity: 'error',
      })
    }
  }

  const onDelete = async (id) => {
    try {
      setMessage({ ...message, open: false })
      const response = await AuthService.deletePrizeById(id)
      fetch()
      setMessage({ content: 'Xóa thành công', open: true, severity: 'success' })
    } catch (e) {
      setMessage({
        content: 'bị lỗi, hãy thử lại sau',
        open: true,
        severity: 'error',
      })
    }
  }

  return (
    <div className="board prize">
      <Box
        display="flex"
        gap={2}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <h1>Danh sách Giải thưởng</h1>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Thêm giải thưởng
        </Button>
      </Box>
      <Box display="flex" gap={2} flexDirection="column">
        <Box
          display="flex"
          gap={2}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          width="80%"
        >
          <p>Tên giải thưởng</p>
          <p>Link ảnh</p>
        </Box>
        {listPrize?.map((item, index) => (
          <Box
            display="flex"
            gap={2}
            flexDirection="row"
            alignItems="center"
            key={index}
          >
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              value={item.name}
              variant="filled"
              size="small"
              style={{ marginTop: '10px', width: '100%' }}
              onChange={(event) => onUpdateName(event.target.value, index)}
            />
            <TextField
              id="filled-hidden-label-small"
              value={item.imgUrl}
              variant="filled"
              size="small"
              style={{ marginTop: '10px', width: '100%' }}
              onChange={(event) => onUpdateImg(event.target.value, index)}
            />
            <Button
              variant="contained"
              onClick={() =>
                onClickUpdate(item.id, item.name, item.imgUrl, index)
              }
            >
              Cập nhật
            </Button>
            <Button variant="contained" onClick={() => onDelete(item.id)}>
              Xóa
            </Button>
          </Box>
        ))}
      </Box>

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
        <DialogTitle>Thêm giải thưởng</DialogTitle>
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
          <Button onClick={CreatePrize}>Thêm</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default BoardPrize
