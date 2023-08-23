import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import Router from './Router'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router />
    </LocalizationProvider>
  )
}

export default App
