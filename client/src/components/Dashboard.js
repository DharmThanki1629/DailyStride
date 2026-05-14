import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }
});

function CircularProgress({ value, max, color, size = 120, label, unit, icon, delay = 0 }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setTimeout(() => setAnimated(true), delay * 1000 + 300); }, [delay]);
  const radius = 46;
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(100, Math.round((value / max) * 100));
  const offset = animated ? circ - (pct / 100) * circ : circ;

  return (
    <motion.div
      {...scaleIn(delay)}
      whileHover={{ scale: 1.08, y: -4 }}
      style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', cursor:'default' }}
    >
      <div style={{ position:'relative', width: size, height: size }}>
        {/* Glow effect */}
        <div style={{
          position:'absolute', inset:'-4px', borderRadius:'50%',
          background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
          filter:'blur(8px)',
        }}/>
        <svg width={size} height={size} style={{ transform:'rotate(-90deg)', position:'relative', zIndex:1 }}>
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#f0f0f0" strokeWidth="8"/>
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color}
            strokeWidth="8" strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition:'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}/>
        </svg>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center', zIndex:2 }}>
          <div style={{ fontSize:'24px', lineHeight:1 }}>{icon}</div>
          <div style={{ fontSize:'12px', fontWeight:'800', color:'#1a202c', marginTop:'2px' }}>{pct}%</div>
        </div>
      </div>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:'17px', fontWeight:'800', color:'#1a202c' }}>
          {Number(value).toLocaleString()}
          <span style={{ fontSize:'11px', color:'#718096', fontWeight:'400' }}> {unit}</span>
        </div>
        <div style={{ fontSize:'12px', color:'#718096', fontWeight:'600' }}>{label}</div>
        <div style={{ fontSize:'10px', color:'#a0aec0', marginTop:'2px' }}>Goal: {max} {unit}</div>
      </div>
    </motion.div>
  );
}

function HealthScore({ latest }) {
  if (!latest) return null;
  let score = 0; let tips = [];
  const { steps=0, sleepHours=0, heartRate=0, water=0 } = latest;
  if (steps >= 10000) score += 25; else if (steps >= 5000) { score += 15; tips.push('Walk more — aim for 10,000 steps'); } else tips.push('Steps are low — try a short walk!');
  if (sleepHours >= 7 && sleepHours <= 9) score += 25; else if (sleepHours >= 6) { score += 15; tips.push('Try to get 7-9 hours of sleep'); } else tips.push('Sleep is critical — prioritize rest!');
  if (heartRate >= 60 && heartRate <= 100) score += 25; else if (heartRate > 0) { score += 10; tips.push('Monitor heart rate regularly'); }
  if (water >= 8) score += 25; else if (water >= 4) { score += 15; tips.push('Drink more water — aim for 8 glasses'); } else tips.push('Stay hydrated!');

  const getColor = s => s >= 80 ? '#10b981' : s >= 50 ? '#f59e0b' : '#ef4444';
  const getLabel = s => s >= 80 ? 'Excellent 🌟' : s >= 60 ? 'Good 👍' : s >= 40 ? 'Fair ⚡' : 'Needs Work 💪';
  const color = getColor(score);
  const circ = 2 * Math.PI * 38;

  return (
    <motion.div style={glassCard} whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} transition={{ duration: 0.2 }}>
      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px' }}>
        <span style={{ fontSize:'20px' }}>🏆</span>
        <h3 style={{ fontSize:'16px', fontWeight:'700', color:'#1a202c' }}>Health Score</h3>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'20px' }}>
        <div style={{ position:'relative', width:'90px', height:'90px', flexShrink:0 }}>
          <div style={{ position:'absolute', inset:'-6px', borderRadius:'50%', background:`radial-gradient(circle, ${color}30, transparent 70%)`, filter:'blur(6px)' }}/>
          <svg width="90" height="90" style={{ transform:'rotate(-90deg)' }}>
            <circle cx="45" cy="45" r="38" fill="none" stroke="#f0f0f0" strokeWidth="8"/>
            <circle cx="45" cy="45" r="38" fill="none" stroke={color} strokeWidth="8"
              strokeDasharray={circ} strokeDashoffset={circ - (score/100)*circ}
              strokeLinecap="round" style={{ transition:'stroke-dashoffset 1.5s ease' }}/>
          </svg>
          <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center' }}>
            <div style={{ fontSize:'22px', fontWeight:'900', color }}>{score}</div>
            <div style={{ fontSize:'9px', color:'#718096' }}>/ 100</div>
          </div>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:'18px', fontWeight:'700', color, marginBottom:'8px' }}>{getLabel(score)}</div>
          {tips.length === 0
            ? <div style={{ fontSize:'12px', color:'#10b981', background:'#f0fff4', padding:'6px 10px', borderRadius:'8px' }}>✅ All health goals met!</div>
            : tips.slice(0,2).map((t,i) => (
              <div key={i} style={{ fontSize:'12px', color:'#718096', marginBottom:'4px', display:'flex', gap:'6px' }}>
                <span style={{ color: '#f59e0b' }}>•</span>{t}
              </div>
            ))
          }
        </div>
      </div>
    </motion.div>
  );
}

