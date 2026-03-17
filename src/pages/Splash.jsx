import s from "./Splash.module.scss";
import logoLarge from "../assets/logo-large.png";
import appIcon from "../assets/app-icon.png";

export default function Splash() {
  return (
    <div className={s.splash}>
      <img src={logoLarge} alt="LukApp" className={s.logoLarge} />
      <img src={appIcon} alt="App icon" className={s.appIcon} />
      <div className={s.fade} />
    </div>
  );
}
