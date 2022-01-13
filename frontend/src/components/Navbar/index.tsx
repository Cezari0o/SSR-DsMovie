import {ReactComponent as GHIcon} from 'assets/img/GHIcon.svg';
import './styles.css';

function Navbar() {
  return (
    <header>
      <nav className='container'>
        <div className='dsmovie-nav-content'>
          <h1>DSMovie</h1>
          <a href="https://github.com/Cezari0o">
            <div className='dsmovie-contact-container'>
              <GHIcon/>
              <p className='dsmovie-contact-link'>/Cezari0o</p>
            </div>
          </a>
        </div>
      </nav>
    </header>
    );
    
}

export default Navbar;