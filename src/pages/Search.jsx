import BottomNav from '../components/BottomNav.jsx'
import TopBar from '../components/TopBar.jsx'
import layout from '../styles/Layout.module.scss'

export default function Search() {
  return (
    <div className={layout.screen}>
      <TopBar />
      <main className={layout.content}>
        <div className={layout.placeholder}>
          <input className={layout.searchInput} placeholder="Buscar..." />
        </div>
      </main>
      <button className={layout.fab}>+</button>
      <BottomNav />
    </div>
  )
}
