import React from 'react'
import WheelComponent from '../WheelComponent'
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { Tooltip, IconButton, Avatar,Button,Box, MenuItem, Menu } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';


function Home() {
  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [listPrize, setListPrize] = useState([])
  const [message, setMessage] = useState({
    open: false,
    content:"",
    imgUrl: ""
  })
  const [open, setOpen] = React.useState(false);

  const descriptionElementRef = useRef(null)

  const onUpdateSpinNumber = async () => {
    const res = await AuthService.updateSpinNumber(user.id)
      fetchUserInfo()
  }

  useEffect(()=>{
    if(message.open) {
      onUpdateSpinNumber()
    }
  },[message.open] )


  const fetchData = async () => {
    const {data} = await AuthService.getListPrizes();
    setListPrize([...data.data])
  }

  const fetchUserInfo = async () => {
    try {
      const {data} = await AuthService.getUserInfo(user.id);
      localStorage.setItem("user", JSON.stringify({...user, ...data.data}))
    } catch (error) {
      navigate('/login')
    }
  }
  useEffect(()=>{
    fetchData()
    fetchUserInfo()
  },[])


  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000"
  ];
  const onFinished = async (winner) => {
    
    try {
      if(winner !== undefined) {
        await setTimeout(()=>{
          if(user?.numberOfSpins == 0) {
            setMessage({...message, content: "bạn đã hết lượt quay", open: true})
          }
          else {
            const imgUrl = listPrize.find(item=> item.name.trim() === winner.trim()).imgUrl
            setMessage({...message, content: "Chúc mừng bạn đã trúng " + winner, open: true,imgUrl: imgUrl, winner: winner })
          } 
        },1500)
      }
    } catch (error) {
      console.log(error)
    }
     
  };



  return (
    <div className=" home-user">
      <div className="container home-user-main">
      <div className='ladi-image'>
        <div className="ladi-image-background"></div>
        <div className="ladi-image-background-2"></div>
      </div>
      {
          !user ? <>
             <button className='button' onClick={()=>navigate("/login")} >Đăng nhập</button>  
              <div class="loader">
                <span class="loader-text">Đăng nhập để nhận quà</span>
              </div>
          </> :
          <div style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center'
          }}>  
            <span style={{textAlign:'center', color:'#fff', fontSize: '20px', fontWeight:'500'}}>chào mừng {user.username}</span>
            <Box onClick={()=>{
              AuthService.logout()
              navigate('/login')
            }}
            sx={{
              width: 40,
              height: 40,
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              border: '1px solid #ccc',
              borderRadius:'10px',
              marginLeft:"20px",
              cursor:"pointer"
            }}
            >
              <LogoutIcon />
            </Box>

            <Box onClick={()=>{
              setOpen(true)
            }}
              sx={{
                width: 40,
              height: 40,
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              border: '1px solid #ccc',
              borderRadius:'10px',
              marginLeft:"20px",
              cursor:"pointer"
              }}
            >
              <MenuBookIcon />
            </Box>

          </div>
         }
        <h2>Vòng quay may mắn</h2>
      {
        user && <p style={{textAlign:'center', color:'#fff', fontSize: '20px', fontWeight:'500'}}>Còn lại: {user?.numberOfSpins} lượt quay</p>
      }

      <div className='wheel'>
        <WheelComponent
            segments={listPrize.map(item=>item.name)}
            segColors={segColors}
            winningSegment={user?.prize || ""}
            onFinished={(winner) => onFinished(winner)}
            primaryColor="black"
            primaryColoraround="#ffffffb4"
            contrastColor="white"
            buttonText="Start"
            isOnlyOnce={false}
            size={290}
            upDuration={500}
            downDuration={2000}
        />
      </div>
      </div>
      <Dialog
        open={message.open}
        onClose={()=>setMessage({...message, open: false})}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {user?.numberOfSpins > 0 ? "Phần thưởng" : "Thông báo"}
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
            {message.content}
          </DialogContentText>
          {
            user?.numberOfSpins > 0 && <img src={message.imgUrl} alt="" 
            style={{
              width: '100%',
              height:'100px',
              borderRadius: '6px',
              objectFit:'contain'
            }}
          
          />
          }
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="center" width='100%'>
            <Button  variant="contained" onClick={()=>{
              setMessage({...message, open: false})
              window.location.reload();

            }} autoFocus>
              ok
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth="100%"
        maxWidth="100%"
      >
        <DialogTitle id="scroll-dialog-title">Lịch sử quay</DialogTitle>
        <DialogContent >
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {
              user?.prizeHistories?.reverse()?.map((item, index)=>
                <p style={{
                  fontSize: '.8rem'                  
                }}>
                  {item.dateTimeAt + ": "}
                  <span 
                    style={{
                      fontSize: '1.2rem'                  
                    }}
                  >{ item.prize}</span>
                </p>
              )
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Xong</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Home
