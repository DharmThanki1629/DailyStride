import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LogHealth() {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({
    steps:'', weight:'', heartRate:'', sleepHours:'',
    water:'', calories:'', date: today
  });
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://dailystride.onrender.com/api/metrics', form, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setMsg('Health data logged successfully!');
      setMsgType('success');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setMsg('Failed to log data. Please login again.');
      setMsgType('error');
      setLoading(false);
    }
  };

  const fields = [
    { name:'steps', label:'Steps Taken', icon:'👟', placeholder:'e.g. 8000', desc:'How many steps did you walk today?', color:'#667eea' },
    { name:'weight', label:'Weight (kg)', icon:'⚖️', placeholder:'e.g. 70', desc:'Your current weight in kilograms', color:'#06b6d4' },
    { name:'heartRate', label:'Heart Rate (bpm)', icon:'❤️', placeholder:'e.g. 72', desc:'Your resting heart rate today', color:'#f43f5e' },
    { name:'sleepHours', label:'Sleep Hours', icon:'😴', placeholder:'e.g. 7', desc:'How many hours did you sleep?', color:'#8b5cf6' },
    { name:'water', label:'Water Intake (glasses)', icon:'💧', placeholder:'e.g. 8', desc:'How many glasses of water did you drink?', color:'#0ea5e9' },
    { name:'calories', label:'Calories Burned (kcal)', icon:'🔥', placeholder:'e.g. 350', desc:'Estimated calories burned today', color:'#f97316' },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.leftContent}>
          <div style={styles.badge}>📋 Daily Health Log</div>
          <h1 style={styles.hero}>Log Today's<br/>Health Data</h1>
          <p style={styles.heroSub}>Consistent tracking is the key to achieving your health goals.</p>
          <div style={styles.tips}>
            <div style={styles.tipsTitle}>💡 Daily Health Tips</div>
            {[
              ['👟', '10,000 steps a day keeps the doctor away'],
              ['⚖️', 'Track your weight consistently each morning'],
              ['❤️', 'A resting heart rate of 60-100 bpm is normal'],
              ['😴', '7-9 hours of sleep is ideal for adults'],
              ['💧', 'Drink at least 8 glasses of water daily'],
              ['🔥', 'Aim to burn 300-500 calories per day'],
            ].map(([icon, tip]) => (
              <div key={tip} style={styles.tip}>
                <span style={styles.tipIcon}>{icon}</span>
                <span style={styles.tipText}>{tip}</span>
              </div>
            ))}
          </div>
          <div style={styles.streakBox}>
            <div style={styles.streakIcon}>🔥</div>
            <div>
              <div style={styles.streakTitle}>Keep your streak going!</div>
              <div style={styles.streakSub}>Log daily to track your progress</div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardIcon}>📊</div>
            <h2 style={styles.cardTitle}>Health Log Entry</h2>
            <p style={styles.cardSub}>Fill in your health data for the selected date</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={styles.dateBox}>
              <label style={styles.dateLabel}>📅 Select Date</label>
              <input
                type="date" name="date" value={form.date}
                max={today} onChange={handleChange} style={styles.dateInput}
              />
              <div style={styles.inputDesc}>
                {form.date === today ? '📍 Logging for today' : `📌 Past date: ${new Date(form.date + 'T00:00:00').toLocaleDateString('en-US',{ weekday:'long', month:'long', day:'numeric', year:'numeric' })}`}
              </div>
            </div>

            <div style={styles.fieldsGrid}>
              {fields.map((field) => (
                <div key={field.name} style={styles.inputGroup}>
                  <label style={styles.label}>{field.icon} {field.label}</label>
                  <input
                    style={{ ...styles.input, borderColor: form[field.name] ? field.color : '#e2e8f0' }}
                    type="number"
                    name={field.name}
                    placeholder={field.placeholder}
                    onChange={handleChange}
                    min="0"
                    step={field.name === 'weight' ? '0.1' : '1'}
                  />
                  <div style={styles.inputDesc}>{field.desc}</div>
                </div>
              ))}
            </div>

            {msg && (
              <div style={msgType === 'success' ? styles.successBox : styles.errorBox}>
                {msgType === 'success' ? '✅' : '⚠️'} {msg}
              </div>
            )}

            <button style={styles.btn} type="submit" disabled={loading}>
              {loading ? 'Saving...' : '💾 Save Health Data'}
            </button>
            <button type="button" style={styles.cancelBtn} onClick={() => navigate('/dashboard')}>
              ← Back to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display:'flex', minHeight:'calc(100vh - 70px)' },
  left: {
    flex: 1.1,
    background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px',
  },
  leftContent: { color:'white', maxWidth:'400px' },
  badge: {
    display:'inline-block', background:'rgba(102,126,234,0.3)',
    border:'1px solid rgba(102,126,234,0.5)', color:'#a78bfa',
    padding:'6px 14px', borderRadius:'20px', fontSize:'13px',
    fontWeight:'600', marginBottom:'18px',
  },
  hero: {
    fontSize:'36px', fontWeight:'800', lineHeight:1.2, marginBottom:'14px',
    background:'linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)',
    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
  },
  heroSub: { fontSize:'14px', color:'rgba(255,255,255,0.6)', marginBottom:'24px', lineHeight:1.7 },
  tips: {
    background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)',
    borderRadius:'16px', padding:'16px', marginBottom:'16px',
  },
  tipsTitle: { fontWeight:'700', fontSize:'13px', marginBottom:'10px', color:'#a78bfa' },
  tip: { display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' },
  tipIcon: { fontSize:'16px' },
  tipText: { fontSize:'12px', color:'rgba(255,255,255,0.7)', lineHeight:1.4 },
  streakBox: {
    display:'flex', alignItems:'center', gap:'12px',
    background:'rgba(102,126,234,0.2)', border:'1px solid rgba(102,126,234,0.3)',
    padding:'14px', borderRadius:'14px',
  },
  streakIcon: { fontSize:'28px' },
  streakTitle: { fontWeight:'700', fontSize:'14px' },
  streakSub: { fontSize:'11px', color:'rgba(255,255,255,0.5)', marginTop:'2px' },
  right: {
    flex: 1, display:'flex', alignItems:'center',
    justifyContent:'center', padding:'30px', background:'#f7fafc', overflowY:'auto',
  },
  card: {
    background:'white', borderRadius:'24px', padding:'36px',
    width:'100%', maxWidth:'520px', boxShadow:'0 20px 60px rgba(0,0,0,0.1)',
  },
  cardHeader: { textAlign:'center', marginBottom:'20px' },
  cardIcon: { fontSize:'40px', marginBottom:'8px' },
  cardTitle: { fontSize:'22px', fontWeight:'700', color:'#1a202c' },
  cardSub: { color:'#718096', marginTop:'6px', fontSize:'13px' },
  dateBox: {
    background:'#f0f4ff', border:'2px solid #667eea',
    borderRadius:'14px', padding:'14px', marginBottom:'16px',
  },
  dateLabel: { display:'block', fontWeight:'700', fontSize:'13px', color:'#4a5568', marginBottom:'6px' },
  dateInput: {
    width:'100%', padding:'9px 12px', border:'1.5px solid #c3d0f5',
    borderRadius:'10px', fontSize:'14px', background:'white', color:'#1a202c', marginBottom:'4px',
  },
  fieldsGrid: {
    display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'16px',
  },
  inputGroup: { marginBottom:'4px' },
  label: { display:'block', fontWeight:'600', fontSize:'13px', color:'#4a5568', marginBottom:'5px' },
  input: {
    width:'100%', padding:'10px 12px', border:'2px solid #e2e8f0',
    borderRadius:'10px', fontSize:'14px', background:'#f7fafc',
    color:'#1a202c', transition:'all 0.2s', boxSizing:'border-box',
  },
  inputDesc: { fontSize:'11px', color:'#a0aec0', marginTop:'3px' },
  successBox: {
    background:'#f0fff4', border:'1px solid #9ae6b4', color:'#276749',
    padding:'10px 14px', borderRadius:'10px', fontSize:'13px', marginBottom:'12px',
  },
  errorBox: {
    background:'#fff5f5', border:'1px solid #fed7d7', color:'#c53030',
    padding:'10px 14px', borderRadius:'10px', fontSize:'13px', marginBottom:'12px',
  },
  btn: {
    width:'100%', padding:'13px',
    background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color:'white', border:'none', borderRadius:'12px',
    fontSize:'15px', fontWeight:'600', cursor:'pointer', marginBottom:'10px',
  },
  cancelBtn: {
    width:'100%', padding:'11px', background:'transparent',
    border:'2px solid #e2e8f0', borderRadius:'12px', color:'#718096',
    fontSize:'13px', fontWeight:'500', cursor:'pointer',
  },
};

export default LogHealth;