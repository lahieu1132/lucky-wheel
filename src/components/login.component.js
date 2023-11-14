import React from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import AuthService from '../services/auth.service'
import { Link } from 'react-router-dom'
import UserService from './../services/user.service'

import { withRouter } from '../common/with-router'
import { useState } from 'react'
import authService from '../services/auth.service'
import { useEffect } from 'react'

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

function Login(props) {
  const [username, setUserName] = useState('')
  const [tel, setTel] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function onChangeUsername(e) {
    setUserName(e.target.value.trim())
  }

  function onChangePassword(e) {
    setTel(e.target.value.trim())
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    UserService.loginUser(username, tel).then(
      (res) => {
        props.router.navigate('/')
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        setMessage(resMessage)
        setLoading(false)
      }
    )
  }

  return (
    <div className="col-md-12 login">
      <div
        className="card card-container"
        style={{
          background: 'rgb(131,58,180)',
          background:
            'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
        }}
      >
        <h2>Vòng quay may mắn</h2>
        <Form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username" style={{ fontSize: 20, color: 'white' }}>
              Tên tài khoản
            </label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" style={{ fontSize: 20, color: 'white' }}>
              Số điện thoại
            </label>
            <Input
              type="text"
              className="form-control"
              name="password"
              value={tel}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
          <p style={{ fontSize: 18, color: 'white' }}>
            Tạo tài khoản mới <Link to="/register">tại đây</Link>{' '}
          </p>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  )
}

export default withRouter(Login)
