import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'', confirmPassword:'' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMsg('Passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.user.name);
      navigate('/dashboard');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.leftContent}>
          <div style={styles.badge}>🚀 Start your journey today</div>
          <h1 style={styles.hero}>
            Take Control of<br/>Your Health<br/>Starting Now
          </h1>
          <p style={styles.heroSub}>
            Create your free account and start tracking your health metrics in minutes.
          </p>
          <div style={styles.steps}>
            {[
              ['01', 'Create Account', 'Sign up in less than 2 minutes'],
              ['02', 'Log Your Data', 'Enter your daily health metrics'],
              ['03', 'Track Progress', 'See your improvement over time'],
              ['04', 'Stay Healthy', 'Achieve your wellness goals'],
            ].map(([num, title, desc]) => (
              <div key={num} style={styles.step}>
                <div style={styles.stepNum}>{num}</div>
                <div>
                  <div style={styles.stepTitle}>{title}</div>
                  <div style={styles.stepDesc}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardIcon}>🎯</div>
            <h2 style={styles.cardTitle}>Create Account</h2>
            <p style={styles.cardSub}>Join thousands on their wellness journey</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}>👤</span>
                <input style={styles.input} name="name"
                  placeholder="John Doe" type="text"
                  onChange={handleChange} required />
              </div>
            </div>

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
                  placeholder="Min 6 characters" type="password"
                  onChange={handleChange} required />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Confirm Password</label>
              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}>✅</span>
                <input style={styles.input} name="confirmPassword"
                  placeholder="Repeat your password" type="password"
                  onChange={handleChange} required />
              </div>
            </div>

            {msg && <div style={styles.errorBox}>⚠️ {msg}</div>}

            <button style={styles.btn} type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Free Account →'}
            </button>
          </form>

          <div style={styles.divider}>
            <div style={styles.dividerLine}></div>
            <span style={styles.dividerText}>Already have an account?</span>
            <div style={styles.dividerLine}></div>
          </div>

          <Link to="/" style={styles.loginBtn}>
            Sign In Instead
          </Link>

          <p style={styles.footer}>
            By registering you agree to our Terms of Service
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
  leftContent: { color: 'white', maxWidth: '460px' },
  badge: {
    display: 'inline-block',
    background: 'rgba(102,126,234,0.3)',
    border: '1px solid rgba(102,126,234,0.5)',
    color: '#a78bfa', padding: '8px 16px',
    borderRadius: '20px', fontSize: '13px',
    fontWeight: '600', marginBottom: '24px',
  },
  hero: {
    fontSize: '42px', fontWeight: '800',
    lineHeight: 1.2, marginBottom: '20px',
    background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSub: {
    fontSize: '16px', color: 'rgba(255,255,255,0.6)',
    marginBottom: '36px', lineHeight: 1.7,
  },
  steps: { display:'flex', flexDirection:'column', gap:'14px' },
  step: {
    display: 'flex', alignItems: 'flex-start', gap: '16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '14px 16px', borderRadius: '12px',
  },
  stepNum: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white', fontWeight: '800', fontSize: '12px',
    width: '32px', height: '32px', borderRadius: '8px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  stepTitle: { fontWeight: '600', fontSize: '14px', marginBottom: '2px' },
  stepDesc: { fontSize: '12px', color: 'rgba(255,255,255,0.5)' },
  right: {
    flex: 1, display: 'flex', alignItems: 'center',
    justifyContent: 'center', padding: '40px',
    background: '#f7fafc',
  },
  card: {
    background: 'white', borderRadius: '24px', padding: '44px',
    width: '100%', maxWidth: '420px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
  },
  cardHeader: { textAlign:'center', marginBottom:'28px' },
  cardIcon: { fontSize:'44px', marginBottom:'10px' },
  cardTitle: { fontSize:'26px', fontWeight:'700', color:'#1a202c' },
  cardSub: { color:'#718096', marginTop:'8px', fontSize:'14px' },
  inputGroup: { marginBottom:'16px' },
  label: {
    display:'block', fontWeight:'600', fontSize:'13px',
    color:'#4a5568', marginBottom:'6px',
    textTransform:'uppercase', letterSpacing:'0.5px',
  },
  inputWrap: { position:'relative', display:'flex', alignItems:'center' },
  inputIcon: { position:'absolute', left:'14px', fontSize:'15px', zIndex:1 },
  input: {
    width:'100%', padding:'12px 14px 12px 44px',
    border:'2px solid #e2e8f0', borderRadius:'12px',
    fontSize:'14px', background:'#f7fafc', color:'#1a202c',
    transition:'all 0.2s',
  },
  errorBox: {
    background:'#fff5f5', border:'1px solid #fed7d7',
    color:'#c53030', padding:'12px 16px',
    borderRadius:'10px', fontSize:'14px', marginBottom:'12px',
  },
  btn: {
    width:'100%', padding:'14px',
    background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color:'white', border:'none', borderRadius:'12px',
    fontSize:'15px', fontWeight:'600', marginTop:'8px',
    letterSpacing:'0.3px', cursor:'pointer',
  },
  divider: {
    display:'flex', alignItems:'center',
    gap:'12px', margin:'20px 0',
  },
  dividerLine: { flex:1, height:'1px', background:'#e2e8f0' },
  dividerText: { color:'#a0aec0', fontSize:'12px', whiteSpace:'nowrap' },
  loginBtn: {
    display:'block', width:'100%', padding:'13px',
    background:'transparent', border:'2px solid #667eea',
    borderRadius:'12px', color:'#667eea',
    textAlign:'center', textDecoration:'none',
    fontSize:'15px', fontWeight:'600',
  },
  footer: {
    textAlign:'center', marginTop:'16px',
    color:'#a0aec0', fontSize:'12px',
  },
};

export default Register;