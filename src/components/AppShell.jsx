import styles from "./AppShell.module.scss";

export default function AppShell({ children }) {
  return <div className={styles.appShell}>{children}</div>;
}