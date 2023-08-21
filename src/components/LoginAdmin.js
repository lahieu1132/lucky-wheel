import React, { Component } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import AuthService from '../services/auth.service'

import { withRouter } from '../common/with-router'
import { useState } from 'react'

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

function LoginAdmin(props) {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function onChangeUsername(e) {
    setUserName(e.target.value.trim())
  }

  function onChangePassword(e) {
    setPassword(e.target.value.trim())
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    AuthService.login(username, password).then(
      (res) => {
        if (res.data.role === 'ADMIN') {
          props.router.navigate('/admin')
        }
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
    <div className="col-md-12">
      <div className="card card-container">
        <h2>Trang Quản Lý</h2>
        <Form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Tài khoản</label>
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
            <label htmlFor="password">Mật khẩu</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
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

export default withRouter(LoginAdmin)
