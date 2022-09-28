import React from 'react'

import Login from 'tarat-user-login-system/dist/views/login'
import 'tarat-user-login-system/dist/views/login.css'

export default function LoginPage () {

  return (
    <div className="w-full h-screen bg-slate-100 flex justify-center">
      <Login title={
        <h2 className="text-xl">Welcome</h2>
      } type="login" />
    </div>
  )
}