import React from 'react'
import { useProgress, useTarat } from 'tarat/connect'

import Login from 'tarat-user-login-system/dist/views/login'
import LoginDriver from '@/drivers/compose/login'
import 'tarat-user-login-system/dist/views/login.css'
import { Link } from 'react-router-dom'

export default function LoginPage () {

  const loginResult = useTarat(LoginDriver, { id: 1})

  return (
    <div className="w-full h-screen bg-slate-100 flex justify-center">
      <Login 
        title={
          <h2 className="text-xl">Welcome</h2>
        }
        type="login"
        {...loginResult} />
    </div>
  )
}