function BMICard({ latest }) {
  if (!latest?.weight) return null;
  const bmi = (latest.weight / (1.70 * 1.70)).toFixed(1);
  const info = parseFloat(bmi) < 18.5
    ? { label:'Underweight', color:'#06b6d4', emoji:'📉', advice:'Increase caloric intake with nutritious foods.' }
    : parseFloat(bmi) < 25
    ? { label:'Normal', color:'#10b981', emoji:'✅', advice:'Great! Maintain your healthy lifestyle.' }
    : parseFloat(bmi) < 30
    ? { label:'Overweight', color:'#f59e0b', emoji:'⚠️', advice:'Focus on balanced diet and regular exercise.' }
    : { label:'Obese', color:'#ef4444', emoji:'🚨', advice:'Consult a healthcare professional.' };
  const bmiPct = Math.min(100, Math.max(0, ((parseFloat(bmi) - 10) / 30) * 100));

  return (
    <motion.div style={glassCard} whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} transition={{ duration: 0.2 }}>
      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px' }}>
        <span style={{ fontSize:'20px' }}>⚖️</span>
        <h3 style={{ fontSize:'16px', fontWeight:'700', color:'#1a202c' }}>BMI Calculator</h3>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'16px' }}>
        <div style={{ textAlign:'center', background: info.color + '15', borderRadius:'16px', padding:'12px 16px' }}>
          <div style={{ fontSize:'30px', fontWeight:'900', color: info.color }}>{bmi}</div>
          <div style={{ fontSize:'10px', color:'#718096' }}>BMI</div>
        </div>
        <div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', background: info.color + '20', color: info.color, padding:'4px 12px', borderRadius:'20px', fontSize:'13px', fontWeight:'700', marginBottom:'6px' }}>
            {info.emoji} {info.label}
          </div>
          <div style={{ fontSize:'12px', color:'#718096', lineHeight:1.5 }}>{info.advice}</div>
        </div>
      </div>
      <div style={{ position:'relative', height:'10px', background:'linear-gradient(to right, #06b6d4 0%, #10b981 33%, #f59e0b 66%, #ef4444 100%)', borderRadius:'99px', marginBottom:'8px' }}>
        <motion.div
          initial={{ left: '0%' }}
          animate={{ left: bmiPct + '%' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ position:'absolute', top:'-5px', width:'20px', height:'20px', background:'white', border:`3px solid ${info.color}`, borderRadius:'50%', transform:'translateX(-50%)', boxShadow:'0 2px 8px rgba(0,0,0,0.2)' }}
        />
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize:'10px', color:'#a0aec0' }}>
        <span>Thin</span><span>Normal</span><span>Over</span><span>Obese</span>
      </div>
    </motion.div>
  );
}

