import BottomNav from '../components/BottomNav.jsx'
import TopBar from '../components/TopBar.jsx'
import layout from '../styles/Layout.module.scss'

export default function Profile() {
  return (
    <div className={layout.screen}>
      <TopBar />
      <main className={layout.content}>
        <div className={layout.placeholder}>
          <h2>Yo</h2>
          <p>Pantalla de perfil.</p>
        </div>
      </main>
      <button className={layout.fab}>+</button>
      <BottomNav />
    </div>
  )
}
