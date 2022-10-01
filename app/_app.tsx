import React, { useEffect } from 'react'
import login from '@/drivers/compose/login'
import { useProgress, useTarat } from 'tarat/connect'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const App: React.FunctionComponent<{
  children: React.ReactNode
}> = props => {

  const loginHook = useTarat(login)
  const progress = useProgress(loginHook)  
  const alreadyLogin = progress.state === 'idle' && loginHook.alreadyLogin()
  const notLogin = progress.state === 'idle' && !loginHook.alreadyLogin()
  const location = useLocation()
  const navigate = useNavigate()
  
  console.log('notLogin: ', notLogin);
  console.log('location: ', location);
  
  useEffect(() => {
    if (notLogin && location.pathname !== '/login') {
      navigate('/login')
    }
    if (alreadyLogin && location.pathname === '/login') {
      navigate('/main')
    }
  }, [notLogin])

  return (
    <div className="tarat-editor2-app">
      {props.children}
    </div>
  )
}

export default App