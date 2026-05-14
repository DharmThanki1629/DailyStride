import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email:'', password:'' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.user.name);
      navigate('/dashboard');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.leftContent}>
          <div style={styles.badge}>🏆 #1 Health Tracking App</div>
          <h1 style={styles.hero}>Your Health.<br/>Your Journey.<br/>Your Way.</h1>
          <p style={styles.heroSub}>
            Join thousands of people improving their lifestyle with smart health tracking.
          </p>
          <div style={styles.features}>
            {[
              ['👟', 'Track Daily Steps', 'Monitor your activity and hit your goals'],
              ['💧', 'Water Intake', 'Stay hydrated with smart reminders'],
              ['😴', 'Sleep Analysis', 'Understand your sleep patterns better'],
              ['🔥', 'Calories Burned', 'Keep track of your daily calorie burn'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={styles.feature}>
                <div style={styles.featureIcon}>{icon}</div>
                <div>
                  <div style={styles.featureTitle}>{title}</div>
                  <div style={styles.featureDesc}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={styles.stats}>
            {[['10K+','Active Users'],['4.9★','Rating'],['100%','Free']].map(([num, label]) => (
              <div key={label} style={styles.stat}>
                <div style={styles.statNum}>{num}</div>
                <div style={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardIcon}>👋</div>
            <h2 style={styles.cardTitle}>Welcome Back!</h2>
            <p style={styles.cardSub}>Sign in to continue your health journey</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}>📧</span>
                <input style={styles.input} name="email"
                  placeholder="you@example.com" type="email"
                  onChange={handleChange} required />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}>🔒</span>
                <input style={styles.input} name="password"
                  placeholder="Enter your password" type="password"
                  onChange={handleChange} required />
              </div>
            </div>
            {msg && <div style={styles.errorBox}>⚠️ {msg}</div>}
            <button style={styles.btn} type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
          <div style={styles.divider}>
            <div style={styles.dividerLine}></div>
            <span style={styles.dividerText}>New here?</span>
            <div style={styles.dividerLine}></div>
          </div>
          <Link to="/register" style={styles.registerBtn}>
            Create Free Account
          </Link>
          <p style={styles.footer}>
            By signing in you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display:'flex', minHeight:'calc(100vh - 70px)' },
  left: {
    flex: 1.2,
    background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', padding: '60px',
  },
  leftContent: { color: 'white', maxWidth: '480px' },
  badge: {
    display: 'inline-block',
    background: 'rgba(102,126,234,0.3)',
    border: '1px solid rgba(102,126,234,0.5)',
    color: '#a78bfa', padding: '8px 16px',
    borderRadius: '20px', fontSize: '13px',
    fontWeight: '600', marginBottom: '24px',
    letterSpacing: '0.5px',
  },
  hero: {
    fontSize: '46px', fontWeight: '800',
    lineHeight: 1.15, marginBottom: '20px',
    background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSub: {
    fontSize: '16px', color: 'rgba(255,255,255,0.6)',
    marginBottom: '36px', lineHeight: 1.7,
  },
  features: { display:'flex', flexDirection:'column', gap:'16px', marginBottom:'36px' },
  feature: {
    display: 'flex', alignItems: 'flex-start', gap: '14px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '14px 16px', borderRadius: '12px',
    backdropFilter: 'blur(10px)',
  },
  featureIcon: { fontSize: '24px', flexShrink: 0 },
  featureTitle: { fontWeight: '600', fontSize: '14px', marginBottom: '2px' },
  featureDesc: { fontSize: '12px', color: 'rgba(255,255,255,0.5)' },
  stats: {
    display: 'flex', gap: '0',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px', overflow: 'hidden',
  },
  stat: {
    flex: 1, textAlign: 'center', padding: '16px',
    borderRight: '1px solid rgba(255,255,255,0.1)',
  },
  statNum: { fontSize: '22px', fontWeight: '800', color: '#a78bfa' },
  statLabel: { fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' },
  right: {
    flex: 1, display: 'flex', alignItems: 'center',
    justifyContent: 'center', padding: '40px',
    background: '#f7fafc',
  },
  card: {
    background: 'white', borderRadius: '24px', padding: '48px',
    width: '100%', maxWidth: '420px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
  },
  cardHeader: { textAlign:'center', marginBottom:'32px' },
  cardIcon: { fontSize:'48px', marginBottom:'12px' },
  cardTitle: { fontSize:'26px', fontWeight:'700', color:'#1a202c' },
  cardSub: { color:'#718096', marginTop:'8px', fontSize:'14px' },
  inputGroup: { marginBottom:'20px' },
  label: {
    display:'block', fontWeight:'600', fontSize:'13px',
    color:'#4a5568', marginBottom:'8px', textTransform:'uppercase',
    letterSpacing:'0.5px',
  },
  inputWrap: { position:'relative', display:'flex', alignItems:'center' },
  inputIcon: { position:'absolute', left:'14px', fontSize:'16px', zIndex:1 },
  input: {
    width:'100%', padding:'13px 14px 13px 44px',
    border:'2px solid #e2e8f0', borderRadius:'12px',
    fontSize:'15px', background:'#f7fafc', color:'#1a202c',
    transition:'all 0.2s',
  },
  errorBox: {
    background:'#fff5f5', border:'1px solid #fed7d7',
    color:'#c53030', padding:'12px 16px',
    borderRadius:'10px', fontSize:'14px', marginBottom:'16px',
  },
  btn: {
    width:'100%', padding:'14px',
    background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color:'white', border:'none', borderRadius:'12px',
    fontSize:'16px', fontWeight:'600', marginTop:'8px',
    letterSpacing:'0.3px',
  },
  divider: {
    display:'flex', alignItems:'center',
    gap:'12px', margin:'24px 0',
  },
  dividerLine: { flex:1, height:'1px', background:'#e2e8f0' },
  dividerText: { color:'#a0aec0', fontSize:'13px', whiteSpace:'nowrap' },
  registerBtn: {
    display:'block', width:'100%', padding:'13px',
    background:'transparent',
    border:'2px solid #667eea', borderRadius:'12px',
    color:'#667eea', textAlign:'center', textDecoration:'none',
    fontSize:'15px', fontWeight:'600',
  },
  footer: {
    textAlign:'center', marginTop:'20px',
    color:'#a0aec0', fontSize:'12px',
  },
};

export default Login;