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
import {
  Tooltip,
  IconButton,
  Avatar,
  Button,
  Box,
  MenuItem,
  Menu,
  TextField,
} from '@mui/material'
import { useState, useRef } from 'react'
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

function BoardHistory() {
  const [id, setId] = React.useState(0)
  const [open, setOpen] = useState(false)
  const [openCreateAdmin, setOpenCreateAdmin] = useState(false)
  const descriptionElementRef = useRef(null)

  const onRowDoubleClick = (row) => {
    console.log(row)

    setOpen(true)
  }

  return (
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onDoubleClick={() => onRowDoubleClick(row)}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openCreateAdmin}>
        <DialogTitle>Thêm Thành Viên</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên giải thưởng"
            fullWidth
            variant="standard"
            // onChange={(e) => setPrize({ ...prize, name: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Link ảnh"
            fullWidth
            variant="standard"
            // onChange={(e) => setPrize({ ...prize, imgUrl: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateAdmin(false)}>Hủy</Button>
          <Button onClick={() => {}}>Thêm</Button>
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
          Lịch sử cập nhật của admin:{' '}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      onDoubleClick={() => onRowDoubleClick(row)}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
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
  )
}

export default BoardHistory