function WeeklySummary({ logs }) {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const today = new Date();
  const weekData = days.map((day, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (today.getDay() - 1 - i + 7) % 7);
    const dateStr = d.toISOString().split('T')[0];
    const log = logs.find(l => new Date(l.date).toISOString().split('T')[0] === dateStr);
    return { day, hasData: !!log, steps: log?.steps || 0 };
  });
  const maxSteps = Math.max(...weekData.map(d => d.steps), 1);

  return (
    <motion.div style={glassCard} whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} transition={{ duration: 0.2 }}>
      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px' }}>
        <span style={{ fontSize:'20px' }}>📅</span>
        <h3 style={{ fontSize:'16px', fontWeight:'700', color:'#1a202c' }}>Weekly Steps</h3>
      </div>
      <div style={{ display:'flex', alignItems:'flex-end', gap:'8px', height:'110px' }}>
        {weekData.map((d, i) => (
          <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'5px', height:'100%', justifyContent:'flex-end' }}>
            <div style={{ fontSize:'9px', color:'#718096', fontWeight:'600' }}>
              {d.steps > 0 ? (d.steps >= 1000 ? (d.steps/1000).toFixed(1)+'k' : d.steps) : ''}
            </div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: d.hasData ? Math.max(10, (d.steps / maxSteps) * 80) : 10 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
              style={{
                width:'100%', borderRadius:'6px 6px 3px 3px',
                background: d.hasData
                  ? d.steps >= 10000
                    ? 'linear-gradient(180deg,#10b981,#059669)'
                    : 'linear-gradient(180deg,#667eea,#764ba2)'
                  : '#f0f0f0',
              }}
            />
            <div style={{ fontSize:'10px', fontWeight:'700', color: d.hasData ? '#4a5568' : '#cbd5e0' }}>{d.day}</div>
          </div>
        ))}
      </div>
      <div style={{ display:'flex', gap:'12px', marginTop:'12px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
          <div style={{ width:'10px', height:'10px', borderRadius:'2px', background:'linear-gradient(#667eea,#764ba2)' }}/>
          <span style={{ fontSize:'10px', color:'#718096' }}>Logged</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
          <div style={{ width:'10px', height:'10px', borderRadius:'2px', background:'linear-gradient(#10b981,#059669)' }}/>
          <span style={{ fontSize:'10px', color:'#718096' }}>Goal met</span>
        </div>
      </div>
    </motion.div>
  );
}

const glassCard = {
  background:'white',
  borderRadius:'20px',
  padding:'22px',
  boxShadow:'0 4px 24px rgba(0,0,0,0.06)',
  border:'1px solid rgba(255,255,255,0.8)',
  backdropFilter:'blur(10px)',
  height:'100%',
};

