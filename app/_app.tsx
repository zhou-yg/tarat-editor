import React, { useEffect } from 'react'
import login from '@/drivers/compose/login'
import { useProgress, useTarat } from 'tarat/connect'
import { Navigate, redirect } from 'react-router-dom'

const App: React.FunctionComponent<{
  children: React.ReactNode
}> = props => {

  const loginHook = useTarat(login)
  const progress = useProgress(loginHook)  
  const alreadyLogin = progress.state === 'idle' && loginHook.alreadyLogin()
  const notLogin = progress.state === 'idle' && !loginHook.alreadyLogin()

  useEffect(() => {
    if (notLogin) {
      redirect('/login')
    }
  }, [notLogin])

  return (
    <div className="tarat-editor2-app">
      {props.children}
    </div>
  )
}

export default App