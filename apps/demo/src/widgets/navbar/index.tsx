import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

export function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logo}>⬡</span>
        <span className={styles.name}>@deandre-dock/buttons</span>
      </div>
      <nav className={styles.nav}>
        <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>
          Inicio
        </NavLink>
        <NavLink to="/gradebook" className={({ isActive }) => isActive ? styles.active : ''}>
          Planilla
        </NavLink>
        <NavLink to="/shadcn" className={({ isActive }) => isActive ? styles.active : ''}>
          Shadcn
        </NavLink>
      </nav>
    </header>
  )
}
