import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import s from './Splash.module.scss'
import logoLarge from '../assets/logo-large.png'
import appIcon from '../assets/app-icon.png'

export default function Splash() {
  const navigate = useNavigate()
  useEffect(() => {
    const t = setTimeout(() => navigate('/home', { replace: true }), 1500)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className={s.splash}>
      <img src={logoLarge} alt="LukApp" className={s.logoLarge} />
      <img src={appIcon} alt="App icon" className={s.appIcon} />
      <div className={s.fade} />
    </div>
  )
}
