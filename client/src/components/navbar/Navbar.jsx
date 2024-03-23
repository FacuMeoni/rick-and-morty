import css from './Navbar.module.css'
import { useLocation } from 'react-router-dom';

function Navbar () {
  
  const location = useLocation();


  return( 
      <nav className={css.navbar}> 
        <div className={css.links_container}>
          <a href="/home" className={`${css.links} ${location.pathname === '/home' && css.active_li}`}>
            Home
          </a>
          <a href="/about" className={`${css.links} ${location.pathname === '/about' && css.active_li}`}>
            About
          </a>
          <a href="/favorites" className={`${css.links} ${location.pathname === '/favorites' && css.active_li}`}>
            Favorites
          </a>
        </div>
        
        <div id={css.logout_container}> 
          <a href="/" className={css.links} id={css.logout}>
            Logout
          </a>
        </div>
      </nav>
  )
}


export default Navbar;