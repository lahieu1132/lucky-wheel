import React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/auth.service'
import UserService from '../services/user.service'
import { useEffect } from 'react'
import { useState, useRef } from 'react'
import { Button, Box } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { Wheel } from 'react-custom-roulette'

import Confetti from './Confetti'

function Home() {
  const user = AuthService.getCurrentUser()
  const navigate = useNavigate()
  const [listPrize, setListPrize] = useState([
    {
      option: 'dâsdasd',
      style: { backgroundColor: '#e83d45', textColor: 'white' },
    },
  ])
  const [histories, setHistories] = useState([])
  const [userInfo, setUserInfo] = useState({})
  const [message, setMessage] = useState({
    open: false,
    content: '',
    imgUrl: '',
  })
  const [prize, setPrize] = useState('')
  const [open, setOpen] = React.useState(false)
  const descriptionElementRef = useRef(null)

  const onUpdateSpinNumber = async () => {
    await AuthService.updateSpinNumber(user.id)
    fetchUserInfo()
  }
  useEffect(() => {
    if (message.open) {
      onUpdateSpinNumber()
      fetchHistory()
    }
  }, [message.open])

  const fetchData = async () => {
    const { data } = await AuthService.getListPrizes()
    setListPrize([...data.data])
  }

  const fetchUserInfo = async () => {
    try {
      const { data } = await AuthService.getUserInfo(user.id)
      setUserInfo(data.data)
      localStorage.setItem(
        'user',
        JSON.stringify({ ...user, ...data.data, prize: '' })
      )
      setPrize(data.data.prize)
    } catch (error) {
      navigate('/login')
    }
  }
  const fetchHistory = async () => {
    try {
      const res = await UserService.getUserHistory(user.id)
      setHistories(res.data.data?.reverse())
    } catch (error) {}
  }
  const [mustSpin, setMustSpin] = useState(false)

  const handleSpinClick = async () => {
    await fetchUserInfo()
    if (user?.numberOfSpins == 0) {
      setMessage({
        ...message,
        content: 'bạn đã hết lượt quay',
        open: true,
      })
    } else setMustSpin(true)
  }

  const handleSpinStop = async (e) => {
    try {
      setMustSpin(false)
      setMessage({
        ...message,
        content:
          'Chúc mừng bạn đã trúng ' +
          listPrize[listPrize.findIndex((item) => item.name == prize)].name,
        open: true,
        imgUrl:
          listPrize[listPrize.findIndex((item) => item.name == prize)].imgUrl,
        winner:
          listPrize[listPrize.findIndex((item) => item.name == prize)].name,
      })
    } catch (error) {}
  }
  useEffect(() => {
    fetchData()
    fetchUserInfo()
    fetchHistory()
    if (user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN')
      navigate('/login')
  }, [])

  const segColors = [
    '#ff4942',
    '#F9AA1F',
    '#9800ff',
    '#ff4942',
    '#00c2ff',
    '#ffa800',
    '#EC3F3F',
    '#ff00ff',
    '#8f00fd',
    '#F9AA1F',
    '#ccc000',
    '#00f1ff',
    '#ff4942',
    '#F9AA1F',
    '#9800ff',
    '#ff4942',
    '#00c2ff',
    '#ffa800',
    '#EC3F3F',
    '#ff00ff',
    '#8f00fd',
    '#F9AA1F',
    '#ccc000',
    '#00f1ff',
  ]

  return (
    <div className=" home-user">
      <div className="container home-user-main">
        {message.open && <Confetti />}

        {user && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                textAlign: 'center',
                color: '#EE4040',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Chào mừng {user.username}
            </span>
            <Box
              onClick={() => {
                AuthService.logout()
                navigate('/login')
              }}
              sx={{
                width: 40,
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #ccc',
                borderRadius: '10px',
                marginLeft: '20px',
                cursor: 'pointer',
              }}
            >
              <LogoutIcon />
            </Box>

            <Box
              onClick={() => {
                setOpen(true)
              }}
              sx={{
                width: 40,
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #ccc',
                borderRadius: '10px',
                marginLeft: '20px',
                cursor: 'pointer',
              }}
            >
              <MenuBookIcon />
            </Box>
          </div>
        )}
        <div className="ladi-image " style={{ gap: '0' }}>
          <div className="ladi-image-logo"></div>
          <button data-text="Awesome" class="buttonpma">
            <span class="actual-text">&nbsp;Vòng quay may mắn&nbsp;</span>
            <span class="hover-text" aria-hidden="true">
              &nbsp;Vòng quay may mắn&nbsp;
            </span>
          </button>
        </div>
        {user && (
          <p
            style={{
              textAlign: 'center',
              color: '#EE4040',
              fontSize: '20px',
              fontWeight: '500',
              marginBottom: '16px',
            }}
          >
            Còn lại: {userInfo?.numberOfSpins} lượt quay
          </p>
        )}
        <section
          className="relative justify-evenly align-middle flex sm:flex flex-col rotate-45"
          style={{
            'align-items': 'center',
          }}
        >
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={listPrize.findIndex((item) => item.name == prize)}
            data={listPrize?.map((item, index) => ({
              option:
                item.name?.split(' ').length > 4
                  ? item.name?.split(' ').slice(0, 4).join(' ') + '...'
                  : item.name,
              style: {
                backgroundColor: segColors[index],
                textColor: 'white',
                whiteSpace: 'data',
              },
            }))}
            spinDuration={0.5}
            onStopSpinning={handleSpinStop}
            fontSize={16}
            radiusLineWidth={0}
            disableInitialAnimation
            textDistance={55}
            pointerProps="none"
          />
          <div className={mustSpin ? 'wheel-bg active' : 'wheel-bg'}></div>
          <div className="absolute top-1/2 left-1/2 z-50 translate-y-[-50%] ">
            <button
              whileHover="hover"
              className="game_content_spin button"
              onClick={handleSpinClick}
            ></button>
          </div>
        </section>
        <div className="ladi-image">
          <div className="ladi-image-background"></div>
          <div className="ladi-image-background-2"></div>
        </div>
      </div>
      <Dialog
        open={message.open}
        onClose={() => setMessage({ ...message, open: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {user?.numberOfSpins > 0 ? 'Phần thưởng' : 'Thông báo'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message.content}
          </DialogContentText>
          {user?.numberOfSpins > 0 && (
            <img
              src={message.imgUrl}
              alt=""
              style={{
                width: '100%',
                height: '100px',
                borderRadius: '6px',
                objectFit: 'contain',
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="center" width="100%">
            <Button
              variant="contained"
              onClick={() => {
                setMessage({ ...message, open: false })
                // window.location.reload()
              }}
              autoFocus
            >
              ok
            </Button>
          </Box>
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
        <DialogTitle id="scroll-dialog-title">Lịch sử quay</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {histories?.map((item, index) => (
              <p
                style={{
                  fontSize: '.8rem',
                }}
              >
                {item.created + ': '}
                <span
                  style={{
                    fontSize: '1.2rem',
                  }}
                >
                  {item.prize}
                </span>
              </p>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Xong</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Home
