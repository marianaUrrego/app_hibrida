import s from '../styles/DeviceFrame.module.scss'

export default function DeviceFrame({ children }) {
  return (
    <div className={s.deskBg}>
      <div className={s.device}>
        <div className={s.notch} />
        <div className={s.screen}>{children}</div>
      </div>
    </div>
  )
}