function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://dailystride.onrender.com/api/metrics', {
          headers: { Authorization: 'Bearer ' + token }
        });
        setLogs(res.data);
      } catch(err) { setError('Failed to load data.'); }
    };
    fetchLogs();
  }, []);

  const getLatest = (field) => {
    const found = logs.find(l => l[field] !== undefined && l[field] !== null && l[field] !== 0);
    return found ? found[field] : 0;
  };
  const selectedLog = logs.find(log =>
  new Date(log.date).toISOString().split('T')[0] === selectedDate
  );

  const getSelectedValue = (field) => {
    if (!selectedLog) return 0;
    return selectedLog[field] || 0;
  };

  const rings = [
  {
    icon:'👟',
    label:'Steps',
    value: getSelectedValue('steps'),
    max:10000,
    unit:'steps',
    color:'#667eea',
    delay:0
  },
  {
    icon:'💧',
    label:'Water',
    value: getSelectedValue('water'),
    max:8,
    unit:'glasses',
    color:'#0ea5e9',
    delay:0.08
  },
  {
    icon:'🔥',
    label:'Calories',
    value: getSelectedValue('calories'),
    max:500,
    unit:'kcal',
    color:'#f97316',
    delay:0.16
  },
  {
    icon:'😴',
    label:'Sleep',
    value: getSelectedValue('sleepHours'),
    max:8,
    unit:'hrs',
    color:'#8b5cf6',
    delay:0.24
  },
  {
    icon:'❤️',
    label:'Heart Rate',
    value: getSelectedValue('heartRate'),
    max:100,
    unit:'bpm',
    color:'#f43f5e',
    delay:0.32
  },
  {
    icon:'⚖️',
    label:'Weight',
    value: getSelectedValue('weight'),
    max:100,
    unit:'kg',
    color:'#06b6d4',
    delay:0.40
  },
  ];

  return (
    <div style={{ padding:'28px', maxWidth:'1300px', margin:'0 auto', paddingBottom:'60px' }}>

      {/* Animated Header */}
      <motion.div
        {...fadeUp(0)}
        style={{
          display:'flex', justifyContent:'space-between', alignItems:'center',
          marginBottom:'28px',
          background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding:'28px 32px', borderRadius:'24px', color:'white',
          boxShadow:'0 12px 40px rgba(102,126,234,0.45)',
          position:'relative', overflow:'hidden',
        }}
      >
        {/* Decorative circles */}
        <div style={{ position:'absolute', top:'-30px', right:'120px', width:'120px', height:'120px', borderRadius:'50%', background:'rgba(255,255,255,0.07)' }}/>
        <div style={{ position:'absolute', bottom:'-40px', right:'60px', width:'160px', height:'160px', borderRadius:'50%', background:'rgba(255,255,255,0.05)' }}/>
        <div>
          <motion.h1
            initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
            transition={{ delay:0.2, duration:0.5 }}
            style={{ fontSize:'28px', fontWeight:'800', marginBottom:'6px' }}
          >
            Good day, {userName || 'User'} 👋
          </motion.h1>
          <motion.p
            initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
            transition={{ delay:0.3, duration:0.5 }}
            style={{ fontSize:'14px', opacity:0.85 }}
          >
            Here is your health summary. Keep up the great work!
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
          transition={{ delay:0.4, duration:0.4 }}
          style={{ background:'rgba(255,255,255,0.18)', padding:'12px 20px', borderRadius:'14px', fontSize:'14px', fontWeight:'600', backdropFilter:'blur(10px)', zIndex:1 }}
        >
          📅 {new Date().toLocaleDateString('en-US',{ weekday:'long', month:'long', day:'numeric' })}
        </motion.div>
      </motion.div>

      {error && <div style={{ background:'#fff5f5', border:'1px solid #fed7d7', color:'#c53030', padding:'14px', borderRadius:'12px', marginBottom:'20px' }}>⚠️ {error}</div>}

      {logs.length === 0 ? (
        <motion.div {...fadeUp(0.2)} style={{ textAlign:'center', padding:'80px 40px', background:'white', borderRadius:'20px', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize:'64px', marginBottom:'16px' }}>📋</div>
          <h3 style={{ fontSize:'22px', fontWeight:'700', color:'#1a202c', marginBottom:'8px' }}>No health logs yet!</h3>
          <p style={{ color:'#718096' }}>Start logging your daily health data to see your progress here.</p>
        </motion.div>
      ) : (
        <>
        <motion.div
          {...fadeUp(0.08)}
          style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            padding:'18px 22px',
            borderRadius:'22px',
            background:'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)',
            boxShadow:'0 4px 24px rgba(0,0,0,0.06)',
            border:'1px solid #ebebf0',
            marginBottom:'22px',
          }}
        >
          <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
            <div style={{
              width:'52px',
              height:'52px',
              borderRadius:'16px',
              background:'linear-gradient(135deg,#667eea,#764ba2)',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              fontSize:'24px',
              color:'white',
              boxShadow:'0 8px 20px rgba(102,126,234,0.35)'
            }}>
              📅
            </div>

            <div>
              <div style={{
                fontSize:'16px',
                fontWeight:'800',
                color:'#1a202c',
                marginBottom:'2px'
              }}>
                View Daily Progress
              </div>

              <div style={{
                fontSize:'12px',
                color:'#718096'
              }}>
                Select any logged date to view health analytics
              </div>
            </div>
          </div>

          <input
            type="date"
            value={selectedDate}
            max={today}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              padding:'12px 16px',
              borderRadius:'14px',
              border:'2px solid #e2e8f0',
              background:'white',
              fontSize:'14px',
              fontWeight:'600',
              color:'#1a202c',
              outline:'none',
              cursor:'pointer',
              transition:'all 0.2s ease'
            }}
          />
        </motion.div>
          {/* Progress Rings */}
          <motion.div {...fadeUp(0.1)} style={{ marginBottom:'24px' }}>
            <h2 style={{ fontSize:'18px', fontWeight:'700', color:'#1a202c', marginBottom:'14px' }}>🎯 Today's Progress Rings</h2>
            <div style={{
              background:'linear-gradient(135deg, #fafbff 0%, #f3f4f8 100%)',
              borderRadius:'24px', padding:'32px',
              boxShadow:'0 4px 24px rgba(0,0,0,0.06)',
              border:'1px solid #ebebf0',
              display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:'20px',
            }}>
              {rings.map((r) => <CircularProgress key={r.label} {...r} />)}
            </div>
          </motion.div>

          {/* 3 Cards */}
          <motion.div {...fadeUp(0.2)} style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'20px', marginBottom:'24px', alignItems:'start' }}>
            <HealthScore latest={{
              steps: getSelectedValue('steps'),
              sleepHours: getSelectedValue('sleepHours'),
              heartRate: getSelectedValue('heartRate'),
              water: getSelectedValue('water')
            }} />
            <BMICard latest={{ weight: getSelectedValue('weight') }} />
            <WeeklySummary logs={logs.filter(log => {
              const logDate = new Date(log.date);
              const selected = new Date(selectedDate);

              return (
                logDate.getMonth() === selected.getMonth() &&
                logDate.getFullYear() === selected.getFullYear()
              );
            })} />
          </motion.div>

          {/* History Table */}
          <motion.div {...fadeUp(0.3)}>
            <h2 style={{ fontSize:'18px', fontWeight:'700', color:'#1a202c', marginBottom:'14px' }}>📋 Health Log History</h2>
            <div style={{ background:'white', borderRadius:'20px', overflow:'hidden', boxShadow:'0 4px 24px rgba(0,0,0,0.06)' }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr>
                    {['Date','👟 Steps','💧 Water','🔥 Calories','❤️ HR','😴 Sleep','⚖️ Weight'].map(h => (
                      <th key={h} style={{ background:'linear-gradient(135deg,#667eea,#764ba2)', color:'white', padding:'14px 16px', textAlign:'left', fontSize:'13px', fontWeight:'600' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity:0, x:-20 }}
                      animate={{ opacity:1, x:0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      style={{ background: i % 2 === 0 ? '#f8f9ff' : 'white', cursor:'default' }}
                      whileHover={{ background:'#eef2ff' }}
                    >
                      <td style={{ padding:'13px 16px', fontSize:'13px', color:'#4a5568', fontWeight:'600' }}>{new Date(log.date).toLocaleDateString('en-US',{ month:'short', day:'numeric', year:'numeric' })}</td>
                      <td style={{ padding:'13px 16px', fontSize:'13px', color:'#4a5568' }}>{log.steps ? Number(log.steps).toLocaleString() : '—'}</td>
                      <td style={{ padding:'13px 16px', fontSize:'13px', color:'#4a5568' }}>{log.water ? log.water + ' gl' : '—'}</td>
                      <td style={{ padding:'13px 16px', fontSize:'13px', color:'#4a5568' }}>{log.calories ? log.calories + ' kcal' : '—'}</td>
                      <td style={{ padding:'13px 16px', fontSize:'13px', color:'#4a5568' }}>{log.heartRate ? log.heartRate + ' bpm' : '—'}</td>
                      <td style={{ padding:'13px 16px', fontSize:'13px', color:'#4a5568' }}>{log.sleepHours ? log.sleepHours + ' hrs' : '—'}</td>
                      <td style={{ padding:'13px 16px', fontSize:'13px', color:'#4a5568' }}>{log.weight ? log.weight + ' kg' : '—'}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default Dashboard;