import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
  const location = useLocation()

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link to="/" className={styles.brandLink}>
            <h1 className={styles.brandTitle}>Creatorverse</h1>
          </Link>
        </div>
        
        <div className={styles.navLinks}>
          <Link 
            to="/" 
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/creators/new" 
            className={`${styles.navLink} ${location.pathname === '/creators/new' ? styles.active : ''}`}
          >
            Create New
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
