import TopBar from '../components/TopBar.jsx'
import MonthHeader from '../components/MonthHeader.jsx'
import EmptyState from '../components/EmptyState.jsx'
import BottomNav from '../components/BottomNav.jsx'
import layout from '../styles/Layout.module.scss'


export default function Home() {
  return (
    <div className={layout.screen}>
      <TopBar />
      <MonthHeader year="2025" month="Ago" gastos={0} ingresos={0} saldo={0} />
      <main className={layout.content}>
        <EmptyState />   {/* esto quedará encima */}
      </main>
      <button className={layout.fab}>+</button>
      <BottomNav />
    </div>
  )
}
