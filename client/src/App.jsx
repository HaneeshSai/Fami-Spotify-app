import React from 'react'
import LoginPage from './LoginPage'
import "./App.css"
import Dashboard from './Dashboard'

const code = new URLSearchParams(window.location.search).get('code')

export default function App() {
  return code? <Dashboard code={code} /> : <LoginPage />
  // return <Dashboard />
}
