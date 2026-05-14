import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const HealthTechLogo = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="12" fill="white" fillOpacity="0.15"/>
    <path
      d="M8 21 L13 21 L16 14 L19 28 L22 18 L25 24 L28 21 L34 21"
      stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M21 8 C21 8 28 12 28 17 C28 20.3 25.3 23 22 23 C21.7 23 21.3 23 21 22.9 C20.7 23 20.3 23 20 23 C16.7 23 14 20.3 14 17 C14 12 21 8 21 8Z"
      fill="white" fillOpacity="0.9"
    />
    <circle cx="21" cy="17" r="3" fill="url(#heartFill)"/>
    <circle cx="30" cy="28" r="4" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.5"/>
    <path d="M28.5 28 L29.5 29 L31.5 27" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="30" r="3" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.5"/>
    <line x1="12" y1="28.5" x2="12" y2="31.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="10.5" y1="30" x2="13.5" y2="30" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <defs>
      <linearGradient id="heartFill" x1="18" y1="14" x2="24" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f093fb"/>
        <stop offset="100%" stopColor="#f5576c"/>
      </linearGradient>
    </defs>
  </svg>
);

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navInner}>
        <Link to={token ? '/dashboard' : '/'} style={styles.logoLink}>
          <div style={styles.logo}>
            <HealthTechLogo />
            <div>
              <div style={styles.logoText}>DailyStride</div>
              <div style={styles.logoSub}>Your daily health companion</div>
            </div>
          </div>
        </Link>

        <div style={styles.navLinks}>
          {token ? (
            <>
              <Link to="/dashboard" style={{
                ...styles.link,
                ...(location.pathname === '/dashboard' ? styles.activeLink : {})
              }}>
                📊 Dashboard
              </Link>
              <Link to="/log" style={{
                ...styles.link,
                ...(location.pathname === '/log' ? styles.activeLink : {})
              }}>
                📋 Log Health
              </Link>
              <div style={styles.userBadge}>
                <div style={styles.avatar}>
                  {userName ? userName[0].toUpperCase() : 'U'}
                </div>
                <span style={styles.userName}>{userName || 'User'}</span>
              </div>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 4px 20px rgba(102,126,234,0.4)',
    position: 'sticky', top: 0, zIndex: 1000,
  },
  navInner: {
    maxWidth: '1200px', margin: '0 auto',
    padding: '0 30px', height: '70px',
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoLink: { textDecoration: 'none' },
  logo: { display:'flex', alignItems:'center', gap:'12px' },
  logoText: {
    color: 'white', fontWeight: '800',
    fontSize: '20px', lineHeight: 1,
    letterSpacing: '-0.3px',
  },
  logoSub: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: '11px', marginTop: '3px',
  },
  navLinks: { display:'flex', alignItems:'center', gap:'8px' },
  link: {
    color: 'rgba(255,255,255,0.85)',
    textDecoration: 'none', padding: '8px 16px',
    borderRadius: '8px', fontWeight: '500',
    fontSize: '14px', transition: 'all 0.2s',
  },
  activeLink: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
  },
  userBadge: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'rgba(255,255,255,0.15)',
    padding: '6px 12px', borderRadius: '20px',
  },
  avatar: {
    width: '28px', height: '28px', borderRadius: '50%',
    background: 'white', color: '#667eea',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontWeight: '700', fontSize: '13px',
  },
  userName: { color: 'white', fontSize: '14px', fontWeight: '500' },
  logoutBtn: {
    background: 'rgba(255,255,255,0.15)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.3)',
    padding: '8px 16px', borderRadius: '8px',
    fontSize: '14px', fontWeight: '500',
    cursor: 'pointer',
  },
  registerBtn: {
    background: 'white', color: '#667eea',
    textDecoration: 'none', padding: '8px 20px',
    borderRadius: '8px', fontWeight: '600', fontSize: '14px',
  },
};

export default Navbar;